"use client";

import { useEffect, type JSX } from "react";
import Link from "next/link";
import {
    Project,
    Status,
} from "../domain/projects";
import { useCollection } from "../hooks/useCollection";
import type { QueryDocumentSnapshot } from "firebase/firestore";

type FirestoreProject = {
    name?: string;
    maintainer?: string;
    repository?: string;
    certifiedDate?: { toDate?: () => Date } | Date | string;
    certifiedOn?: string;
    blurb?: string;
    exists?: boolean;
    status?: Status;
};

const ROW_TARGET = 10;

function formatDateLabel(date: Date): string {
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    });
}

function mapProjectDocument(doc: QueryDocumentSnapshot): Project {
    const data = doc.data() as FirestoreProject;

    const certifiedDateValue = data.certifiedDate;
    let certifiedDate: Date;

    if (certifiedDateValue instanceof Date) {
        certifiedDate = certifiedDateValue;
    } else if (
        certifiedDateValue &&
        typeof certifiedDateValue === "object" &&
        "toDate" in certifiedDateValue &&
        typeof certifiedDateValue.toDate === "function"
    ) {
        certifiedDate = certifiedDateValue.toDate();
    } else if (typeof certifiedDateValue === "string") {
        certifiedDate = new Date(certifiedDateValue);
    } else {
        certifiedDate = new Date();
    }

    const status =
        data.status === Status.Fast ||
        data.status === Status.Average ||
        data.status === Status.Pending
            ? data.status
            : Status.Pending;

    return {
        id: doc.id,
        name: data.name ?? doc.id,
        maintainer: data.maintainer ?? "",
        repository: data.repository ?? "",
        certifiedDate,
        certifiedOn: data.certifiedOn ?? formatDateLabel(certifiedDate),
        blurb: data.blurb ?? "",
        exists: data.exists ?? true,
        status,
    };
}

const STATUS_META: Record<Status, { label: string; className: string }> = {
    fast: {
        label: "✓ blazingly fast",
        className: "text-[#FF5C5C]",
    },
    pending: {
        label: "blazingly pending",
        className: "text-[#8F7DEB]",
    },
    average: {
        label: "blazingly average",
        className: "text-[#8F7DEB]",
    },
};

function padProjects(projects: Project[]): Project[] {
    if (projects.length >= ROW_TARGET) {
        return projects;
    }

    const padded = [...projects];
    while (padded.length < ROW_TARGET) {
        padded.push({
            id: `placeholder-${padded.length}`,
            certifiedDate: new Date(),
            exists: false,
            name: "",
            maintainer: "",
            repository: "",
            certifiedOn: "",
            status: Status.Pending,
            blurb: "",
        });
    }

    return padded;
}

function normalizeRepository(repository: string): string {
    if (!repository) {
        return "";
    }

    if (repository.startsWith("http")) {
        return repository;
    }

    return `https://${repository}`;
}

export function ProjectTable(): JSX.Element {
    const {
        data,
        loading,
        error,
        page,
        totalPages,
        nextPage,
        prevPage,
        refresh,
    } = useCollection<Project>("projects", {
        mapDocument: mapProjectDocument,
        orderByField: "certifiedDate",
        orderDirection: "desc",
        pageSize: ROW_TARGET,
    });

    useEffect(() => {
        const listener = () => refresh();
        window.addEventListener("project-submitted", listener);
        return () => window.removeEventListener("project-submitted", listener);
    }, [refresh]);

    const projects = padProjects(data);
    const pageLabel = `Page ${Math.min(page + 1, totalPages)} of ${totalPages}`;

    return (
        <div className="relative overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
            {error && (
                <div className="border-b border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                </div>
            )}
            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm text-gray-700">
                    <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
                        <tr>
                            <th scope="col" className="px-6 py-5">
                                Project
                            </th>
                            <th scope="col" className="px-6 py-5">
                                Maintainer
                            </th>
                            <th scope="col" className="px-6 py-5">
                                Repository
                            </th>
                            <th
                                scope="col"
                                className="min-w-[140px] px-6 py-5 whitespace-nowrap"
                            >
                                Certified On
                            </th>
                            <th scope="col" className="px-6 py-5">
                                Speed Claim
                            </th>
                            <th scope="col" className="px-6 py-5 text-right">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {projects.map((project, index) => {
                            const isPlaceholder = !project.exists;
                            const statusMeta = project.status
                                ? STATUS_META[project.status]
                                : undefined;

                            return (
                                <tr
                                    key={`${
                                        project.repository ||
                                        project.name ||
                                        "placeholder"
                                    }-${index}`}
                                    className="transition hover:bg-gray-50/80"
                                >
                                    <th
                                        scope="row"
                                        className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-gray-900"
                                    >
                                        {isPlaceholder ? (
                                            <span className="text-gray-300">
                                                —
                                            </span>
                                        ) : (
                                            project.name
                                        )}
                                    </th>
                                    <td className="px-6 py-4 text-gray-600">
                                        {isPlaceholder ? (
                                            <span className="text-gray-300">
                                                —
                                            </span>
                                        ) : (
                                            project.maintainer
                                        )}
                                    </td>
                                    <td className="px-6 py-4 font-mono text-xs text-gray-500">
                                        {isPlaceholder ? (
                                            <span className="text-gray-300">
                                                —
                                            </span>
                                        ) : (
                                            <Link
                                                href={normalizeRepository(
                                                    project.repository
                                                )}
                                            >
                                                {project.repository}
                                            </Link>
                                        )}
                                    </td>
                                    <td className="min-w-[140px] whitespace-nowrap px-6 py-4 text-gray-600">
                                        {isPlaceholder ? (
                                            <span className="text-gray-300">
                                                —
                                            </span>
                                        ) : (
                                            project.certifiedOn
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {isPlaceholder ? (
                                            <span className="text-gray-300">
                                                —
                                            </span>
                                        ) : (
                                            project.blurb
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {isPlaceholder || !statusMeta ? (
                                            <span className="text-gray-300">
                                                —
                                            </span>
                                        ) : (
                                            <p
                                                className={`m-0 flex items-center justify-end gap-2 font-mono text-xs font-semibold tracking-wide ${statusMeta.className}`}
                                            >
                                                {statusMeta.label}
                                            </p>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="flex items-center justify-between gap-6 border-t border-gray-100 bg-gray-50 px-6 py-3 text-xs text-gray-500">
                <div className="flex items-center gap-3 text-gray-500">
                    {loading ? "Loading projects…" : pageLabel}
                </div>
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={prevPage}
                        className="inline-flex items-center gap-1 font-semibold text-gray-400 transition hover:text-gray-600 disabled:cursor-not-allowed disabled:text-gray-300"
                        disabled={loading || page === 0}
                    >
                        <span aria-hidden className="text-sm">
                            ←
                        </span>
                        Prev
                    </button>
                    <button
                        type="button"
                        onClick={nextPage}
                        className="inline-flex items-center gap-1 font-semibold text-gray-400 transition hover:text-gray-600 disabled:cursor-not-allowed disabled:text-gray-300"
                        disabled={loading || page + 1 >= totalPages}
                    >
                        Next
                        <span aria-hidden className="text-sm">
                            →
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}
