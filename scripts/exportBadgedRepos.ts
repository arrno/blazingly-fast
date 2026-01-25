#!/usr/bin/env tsx
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import * as dotenv from "dotenv";
import { getServerFirestore } from "../src/lib/firebase/server";

type FirestoreData = Record<string, unknown>;

type RepoResult = {
    repository: string;
    status?: unknown;
    projectId: string;
    readmeUrl?: string;
};

type CliOptions = {
    envFile?: string;
    output: string;
    envOutput: string;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = resolve(__dirname, "..");
const DEFAULT_OUTPUT = resolve(ROOT_DIR, "tmp", "badged_repos.json");
const DEFAULT_ENV_OUTPUT = resolve(ROOT_DIR, ".env.whitelist");
const BADGE_TOKEN = "blazingly.fast";
const DEFAULT_ENV_CANDIDATES = [
    resolve(ROOT_DIR, ".env.local"),
    resolve(ROOT_DIR, ".env"),
];

function parseArgs(argv: string[]): CliOptions {
    let envFile: string | undefined;
    let output = DEFAULT_OUTPUT;
    let envOutput = DEFAULT_ENV_OUTPUT;

    for (let i = 0; i < argv.length; i++) {
        const arg = argv[i];
        if (arg === "--env-file" && argv[i + 1]) {
            envFile = resolve(process.cwd(), argv[i + 1]);
            i++;
            continue;
        }
        if (arg === "--output" && argv[i + 1]) {
            output = resolve(process.cwd(), argv[i + 1]);
            i++;
            continue;
        }
        if (arg === "--env-output" && argv[i + 1]) {
            envOutput = resolve(process.cwd(), argv[i + 1]);
            i++;
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

    return { envFile, output, envOutput };
}

function printUsage() {
    console.log(
        `Usage: npx tsx scripts/exportBadgedRepos.ts [--env-file path] [--output path] [--env-output path]`
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
            `Missing required Firebase env vars: ${missing.join(
                ", "
            )}. Check your .env file.`
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

function buildGithubHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
        Accept: "application/vnd.github+json",
        "User-Agent": "blazingly-fast-export-script",
    };
    const token = process.env.GITHUB_TOKEN;
    if (token) {
        headers.Authorization = `Bearer ${token}`;
        headers["X-GitHub-Api-Version"] = "2022-11-28";
    }
    return headers;
}

async function fetchReadme(
    owner: string,
    repo: string,
    headers: Record<string, string>
) {
    const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/readme`,
        {
            headers,
        }
    );
    if (!response.ok) {
        return null;
    }
    const payload = (await response.json()) as {
        content?: string;
        encoding?: string;
        html_url?: string;
    };
    if (!payload.content) {
        return null;
    }
    let text: string;
    if (payload.encoding === "base64") {
        text = Buffer.from(payload.content, "base64").toString("utf8");
    } else {
        text = payload.content;
    }
    return {
        text,
        readmeUrl: payload.html_url,
    };
}

function readmeHasBadge(text: string): boolean {
    return text.toLowerCase().includes(BADGE_TOKEN);
}

function writeResults(outputPath: string, results: RepoResult[]) {
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, JSON.stringify(results, null, 2));
}

function writeEnvWhitelist(pathToWrite: string, rows: RepoResult[]) {
    const dir = dirname(pathToWrite);
    if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
    }
    const entries = rows
        .map((row) => row.repository)
        .sort((a, b) => a.localeCompare(b));
    const content = `FAST_BADGE_WHITELIST=${entries.join(",")}\n`;
    writeFileSync(pathToWrite, content, "utf8");
}

async function main() {
    const options = parseArgs(process.argv.slice(2));
    loadEnv(options);
    ensureFirebaseEnv();

    const firestore = getServerFirestore();
    if (!firestore) {
        throw new Error("Unable to initialize Firestore client");
    }

    const headers = buildGithubHeaders();
    const snapshot = await firestore.collection("projects").get();
    const results: RepoResult[] = [];

    for (const doc of snapshot.docs) {
        const data = doc.data() as FirestoreData;
        const slug = slugFromProject(doc.id, data);
        if (!slug) {
            continue;
        }
        const [owner, repo] = slug.split("/");
        try {
            const readme = await fetchReadme(owner, repo, headers);
            if (!readme?.text) {
                continue;
            }
            if (!readmeHasBadge(readme.text)) {
                continue;
            }
            results.push({
                repository: slug,
                status: data.status,
                projectId: doc.id,
                readmeUrl: readme.readmeUrl,
            });
        } catch (err) {
            console.warn(`Failed to inspect ${slug}:`, err);
        }
    }

    writeResults(options.output, results);
    // writeEnvWhitelist(options.envOutput, results);
    console.log(
        `Wrote ${results.length} repos with badges to ${options.output} and ${options.envOutput}`
    );
}

main().catch((err) => {
    console.error(err);
    process.exitCode = 1;
});
