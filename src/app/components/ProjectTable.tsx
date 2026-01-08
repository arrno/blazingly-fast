"use client";

import { useEffect, type JSX } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import Link from "next/link";
import { visibleProjectFilters } from "../constants/projectFilters";
import { Project, Status } from "../domain/projects";
import { useCollectionSocket as useCollection } from "../hooks/useCollectionSocket";
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
    hidden?: boolean;
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
        hidden: data.hidden ?? false,
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
    const trimmed = repository.trim();

    if (!trimmed) {
        return "";
    }

    if (trimmed.startsWith("http")) {
        return trimmed;
    }

    return `https://${trimmed}`;
}

type RepositoryDisplay = {
    full: string;
    owner?: string;
    name: string;
};

function getRepositoryDisplay(
    repository: string,
    fallbackName?: string
): RepositoryDisplay | null {
    const trimmed = repository.trim();
    const fallback = fallbackName?.trim();

    if (!trimmed) {
        if (!fallback) {
            return null;
        }

        return {
            full: fallback,
            name: fallback,
        };
    }

    const ensureProtocol = trimmed.startsWith("http")
        ? trimmed
        : `https://${trimmed}`;

    const normalizeRepo = (value: string): RepositoryDisplay | null => {
        const segments = value.split("/").filter(Boolean);

        if (segments.length >= 2) {
            const owner = segments[segments.length - 2];
            const repo = segments[segments.length - 1].replace(/\.git$/, "");
            return {
                full: `${owner}/${repo}`,
                owner,
                name: repo,
            };
        }

        if (segments.length === 1) {
            const repo = segments[0].replace(/\.git$/, "");
            return {
                full: repo,
                name: repo,
            };
        }

        if (fallback) {
            return {
                full: fallback,
                name: fallback,
            };
        }

        return null;
    };

    try {
        const url = new URL(ensureProtocol);
        const display = normalizeRepo(url.pathname);

        if (display) {
            return display;
        }

        return {
            full: url.hostname,
            name: url.hostname,
        };
    } catch {
        const display = normalizeRepo(trimmed);

        if (display) {
            return display;
        }

        return null;
    }
}

