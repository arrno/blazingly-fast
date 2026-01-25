import { Status, repoSlug } from "@/app/domain/projects";

export type BadgeMarker = {
    slug: string;
    status: Status;
    updatedAt: string;
};

export function badgeMarkerPath(owner: string, repo: string): string {
    const slug = repoSlug(owner, repo);
    return `markers/${slug}.json`;
}

export function badgeMarkerUrl(owner: string, repo: string): string | null {
    const bucketName = process.env.GCP_BUCKET_NAME;
    if (!bucketName) {
        return null;
    }
    const path = badgeMarkerPath(owner, repo);
    return `https://storage.googleapis.com/${bucketName}/${path}`;
}
