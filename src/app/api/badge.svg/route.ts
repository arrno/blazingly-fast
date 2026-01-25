import { NextRequest, NextResponse } from "next/server";
import { Status, normalizeRepo } from "@/app/domain/projects";
import { getRedisInstance } from "@/lib/redis/client";
import {
    POSITIVE_CACHE_TTL_SECONDS,
    etagFor,
    hitHeaders200FromTag,
    hitHeaders304FromTag,
    kvKey,
    loadBadge,
    matchesIfNoneMatch,
    missHeaders,
    parseRepoParam,
} from "../badge-utils";
import { badgeMarkerUrl } from "@/lib/badge-marker";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const FALLBACK_PATH = "/api/badge-full.svg";

function parseWhitelist(): Map<string, Status> {
    const raw = process.env.FAST_BADGE_WHITELIST || "";
    const map = new Map<string, Status>();
    if (!raw.trim()) {
        return map;
    }

    for (const entry of raw.split(",")) {
        const trimmed = entry.trim();
        if (!trimmed) continue;
        const [slugPart, statusPart] = trimmed.split(":");
        const normalizedSlug = slugPart?.trim().toLowerCase();
        if (!normalizedSlug || normalizedSlug.split("/").length !== 2) {
            continue;
        }
        const normalizedStatus = normalizeStatus(statusPart);
        map.set(normalizedSlug, normalizedStatus);
    }

    return map;
}

function normalizeStatus(rawStatus?: string): Status {
    switch (rawStatus?.trim().toLowerCase()) {
        case Status.Average:
            return Status.Average;
        case Status.Pending:
            return Status.Pending;
        case Status.Fast:
        default:
            return Status.Fast;
    }
}

const WHITELIST = parseWhitelist();
const redis = getRedisInstance();

type BadgeAsset = {
    svg: string;
    etag: string;
    body: ArrayBuffer;
    headers200: HeadersInit;
    headers304: HeadersInit;
    contentLength: string;
};

const badgeAssetCache = new Map<Status, Promise<BadgeAsset>>();

async function getBadgeAsset(status: Status): Promise<BadgeAsset> {
    const normalizedStatus =
        status === Status.Fast ||
        status === Status.Average ||
        status === Status.Pending
            ? status
            : Status.Fast;
    let cached = badgeAssetCache.get(normalizedStatus);
    if (!cached) {
        cached = buildBadgeAsset(normalizedStatus);
        badgeAssetCache.set(normalizedStatus, cached);
    }
    return cached;
}

async function buildBadgeAsset(status: Status): Promise<BadgeAsset> {
    const svg = loadBadge(status);
    const bodyBytes = new TextEncoder().encode(svg);
    const body = bodyBytes.buffer;
    const etag = await etagFor(svg);
    return {
        svg,
        etag,
        body,
        headers200: hitHeaders200FromTag(etag),
        headers304: hitHeaders304FromTag(etag),
        contentLength: String(bodyBytes.byteLength),
    };
}

async function respondWithBadge(
    status: Status,
    request: NextRequest
): Promise<NextResponse> {
    const asset = await getBadgeAsset(status);
    if (matchesIfNoneMatch(request, asset.etag)) {
        return new NextResponse(null, {
            status: 304,
            headers: asset.headers304,
        });
    }
    return new NextResponse(asset.body, {
        status: 200,
        headers: {
            ...asset.headers200,
            "Content-Length": asset.contentLength,
        },
    });
}

async function respondWithSvg(
    svg: string,
    request: NextRequest
): Promise<NextResponse> {
    const etag = await etagFor(svg);
    if (matchesIfNoneMatch(request, etag)) {
        return new NextResponse(null, {
            status: 304,
            headers: hitHeaders304FromTag(etag),
        });
    }
    const body = new TextEncoder().encode(svg);
    return new NextResponse(body, {
        status: 200,
        headers: {
            ...hitHeaders200FromTag(etag),
            "Content-Length": String(body.byteLength),
        },
    });
}

async function proxyToFallback(request: NextRequest): Promise<NextResponse> {
    const url = new URL(FALLBACK_PATH, request.nextUrl.origin);
    url.search = request.nextUrl.search;
    const headers = new Headers(request.headers);
    headers.delete("content-length");

    const body =
        request.method === "GET" || request.method === "HEAD"
            ? undefined
            : request.body;

    const response = await fetch(url, {
        method: request.method,
        headers,
        body,
        redirect: "manual",
    });

    return new NextResponse(response.body, {
        status: response.status,
        headers: response.headers,
    });
}

async function readCache(
    owner: string,
    repo: string,
    versionParam: string | null
): Promise<string | null> {
    if (!redis) {
        return null;
    }
    try {
        const cached = await redis.get<string>(
            kvKey(owner, repo, versionParam)
        );
        return typeof cached === "string" ? cached : null;
    } catch (err) {
        console.warn("Failed to read badge cache", err);
        return null;
    }
}

async function writeCache(
    owner: string,
    repo: string,
    versionParam: string | null,
    svg: string
): Promise<void> {
    if (!redis) {
        return;
    }
    try {
        await redis.set(kvKey(owner, repo, versionParam), svg, {
            ex: POSITIVE_CACHE_TTL_SECONDS,
        });
    } catch (err) {
        console.warn("Failed to write badge cache", err);
    }
}

async function readBucketStatus(
    owner: string,
    repo: string
): Promise<Status | null> {
    const url = badgeMarkerUrl(owner, repo);
    if (!url) {
        return null;
    }
    try {
        const response = await fetch(url, { cache: "no-store" });
        if (!response.ok) {
            return null;
        }
        const data = (await response.json()) as { status?: string | null };
        return normalizeStatus(data?.status ?? undefined);
    } catch (err) {
        console.warn("Failed to read badge bucket marker", err);
        return null;
    }
}

export async function GET(request: NextRequest) {
    const repoParam = request.nextUrl.searchParams.get("repo");
    const versionParam = request.nextUrl.searchParams.get("v");
    const hasVersionParam = request.nextUrl.searchParams.has("v");
    const repoInfo = parseRepoParam(repoParam);

    if (!repoInfo) {
        return NextResponse.json(
            { error: "Missing or invalid repository parameter" },
            { status: 400, headers: missHeaders }
        );
    }

    const { owner, repo, slug } = normalizeRepo(repoInfo.owner, repoInfo.repo);
    // Allow a manual cache-bust via ?v=... by skipping the whitelist entirely.
    const cachedStatus = hasVersionParam ? undefined : WHITELIST.get(slug);

    if (cachedStatus) {
        try {
            return await respondWithBadge(cachedStatus, request);
        } catch (err) {
            console.error("Failed to serve cached badge", err);
        }
    }

    const cachedSvg = await readCache(owner, repo, versionParam);
    if (cachedSvg) {
        return respondWithSvg(cachedSvg, request);
    }

    const bucketStatus = await readBucketStatus(owner, repo);
    if (bucketStatus) {
        const svg = loadBadge(bucketStatus);
        await writeCache(owner, repo, versionParam, svg);
        return respondWithBadge(bucketStatus, request);
    }

    return proxyToFallback(request);
}

export async function HEAD(request: NextRequest) {
    const res = await GET(request);
    return new NextResponse(null, { status: res.status, headers: res.headers });
}
