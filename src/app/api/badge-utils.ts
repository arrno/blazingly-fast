import { Status } from "@/app/domain/projects";
import { extract_repo_from_url } from "@/app/domain/submission";
import { NextRequest } from "next/server";
import { STATUS_TO_SVG } from "./badge-svgs";

export function loadBadge(status: Status): string {
    return STATUS_TO_SVG[status] ?? STATUS_TO_SVG[Status.Pending];
}

export function parseRepoParam(
    rawRepo: string | null
): { owner: string; repo: string } | null {
    if (!rawRepo) return null;
    const trimmed = rawRepo.trim();
    if (!trimmed) return null;

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

export async function etagFor(svg: string) {
    const data = new TextEncoder().encode(svg);
    const digest = await crypto.subtle.digest("SHA-1", data);
    const hashArray = Array.from(new Uint8Array(digest));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    return `"${hashHex}"`;
}

export function hitHeaders200FromTag(etag: string) {
    return {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Cache-Control":
            "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000",
        "X-Content-Type-Options": "nosniff",
        Vary: "Accept-Encoding",
        ETag: etag,
    } as const;
}

export function hitHeaders304FromTag(etag: string) {
    return {
        "Cache-Control":
            "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000",
        Vary: "Accept-Encoding",
        ETag: etag,
    } as const;
}

export const missHeaders = {
    "Cache-Control": "no-store, max-age=0, s-maxage=0",
} as const;

export function kvKey(owner: string, repo: string, v?: string | null) {
    return `badge:${owner.toLowerCase()}:${repo.toLowerCase()}:${v ?? "0"}`;
}

export function matchesIfNoneMatch(req: NextRequest, etag: string) {
    const inm = req.headers.get("if-none-match");
    if (!inm) return false;
    const vals = inm.split(",").map((s) => s.trim());
    return vals.includes(etag) || vals.includes(`W/${etag}`);
}
