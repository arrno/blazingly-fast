"use client";

import { useEffect } from "react";
import { visibleProjectFilters } from "../constants/projectFilters";
import { Project } from "../domain/projects";
import { useCollectionSocket as useCollection } from "../hooks/useCollectionSocket";
import { mapProjectDocument } from "./projectData";
import { RepoCard } from "./RepoCard";
import { PageNavigation } from "./PageNavigation";

const PAGE_SIZE = 10;

export function RepoList() {
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

            <PageNavigation
                loading={loading}
                page={page}
                totalPages={totalPages}
                onPrev={prevPage}
                onNext={nextPage}
            />

            <div className="space-y-3">
                {hasProjects ? (
                    data.map((project) => (
                        <RepoCard key={project.id} project={project} />
                    ))
                ) : (
                    <div className="rounded-2xl border border-dashed border-gray-200 bg-white/60 px-4 py-16 text-center text-sm text-gray-500">
                        {loading
                            ? "Loading speedsters…"
                            : "No repositories certified yet. Submit yours to claim a badge."}
                    </div>
                )}
            </div>

            <PageNavigation
                loading={loading}
                page={page}
                totalPages={totalPages}
                onPrev={prevPage}
                onNext={nextPage}
            />
        </section>
    );
}
