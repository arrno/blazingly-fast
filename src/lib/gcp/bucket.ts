import { Storage, type Bucket } from "@google-cloud/storage";
import { Status, repoSlug } from "@/app/domain/projects";
import { BadgeMarker, badgeMarkerPath } from "@/lib/badge-marker";
import { POSITIVE_CACHE_TTL_SECONDS } from "@/app/api/badge-utils";

type BucketConfig = {
    bucketName: string;
    projectId: string;
    clientEmail: string;
    privateKey: string;
};

let cachedBucket: Bucket | null = null;

function cleanEnv(value?: string | null): string | undefined {
    if (!value) return undefined;
    return value.trim().replace(/,+$/, "");
}

function getBucketConfig(): BucketConfig | null {
    const bucketName = cleanEnv(process.env.GCP_BUCKET_NAME);
    const projectId = cleanEnv(process.env.GCP_PROJECT_ID);
    const clientEmail = cleanEnv(process.env.GCP_BUCKET_SERVICE_EMAIL);
    const rawPrivateKey = cleanEnv(process.env.GCP_BUCKET_PRIVATE_KEY);

    if (!bucketName || !projectId || !clientEmail || !rawPrivateKey) {
        return null;
    }

    const privateKey = rawPrivateKey.replace(/\\n/g, "\n");

    return {
        bucketName,
        projectId,
        clientEmail,
        privateKey,
    };
}

export function getUploadBucket(): Bucket | null {
    if (cachedBucket) {
        return cachedBucket;
    }

    const config = getBucketConfig();
    if (!config) {
        return null;
    }

    const storage = new Storage({
        projectId: config.projectId,
        credentials: {
            client_email: config.clientEmail,
            private_key: config.privateKey,
        },
    });

    cachedBucket = storage.bucket(config.bucketName);
    return cachedBucket;
}

export async function writeBadgeMarker(
    owner: string,
    repo: string,
    status: Status
): Promise<void> {
    const bucket = getUploadBucket();
    if (!bucket) {
        throw new Error("Bucket configuration missing");
    }

    const file = bucket.file(badgeMarkerPath(owner, repo));
    const slug = repoSlug(owner, repo);
    const payload: BadgeMarker = {
        slug,
        status,
        updatedAt: new Date().toISOString(),
    };

    await file.save(JSON.stringify(payload), {
        resumable: false,
        metadata: {
            contentType: "application/json",
            cacheControl: `public, max-age=${POSITIVE_CACHE_TTL_SECONDS}`,
        },
    });
}
