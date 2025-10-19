import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import {
    extract_repo_from_url,
    is_valid_blurb,
    is_valid_github_url,
    type SubmissionForm,
} from "@/app/domain/submission";
import {
    Status,
    projectIdFromRepo,
    supplementProject,
    type Project,
} from "@/app/domain/projects";
import { fetchGithubProject } from "@/app/hooks/useGithub";
import { addDocument } from "@/app/hooks/useAddDocument";
import { getServerFirestore } from "@/lib/firebase/server";

export const dynamic = "force-dynamic";

function formatCertifiedOn(date: Date): string {
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

function sanitizeSubmission(payload: unknown): SubmissionForm | null {
    if (typeof payload !== "object" || payload === null) {
        return null;
    }

    const { repoUrl, isBlazinglyFast, blurb } = payload as SubmissionForm;

    if (typeof repoUrl !== "string" || typeof blurb !== "string") {
        return null;
    }

    if (typeof isBlazinglyFast !== "boolean") {
        return null;
    }

    return {
        repoUrl,
        isBlazinglyFast,
        blurb,
    };
}

export async function POST(request: NextRequest) {
    let submission: SubmissionForm | null = null;

    try {
        const body = await request.json();
        submission = sanitizeSubmission(body);
    } catch {
        return NextResponse.json(
            { error: "Invalid JSON payload" },
            { status: 400 }
        );
    }

    if (!submission) {
        return NextResponse.json(
            { error: "Invalid submission" },
            { status: 400 }
        );
    }

    if (!is_valid_github_url(submission.repoUrl)) {
        return NextResponse.json(
            { error: "Invalid GitHub repository URL" },
            { status: 400 }
        );
    }

    if (!is_valid_blurb(submission.blurb)) {
        return NextResponse.json(
            { error: "Blurb must be between 1 and 128 characters" },
            { status: 400 }
        );
    }

    const repoParts = extract_repo_from_url(submission.repoUrl);
    if (!repoParts) {
        return NextResponse.json(
            { error: "Unable to parse repository URL" },
            { status: 400 }
        );
    }

    const { owner, repo } = repoParts;
    const docId = projectIdFromRepo(owner, repo);
    const firestore = getServerFirestore();

    if (!firestore) {
        return NextResponse.json(
            { error: "Server firestore configuration missing" },
            { status: 500 }
        );
    }

    const docRef = firestore.collection("projects").doc(docId);
    const existingSnapshot = await docRef.get();

    if (existingSnapshot.exists) {
        return NextResponse.json(
            { error: "Project already submitted" },
            { status: 409 }
        );
    }

    try {
        const githubResponse = await fetchGithubProject({
            owner,
            repo,
            token: process.env.GITHUB_TOKEN,
        });

        const now = new Date();
        let project: Project = {
            id: docId,
            name: `${owner}/${repo}`,
            maintainer: owner,
            repository: `https://github.com/${owner}/${repo}`,
            certifiedDate: now,
            certifiedOn: formatCertifiedOn(now),
            blurb: submission.blurb.trim(),
            exists: true,
            status: submission.isBlazinglyFast ? Status.Fast : Status.Pending,
        };

        project = supplementProject(project, githubResponse);

        const payload = {
            ...project,
            certifiedDate: now,
            github: {
                id: githubResponse.id,
                fullName: githubResponse.full_name,
                htmlUrl: githubResponse.html_url,
                description: githubResponse.description,
                stars: githubResponse.stargazers_count,
                forks: githubResponse.forks_count,
                openIssues: githubResponse.open_issues_count,
                lastPushedAt: githubResponse.pushed_at,
            },
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp(),
        };

        await addDocument("projects", payload, { id: docId });

        return NextResponse.json(
            {
                id: docId,
                project: {
                    ...project,
                    certifiedDate: now.toISOString(),
                },
            },
            { status: 201 }
        );
    } catch (error) {
        const message = (error as Error).message;
        const status = /not found/i.test(message) ? 404 : 502;
        return NextResponse.json({ error: message }, { status });
    }
}
