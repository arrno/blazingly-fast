export type SubmissionForm = {
    repoUrl: string;
    isBlazinglyFast: boolean;
    blurb: string;
    hidden: boolean;
};

const GITHUB_REPO_REGEX =
    /^(?:https?:\/\/)?(?:www\.)?github\.com\/([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)(?:\.git)?(?:\/)?.*$/i;

export function is_valid_github_url(url: string): boolean {
    return GITHUB_REPO_REGEX.test(url);
}

export function extract_repo_from_url(url: string): {
    owner: string;
    repo: string;
} | null {
    const match = url.match(GITHUB_REPO_REGEX);
    if (!match) {
        return null;
    }

    const [, owner, repo] = match;
    return { owner, repo };
}

export function is_valid_blurb(blurb: string): boolean {
    return blurb.trim().length > 0 && blurb.trim().length <= 128;
}
