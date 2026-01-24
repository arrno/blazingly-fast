import { NextRequest, NextResponse } from "next/server";
import { Status } from "@/app/domain/projects";
import { getRedisInstance } from "@/lib/redis/client";
import {
    etagFor,
    hitHeaders200FromTag,
    hitHeaders304FromTag,
    kvKey,
    loadBadge,
    matchesIfNoneMatch,
    missHeaders,
    parseRepoParam,
} from "../badge-utils";

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

async function respondWithBadge(status: Status, request: NextRequest) {
    const svg = loadBadge(status);
    return respondWithSvg(svg, request);
}

async function respondWithSvg(svg: string, request: NextRequest) {
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

async function proxyToFallback(request: NextRequest) {
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

async function readCache(owner: string, repo: string, versionParam: string | null) {
    if (!redis) {
        return null;
    }
    try {
        const cached = await redis.get<string>(kvKey(owner, repo, versionParam));
        return typeof cached === "string" ? cached : null;
    } catch (err) {
        console.warn("Failed to read badge cache", err);
        return null;
    }
}

export async function GET(request: NextRequest) {
    const repoParam = request.nextUrl.searchParams.get("repo");
    const versionParam = request.nextUrl.searchParams.get("v");
    const repoInfo = parseRepoParam(repoParam);

    if (!repoInfo) {
        return NextResponse.json(
            { error: "Missing or invalid repository parameter" },
            { status: 400, headers: missHeaders }
        );
    }

    const owner = repoInfo.owner.toLowerCase();
    const repo = repoInfo.repo.toLowerCase();
    const slug = `${owner}/${repo}`;
    const cachedStatus = WHITELIST.get(slug);

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

    return proxyToFallback(request);
}

export async function HEAD(request: NextRequest) {
    const res = await GET(request);
    return new NextResponse(null, { status: res.status, headers: res.headers });
}
