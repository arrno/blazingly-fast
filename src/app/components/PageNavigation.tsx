type PageNavigationVariant = "default" | "embedded";

interface PageNavigationProps {
    loading: boolean;
    page: number;
    totalPages: number;
    onPrev: () => void;
    onNext: () => void;
    className?: string;
    labelPrefix?: string;
    variant?: PageNavigationVariant;
}

export function PageNavigation({
    loading,
    page,
    totalPages,
    onPrev,
    onNext,
    className = "",
    labelPrefix = "Page",
    variant = "default",
}: PageNavigationProps) {
    const safeTotal = Math.max(1, totalPages);
    const pageLabel = `${labelPrefix} ${Math.min(
        page + 1,
        safeTotal
    )} of ${safeTotal}`;
    const baseClasses =
        variant === "embedded"
            ? "flex flex-wrap items-center justify-between gap-4 bg-white py-3 px-4 text-xs text-gray-500"
            : "flex flex-wrap items-center justify-between gap-6 rounded-md border border-gray-200 bg-white px-4 py-3 text-xs text-gray-500 sm:px-6";

    return (
        <div className={`${baseClasses} ${className}`}>
            <div className="font-medium text-gray-600">
                {loading ? "Loading projects…" : pageLabel}
            </div>
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={onPrev}
                    className="inline-flex items-center gap-1 font-semibold text-gray-400 transition hover:text-gray-700 disabled:cursor-not-allowed disabled:text-gray-300"
                    disabled={loading || page === 0}
                >
                    <span aria-hidden>←</span>
                    Prev
                </button>
                <button
                    type="button"
                    onClick={onNext}
                    className="inline-flex items-center gap-1 font-semibold text-gray-400 transition hover:text-gray-700 disabled:cursor-not-allowed disabled:text-gray-300"
                    disabled={loading || page + 1 >= safeTotal}
                >
                    Next
                    <span aria-hidden>→</span>
                </button>
            </div>
        </div>
    );
}
