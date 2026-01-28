#!/usr/bin/env tsx
import { existsSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import * as dotenv from "dotenv";
import { getServerFirestore } from "../src/lib/firebase/server";
import { getUploadBucket, writeBadgeMarker } from "../src/lib/gcp/bucket";
import { badgeMarkerPath } from "../src/lib/badge-marker";
import { normalizeRepo, Status } from "../src/app/domain/projects";

type FirestoreData = Record<string, unknown>;

type CliOptions = {
    envFile?: string;
    dryRun: boolean;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = resolve(__dirname, "..");
const DEFAULT_ENV_CANDIDATES = [
    resolve(ROOT_DIR, ".env.local"),
    resolve(ROOT_DIR, ".env"),
];

function parseArgs(argv: string[]): CliOptions {
    let envFile: string | undefined;
    let dryRun = false;

    for (let i = 0; i < argv.length; i++) {
        const arg = argv[i];
        if (arg === "--env-file" && argv[i + 1]) {
            envFile = resolve(process.cwd(), argv[i + 1]);
            i++;
            continue;
        }
        if (arg === "--dry-run") {
            dryRun = true;
            continue;
        }
        if (arg === "--help" || arg === "-h") {
            printUsage();
            process.exit(0);
        }
        if (arg.startsWith("-")) {
            throw new Error(`Unknown argument: ${arg}`);
        }
    }

    return { envFile, dryRun };
}

function printUsage() {
    console.log(
        `Usage: npx tsx scripts/backfillBadgeMarkers.ts [--env-file path] [--dry-run]`
    );
}

function loadEnv(options: CliOptions): void {
    if (options.envFile) {
        if (existsSync(options.envFile)) {
            dotenv.config({ path: options.envFile, quiet: true });
        }
        return;
    }

    for (const candidate of DEFAULT_ENV_CANDIDATES) {
        if (!existsSync(candidate)) {
            continue;
        }
        dotenv.config({ path: candidate, quiet: true });
        break;
    }
}

function ensureFirebaseEnv() {
    const required = [
        "FIREBASE_PROJECT_ID",
        "FIREBASE_CLIENT_EMAIL",
        "FIREBASE_PRIVATE_KEY",
    ];
    const missing = required.filter((key) => !process.env[key]);
    if (missing.length) {
        throw new Error(
            `Missing required Firebase env vars: ${missing.join(", ")}. Check your .env file.`
        );
    }
}

function ensureBucketEnv() {
    const required = [
        "GCP_BUCKET_NAME",
        "GCP_PROJECT_ID",
        "GCP_BUCKET_SERVICE_EMAIL",
        "GCP_BUCKET_PRIVATE_KEY",
    ];
    const missing = required.filter((key) => !process.env[key]);
    if (missing.length) {
        throw new Error(
            `Missing required GCP bucket env vars: ${missing.join(", ")}. Check your .env file.`
        );
    }
}

function slugFromProject(docId: string, data: FirestoreData): string | null {
    const rawValue =
        typeof data.repository === "string"
            ? data.repository
            : typeof data.repo === "string"
            ? data.repo
            : "";
    let repo = rawValue.trim();
    if (repo.toLowerCase().startsWith("github.com/")) {
        repo = repo.slice("github.com/".length);
    }
    repo = repo.replace(/\.git$/i, "");
    if (!repo && docId.includes("@")) {
        const [owner, name] = docId.split("@", 2);
        repo = `${owner}/${name}`;
    }
    repo = repo.replace(/^\/+|\/+$/g, "");
    if (!repo || repo.split("/").length !== 2) {
        return null;
    }
    return repo;
}

async function main() {
    const options = parseArgs(process.argv.slice(2));
    loadEnv(options);
    ensureFirebaseEnv();
    ensureBucketEnv();

    const firestore = getServerFirestore();
    if (!firestore) {
        throw new Error("Unable to initialize Firestore client");
    }

    const bucket = getUploadBucket();
    if (!bucket) {
        throw new Error("Unable to initialize upload bucket client");
    }

    const snapshot = await firestore.collection("projects").get();
    console.log(`Loaded ${snapshot.size} project documents`);

    let created = 0;
    let skipped = 0;
    let missingStatus = 0;
    let errors = 0;

    for (const doc of snapshot.docs) {
        const data = doc.data() as FirestoreData;
        const slug = slugFromProject(doc.id, data);
        if (!slug) {
            skipped++;
            console.log(`[SKIP] ${doc.id} has no recognizable repository`);
            continue;
        }

        const [ownerRaw, repoRaw] = slug.split("/");
        const repoInfo = normalizeRepo(ownerRaw, repoRaw);
        const markerFile = bucket.file(badgeMarkerPath(repoInfo.owner, repoInfo.repo));

        try {
            const [exists] = await markerFile.exists();
            if (exists) {
                skipped++;
                console.log(`[SKIP] ${repoInfo.slug} already has a marker`);
                continue;
            }

            const status = typeof data.status === "string" ? (data.status as Status) : Status.Pending;
            if (!data.status) {
                missingStatus++;
            }

            if (options.dryRun) {
                console.log(`[DRY RUN] Would write marker for ${repoInfo.slug} (${status})`);
                created++;
                continue;
            }

            await writeBadgeMarker(repoInfo.owner, repoInfo.repo, status);
            created++;
            console.log(`[WRITE] Created marker for ${repoInfo.slug} (${status})`);
        } catch (error) {
            errors++;
            console.warn(`[ERROR] Failed to backfill marker for ${repoInfo.slug}:`, error);
        }
    }

    console.log("Backfill complete", {
        total: snapshot.size,
        created,
        skipped,
        missingStatus,
        errors,
        dryRun: options.dryRun,
    });
}

main().catch((err) => {
    console.error(err);
    process.exitCode = 1;
});
