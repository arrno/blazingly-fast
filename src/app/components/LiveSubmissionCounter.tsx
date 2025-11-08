"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { QueryDocumentSnapshot } from "firebase/firestore";
import { visibleProjectFilters } from "../constants/projectFilters";
import { useCollectionSocket } from "../hooks/useCollectionSocket";

const DIGIT_COUNT = 4;
const FLICKER_INTERVAL = 8000;
const FLICKER_GLYPH = "~!*%";
const FLICKER_PATTERN: Array<{ delay: number; glyph: string | null }> = [
    { delay: 0, glyph: FLICKER_GLYPH },
    { delay: 300, glyph: null },
];

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
    const [flickerGlyph, setFlickerGlyph] = useState<string | null>(null);

    const displayCount = useMemo(() => {
        if (error) {
            return "-".repeat(DIGIT_COUNT);
        }

        const safeTotal = Math.max(0, totalRecords);
        return safeTotal.toString().padStart(DIGIT_COUNT, "0");
    }, [error, totalRecords]);

    const statusLine = useMemo(() => {
        if (error) {
            return "feed offline";
        }
        if (loading) {
            return "syncing";
        }
        if (totalRecords === 1) {
            return "one repo";
        }
        return `${totalRecords} repos`;
    }, [error, loading, totalRecords]);

    const renderedCount =
        loading && !error ? "·".repeat(DIGIT_COUNT) : displayCount;
    const countForDisplay = flickerGlyph ? flickerGlyph : renderedCount;
    const shouldAnimate = !loading && !error;

    useEffect(() => {
        if (!shouldAnimate) {
            setFlickerGlyph(null);
            return;
        }

        const timeouts: Array<ReturnType<typeof setTimeout>> = [];

        const triggerFlicker = () => {
            timeouts.forEach(clearTimeout);
            timeouts.length = 0;

            FLICKER_PATTERN.forEach(({ delay, glyph }) => {
                timeouts.push(
                    setTimeout(() => {
                        setFlickerGlyph(glyph);
                    }, delay)
                );
            });
        };

        const intervalId = setInterval(triggerFlicker, FLICKER_INTERVAL);
        triggerFlicker();

        return () => {
            timeouts.forEach(clearTimeout);
            clearInterval(intervalId);
        };
    }, [shouldAnimate]);

    return (
        <div className="pointer-events-none fixed left-1/2 top-[3.65rem] z-30 w-full max-w-[10rem] -translate-x-1/2 sm:top-[4.45rem]">
            <div className="pointer-events-auto relative inline-flex w-full flex-col gap-1.5 rounded-sm border border-black/5 bg-white/95 px-4 py-3 text-center text-slate-900 shadow-[0_12px_22px_rgba(15,23,42,0.12)] backdrop-blur">
                <div
                    aria-live={flickerGlyph ? "off" : "polite"}
                    className="font-mono text-[clamp(1.4rem,4vw,1.6rem)] font-black leading-none tracking-[0.12em]"
                >
                    {countForDisplay}
                </div>
                {!error && (
                    <div className="flex items-center justify-center gap-1.5 text-[0.50rem] font-semibold uppercase tracking-[0.28em] text-slate-500">
                        <span
                            aria-hidden
                            className="inline-flex h-1 w-1 animate-pulse rounded-full bg-emerald-400"
                        />
                        Live submissions
                    </div>
                )}
                {error && (
                    <p className="text-xs font-medium text-rose-500">{error}</p>
                )}
            </div>
        </div>
    );
}
