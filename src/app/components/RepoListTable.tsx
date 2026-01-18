"use client";

import Link from "next/link";
import { useEffect } from "react";
import { visibleProjectFilters } from "../constants/projectFilters";
import { Project } from "../domain/projects";
import { useCollectionSocket as useCollection } from "../hooks/useCollectionSocket";
import { getRepositoryLinkMeta, mapProjectDocument } from "./projectData";
import { RepoCard } from "./RepoCard";
import { PageNavigation } from "./PageNavigation";
import { Spinner } from "./Spinner";

const PAGE_SIZE = 10;

export function RepoListTable() {
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
        pageSize: PAGE_SIZE,
        filters: visibleProjectFilters,
    });

    useEffect(() => {
        const listener = () => refresh();
        window.addEventListener("project-submitted", listener);
        return () => window.removeEventListener("project-submitted", listener);
    }, [refresh]);

    const hasProjects = data.length > 0;

    return (
        <section className="space-y-4">
            {error && (
                <div className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            {hasStaleData && (
                <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-800">
                    <span>Fresh certifications are waiting.</span>
                    <button
                        type="button"
                        className="ml-2 font-semibold underline hover:text-blue-900"
                        onClick={refresh}
                    >
                        Fetch latest
                    </button>
                </div>
            )}

            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                <PageNavigation
                    loading={loading}
                    page={page}
                    totalPages={totalPages}
                    onPrev={prevPage}
                    onNext={nextPage}
                    variant="embedded"
                    className="px-4"
                />
                <div className="mx-auto h-px w-[90%] bg-gray-100" />

                {hasProjects ? (
                    <div className="space-y-2 pt-4">
                        {data.map((project, index) => {
                            const { canVisitRepo, repositoryUrl } =
                                getRepositoryLinkMeta(project);
                            const isLast = index + 1 === data.length;
                            const rowContent = (
                                <>
                                    <RepoCard
                                        project={project}
                                        variant="table"
                                        className="px-4"
                                        disableInteraction
                                    />
                                    <div
                                        className={`mx-auto ${
                                            isLast ? "mt-4" : "mt-3"
                                        } h-px w-[90%] bg-gray-100`}
                                    />
                                </>
                            );

                            if (canVisitRepo) {
                                return (
                                    <Link
                                        key={project.id}
                                        href={repositoryUrl}
                                        className="group relative z-0 block cursor-pointer transition-shadow duration-200 hover:z-10 hover:shadow-md focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-200"
                                    >
                                        {rowContent}
                                    </Link>
                                );
                            }

                            return (
                                <div key={project.id} className="block">
                                    {rowContent}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="px-6 py-16 text-center text-sm text-gray-500">
                        {loading ? (
                            <div className="flex flex-col items-center gap-3 text-gray-600">
                                <Spinner
                                    className="h-6 w-6 text-gray-400"
                                    label="Loading certified projects"
                                />
                                <span>Loading speedsters…</span>
                            </div>
                        ) : (
                            "No repositories certified yet. Submit yours to claim a badge."
                        )}
                    </div>
                )}
                {!hasProjects && (
                    <div className="mx-auto h-px w-[90%] bg-gray-100" />
                )}

                <PageNavigation
                    loading={loading}
                    page={page}
                    totalPages={totalPages}
                    onPrev={prevPage}
                    onNext={nextPage}
                    variant="embedded"
                    className="px-4"
                />
            </div>
        </section>
    );
}
