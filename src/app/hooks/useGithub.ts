import { GithubRequest, GithubResponse } from "../domain/github";

const GITHUB_API_BASE = "https://api.github.com";

export async function fetchGithubProject(
    request: GithubRequest
): Promise<GithubResponse> {
    const { owner, repo, token } = request;
    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}`;

    const headers: HeadersInit = {
        "User-Agent": "blazingly-fast-app",
        Accept: "application/vnd.github+json",
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        method: "GET",
        headers,
        next: { revalidate: 60 },
    });

    if (response.status === 404) {
        throw new Error("Repository not found on GitHub");
    }

    if (!response.ok) {
        throw new Error(`GitHub request failed with status ${response.status}`);
    }

    return (await response.json()) as GithubResponse;
}

export async function githubProjectHasBadge(
    request: GithubRequest
): Promise<boolean> {
    // TODO fetch project, check readme for https://blazingly.fast/badge.svg
    // if repo exists and references our badge, return true else false
    // when someone submits a repo, schedule a check in 24 hours.. if no badge,
    // prune from hall of speed
    return false;
}
