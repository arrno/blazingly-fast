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

export function projectIdFromRepo(owner: string, repo: string): string {
    return `${owner}__${repo}`.toLowerCase();
}
