#!/usr/bin/env tsx
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

type RepoRecord = {
    repository?: unknown;
};

type CliOptions = {
    input: string;
    envOutput: string;
    exclude: string[];
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = resolve(__dirname, "..");
const DEFAULT_INPUT = resolve(ROOT_DIR, "tmp", "badged_repos.json");
const DEFAULT_ENV_OUTPUT = resolve(ROOT_DIR, ".env.whitelist");

function parseArgs(argv: string[]): CliOptions {
    let input = DEFAULT_INPUT;
    let envOutput = DEFAULT_ENV_OUTPUT;
    const exclude: string[] = [];

    for (let i = 0; i < argv.length; i++) {
        const arg = argv[i];
        if (arg === "--input" && argv[i + 1]) {
            input = resolve(process.cwd(), argv[i + 1]);
            i++;
            continue;
        }
        if (arg === "--env-output" && argv[i + 1]) {
            envOutput = resolve(process.cwd(), argv[i + 1]);
            i++;
            continue;
        }
        if (arg === "--exclude" && argv[i + 1]) {
            exclude.push(...parseExcludeList(argv[i + 1]));
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

    return { input, envOutput, exclude };
}

function parseExcludeList(value: string): string[] {
    return value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
}

function printUsage() {
    console.log(
        "Usage: npx tsx scripts/updateWhitelist.ts [--input path] [--env-output path] [--exclude repo1,repo2]"
    );
}

function loadBadgedRepos(pathToJson: string): string[] {
    if (!existsSync(pathToJson)) {
        throw new Error(`Missing badged repo list at ${pathToJson}`);
    }
    const raw = readFileSync(pathToJson, "utf8");
    let parsed: unknown;
    try {
        parsed = JSON.parse(raw);
    } catch (error) {
        throw new Error(`Unable to parse JSON from ${pathToJson}: ${error}`);
    }
    if (!Array.isArray(parsed)) {
        throw new Error(`Expected ${pathToJson} to contain an array`);
    }
    const repos: string[] = [];
    for (const [index, item] of parsed.entries()) {
        const repoField = (item as RepoRecord)?.repository;
        if (typeof repoField !== "string" || !repoField.trim()) {
            console.warn(`Skipping entry ${index} without a repository`);
            continue;
        }
        repos.push(repoField.trim());
    }
    return repos;
}

function filterRepos(repos: string[], exclude: string[]): string[] {
    if (!exclude.length) {
        return repos;
    }
    const excludeSet = new Set(exclude.map((repo) => repo.toLowerCase()));
    return repos.filter((repo) => !excludeSet.has(repo.toLowerCase()));
}

function writeEnvWhitelist(pathToWrite: string, repos: string[]) {
    const dir = dirname(pathToWrite);
    if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
    }
    const uniqueRepos = Array.from(new Set(repos));
    uniqueRepos.sort((a, b) => a.localeCompare(b));
    const content = `FAST_BADGE_WHITELIST=${uniqueRepos.join(",")}\n`;
    writeFileSync(pathToWrite, content, "utf8");
}

function main() {
    const options = parseArgs(process.argv.slice(2));
    const repos = loadBadgedRepos(options.input);
    const filteredRepos = filterRepos(repos, options.exclude);
    writeEnvWhitelist(options.envOutput, filteredRepos);
    console.log(
        `Wrote ${filteredRepos.length} repos to ${options.envOutput} from ${options.input}`
    );
    if (options.exclude.length) {
        console.log(`Excluded: ${options.exclude.join(", ")}`);
    }
}

main();
