import { NextRequest, NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { getServerFirestore } from "@/lib/firebase/server";
import { Status, projectIdFromRepo } from "@/app/domain/projects";
import { extract_repo_from_url } from "@/app/domain/submission";

export const dynamic = "force-dynamic";

const STATUS_TO_BADGE: Record<Status, string> = {
    [Status.Fast]: "fast-badge.svg",
    [Status.Pending]: "mid-badge.svg",
    [Status.Average]: "slow-badge.svg",
};

function parseRepoParam(
    rawRepo: string | null
): { owner: string; repo: string } | null {
    if (!rawRepo) {
        return null;
    }

    const trimmed = rawRepo.trim();
    if (!trimmed) {
        return null;
    }

    const directMatch = trimmed.match(
        /^(?<owner>[A-Za-z0-9_.-]+)\/(?<repo>[A-Za-z0-9_.-]+)$/
    );
    if (directMatch?.groups) {
        return {
            owner: directMatch.groups.owner,
            repo: directMatch.groups.repo,
        };
    }

    return extract_repo_from_url(trimmed);
}

async function loadBadge(status: Status): Promise<string> {
    const fileName = STATUS_TO_BADGE[status];
    const filePath = path.join(process.cwd(), "public", fileName);
    const file = await readFile(filePath, "utf-8");
    return file;
}

export async function GET(request: NextRequest) {
    const repoParam = request.nextUrl.searchParams.get("repo");
    const repoInfo = parseRepoParam(repoParam);

    if (!repoInfo) {
        return NextResponse.json(
            { error: "Missing or invalid repository parameter" },
            { status: 400 }
        );
    }

    const firestore = getServerFirestore();
    if (!firestore) {
        return NextResponse.json(
            { error: "Server firestore configuration missing" },
            { status: 500 }
        );
    }

    const docId = projectIdFromRepo(repoInfo.owner, repoInfo.repo);
    const docSnapshot = await firestore.collection("projects").doc(docId).get();

    if (!docSnapshot.exists) {
        return NextResponse.json(
            { error: "Project not found" },
            { status: 404 }
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
        const svg = await loadBadge(status);
        return new NextResponse(svg, {
            status: 200,
            headers: {
                "Content-Type": "image/svg+xml",
                "Cache-Control": "public, max-age=3600",
            },
        });
    } catch {
        return NextResponse.json(
            { error: "Unable to load badge asset" },
            { status: 500 }
        );
    }
}
