import { GithubResponse } from "./github";

export enum Status {
    Fast = "fast",
    Average = "average",
    Pending = "pending",
}

export type Project = {
    id: string;
    name: string;
    maintainer: string;
    repository: string;
    certifiedDate: Date;
    certifiedOn: string;
    blurb: string;
    exists: boolean;
    status: Status;
    hidden?: boolean;
};

export function supplementProject(
    project: Project,
    githubResponse: GithubResponse
): Project {
    const repository = githubResponse.full_name
        ? `github.com/${githubResponse.full_name}`
        : project.repository;

    const maintainer = githubResponse.owner?.login
        ? githubResponse.owner.login
        : project.maintainer;

    return {
        ...project,
        name: githubResponse.name || project.name,
        repository,
        maintainer,
        exists: true,
    };
}

export type NormalizedRepo = {
    owner: string;
    repo: string;
    slug: string;
};

export function projectIdFromRepo(owner: string, repo: string): string {
    const { owner: normalizedOwner, repo: normalizedRepo } = normalizeRepo(owner, repo);
    return `${normalizedOwner}@${normalizedRepo}`;
}

function normalizeRepoPart(value: string): string {
    return value.trim().toLowerCase();
}

export function normalizeRepo(owner: string, repo: string): NormalizedRepo {
    const normalizedOwner = normalizeRepoPart(owner);
    const normalizedRepo = normalizeRepoPart(repo);
    return {
        owner: normalizedOwner,
        repo: normalizedRepo,
        slug: `${normalizedOwner}/${normalizedRepo}`,
    };
}

export function repoSlug(owner: string, repo: string): string {
    return normalizeRepo(owner, repo).slug;
}
