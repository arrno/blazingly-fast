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

function SupplementProject(
    project: Project,
    githubResponse: GithubResponse
): Project {
    // TODO
    return project;
}