export function ProjectTable(): JSX.Element {
    const {
        data,
        loading,
        error,
        page,
        totalPages,
        hasStaleData,
        nextPage,
        prevPage,
        refresh,
    } = useCollection<Project>("projects", {
        mapDocument: mapProjectDocument,
        orderByField: "certifiedDate",
        orderDirection: "desc",
        pageSize: ROW_TARGET,
        filters: visibleProjectFilters,
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
            {hasStaleData && page > 0 && (
                <div className="border-b border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-800">
                    <span>New speedsters arriving! ⭐</span>
                    <button
                        type="button"
                        className="ml-2 font-semibold underline hover:text-blue-900"
                        onClick={refresh}
                    >
                        Fetch latest
                    </button>
                </div>
            )}
            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-xs text-gray-700 sm:text-sm">
                    <thead className="bg-zinc-50 text-[0.65rem] font-semibold uppercase tracking-wide text-gray-500 sm:text-xs">
                        <tr>
                            <th
                                scope="col"
                                className="min-w-[96px] px-3 py-4 sm:min-w-[180px] sm:px-6 sm:py-5"
                            >
                                Repository
                            </th>
                            <th
                                scope="col"
                                className="min-w-[88px] px-3 py-4 sm:min-w-[140px] sm:px-6 sm:py-5"
                            >
                                Certified On
                            </th>
                            <th
                                scope="col"
                                className="px-4 py-4 sm:px-6 sm:py-5"
                            >
                                Speed Claim
                            </th>
                            <th
                                scope="col"
                                className="px-4 py-4 text-right sm:px-6 sm:py-5"
                            >
                                Status
                            </th>
                        </tr>
                    </thead>
                    <Tooltip.Provider delayDuration={120} skipDelayDuration={0}>
                        <tbody className="divide-y divide-gray-100">
                            {projects.map((project, index) => {
                                const isPlaceholder = !project.exists;
                                const statusMeta = project.status
                                    ? STATUS_META[project.status]
                                    : undefined;
                                const trimmedBlurb = project.blurb.trim();
                                const hasBlurb = trimmedBlurb.length > 0;
                                const repositoryUrl = normalizeRepository(
                                    project.repository
                                );
                                const repositoryDisplay = getRepositoryDisplay(
                                    project.repository,
                                    project.name
                                );
                                const rowIsInteractive =
                                    !isPlaceholder && repositoryUrl.length > 0;

                                return (
                                    <tr
                                        key={`${
                                            project.repository ||
                                            project.name ||
                                            "placeholder"
                                        }-${index}`}
                                        className={`transition hover:bg-zinc-50/80 ${
                                            rowIsInteractive
                                                ? "cursor-pointer focus-within:bg-zinc-50/80"
                                                : ""
                                        }`}
                                        onClick={
                                            rowIsInteractive
                                                ? (event) => {
                                                      const target =
                                                          event.target;
                                                      if (
                                                          target instanceof
                                                              HTMLElement &&
                                                          target.closest(
                                                              "a, button"
                                                          )
                                                      ) {
                                                          return;
                                                      }
                                                      const anchor =
                                                          event.currentTarget.querySelector<HTMLAnchorElement>(
                                                              '[data-row-link="true"]'
                                                          );
                                                      anchor?.click();
                                                  }
                                                : undefined
                                        }
                                        onKeyDown={
                                            rowIsInteractive
                                                ? (event) => {
                                                      if (
                                                          event.key ===
                                                              "Enter" ||
                                                          event.key === " "
                                                      ) {
                                                          event.preventDefault();
                                                          const anchor =
                                                              event.currentTarget.querySelector<HTMLAnchorElement>(
                                                                  '[data-row-link="true"]'
                                                              );
                                                          anchor?.click();
                                                      }
                                                  }
                                                : undefined
                                        }
                                        role={
                                            rowIsInteractive
                                                ? "link"
                                                : undefined
                                        }
                                        tabIndex={rowIsInteractive ? 0 : -1}
                                    >
                                        <th
                                            scope="row"
                                            className="relative px-3 py-3 text-left font-semibold text-gray-900 break-all sm:break-normal sm:px-6 sm:py-4"
                                        >
                                            {isPlaceholder ||
                                            !repositoryDisplay ? (
                                                <span className="text-gray-300">
                                                    —
                                                </span>
                                            ) : (
                                                <>
                                                    <span className="font-semibold break-all sm:break-normal">
                                                        {repositoryDisplay.owner ? (
                                                            <>
                                                                <span className="sm:hidden">
                                                                    {
                                                                        repositoryDisplay.name
                                                                    }
                                                                </span>
                                                                <span className="hidden sm:inline">
                                                                    {
                                                                        repositoryDisplay.full
                                                                    }
                                                                </span>
                                                            </>
                                                        ) : (
                                                            repositoryDisplay.full
                                                        )}
                                                    </span>
                                                    <Link
                                                        data-row-link="true"
                                                        href={repositoryUrl}
                                                        className="absolute inset-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                                                    >
                                                        <span className="sr-only">
                                                            Visit{" "}
                                                            {
                                                                repositoryDisplay.full
                                                            }
                                                        </span>
                                                    </Link>
                                                </>
                                            )}
                                        </th>
                                        <td className="min-w-[88px] whitespace-nowrap px-3 py-3 text-gray-600 sm:min-w-[140px] sm:px-6 sm:py-4">
                                            {isPlaceholder ? (
                                                <span className="text-gray-300">
                                                    —
                                                </span>
                                            ) : (
                                                project.certifiedOn
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-gray-600 sm:px-6 sm:py-4">
                                            {isPlaceholder ? (
                                                <span className="text-gray-300">
                                                    —
                                                </span>
                                            ) : hasBlurb ? (
                                                <Tooltip.Root>
                                                    <Tooltip.Trigger asChild>
                                                        <span className="line-clamp-2 cursor-help sm:line-clamp-none">
                                                            {project.blurb}
                                                        </span>
                                                    </Tooltip.Trigger>
                                                    <Tooltip.Portal>
                                                        <Tooltip.Content
                                                            className="max-w-xs rounded-md bg-gray-900 px-3 py-2 text-xs text-white shadow-lg"
                                                            side="top"
                                                            align="start"
                                                            sideOffset={6}
                                                        >
                                                            {trimmedBlurb}
                                                            <Tooltip.Arrow className="fill-gray-900" />
                                                        </Tooltip.Content>
                                                    </Tooltip.Portal>
                                                </Tooltip.Root>
                                            ) : (
                                                <span className="line-clamp-2 sm:line-clamp-none">
                                                    {project.blurb}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-right sm:px-6 sm:py-4">
                                            {isPlaceholder || !statusMeta ? (
                                                <span className="text-gray-300">
                                                    —
                                                </span>
                                            ) : (
                                                <p
                                                    className={`m-0 flex items-center justify-end gap-2 font-mono text-[0.625rem] font-semibold tracking-wide sm:text-xs ${statusMeta.className}`}
                                                >
                                                    {statusMeta.label}
                                                </p>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Tooltip.Provider>
                </table>
            </div>
            <div className="flex items-center justify-between gap-6 border-t border-gray-100 bg-zinc-50 px-6 py-3 text-xs text-gray-500">
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
