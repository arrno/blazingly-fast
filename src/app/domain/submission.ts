export type SubmissionForm = {
    repoUrl: string; // valid github URL
    isBlazinglyFast: boolean;
    blurb: string; // up to 128 chars
};

export function is_valid_github_url(url: string): boolean {
    return true;
}

export function is_valid_blurb(blurb: string): boolean {
    return blurb.length <= 128;
}
