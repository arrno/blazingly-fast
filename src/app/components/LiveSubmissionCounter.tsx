"use client";

import { useCallback, useMemo, useState } from "react";
import type { QueryDocumentSnapshot } from "firebase/firestore";
import { visibleProjectFilters } from "../constants/projectFilters";
import { useCollectionSocket } from "../hooks/useCollectionSocket";

const DIGIT_COUNT = 4;

export function LiveSubmissionCounter() {
    const mapProjectId = useCallback(
        (doc: QueryDocumentSnapshot): string => doc.id,
        []
    );
    const { totalRecords, loading, error } = useCollectionSocket<string>(
        "projects",
        {
            mapDocument: mapProjectId,
            orderByField: "certifiedDate",
            orderDirection: "desc",
            pageSize: 1,
            filters: visibleProjectFilters,
        }
    );

    const displayCount = useMemo(() => {
        if (error) {
            return "-".repeat(DIGIT_COUNT);
        }

        const safeTotal = Math.max(0, totalRecords);
        return safeTotal.toString().padStart(DIGIT_COUNT, "0");
    }, [error, totalRecords]);

    const renderedCount =
        loading && !error ? "·".repeat(DIGIT_COUNT) : displayCount;

    return (
        <div className="pointer-events-none fixed left-1/2 top-[3.65rem] z-30 w-full max-w-[9rem] -translate-x-1/2 sm:top-[4.45rem]">
            <div className="flex w-full flex-col gap-1.5 rounded-sm border border-black/5 bg-white/95 py-2 text-center text-slate-900 shadow-[0_12px_22px_rgba(15,23,42,0.12)] backdrop-blur">
                <div className="flex items-center justify-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.28em]">
                    <div
                        aria-live="polite"
                        className="font-mono text-base font-black leading-none tracking-[0.12em]"
                    >
                        {renderedCount}
                    </div>
                    <span
                        aria-hidden
                        className="inline-flex h-1 w-1 animate-pulse rounded-full bg-emerald-400"
                    />
                    <div className="leading-none">Repos</div>
                </div>
                {error && (
                    <p className="text-xs font-medium text-rose-500">{error}</p>
                )}
            </div>
        </div>
    );
}
