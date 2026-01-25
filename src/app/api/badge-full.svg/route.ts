import { NextRequest, NextResponse } from "next/server";
import { getRedis } from "@/lib/redis/client";
import { getServerFirestore } from "@/lib/firebase/server";
import { Status, projectIdFromRepo } from "@/app/domain/projects";
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

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    const repoParam = request.nextUrl.searchParams.get("repo");
    const versionParam = request.nextUrl.searchParams.get("v"); // optional bust param
    const repoInfo = parseRepoParam(repoParam);

    if (!repoInfo) {
        return NextResponse.json(
            { error: "Missing or invalid repository parameter" },
            { status: 400, headers: missHeaders }
        );
    }

    const { owner, repo } = repoInfo;
    const key = kvKey(owner, repo, versionParam);
    const kv = await getRedis();

    // Slow path: Firestore once; only write positives to KV
    const firestore = getServerFirestore();
    if (!firestore) {
        return NextResponse.json(
            { error: "Server firestore configuration missing" },
            { status: 500, headers: missHeaders }
        );
    }

    const docId = projectIdFromRepo(owner, repo);
    const docSnapshot = await firestore.collection("projects").doc(docId).get();

    if (!docSnapshot.exists) {
        // No negative cache: return 404 with no-store so a later hit turns fast immediately.
        return NextResponse.json(
            { error: "Project not found" },
            { status: 404, headers: missHeaders }
        );
    }

    const data = docSnapshot.data();
    const statusValue = typeof data?.status === "string" ? data.status : null;
    const status =
        statusValue === Status.Fast ||
        statusValue === Status.Average ||
        statusValue === Status.Pending
            ? (statusValue as Status)
            : Status.Pending;

    try {
        const svg = loadBadge(status);

        // Write ONLY positive hits to KV
        if (kv) {
            try {
                await kv.set(key, svg, { ex: POSITIVE_CACHE_TTL_SECONDS });
            } catch (err) {
                console.log(`failed to write cache. Err: ${err}`);
            }
        }

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
    } catch {
        return NextResponse.json(
            { error: "Unable to load badge asset" },
            { status: 500, headers: missHeaders }
        );
    }
}

export async function HEAD(request: NextRequest) {
    const res = await GET(request);
    return new NextResponse(null, { status: res.status, headers: res.headers });
}
