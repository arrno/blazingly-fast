import Link from "next/link";
import { Project, Status } from "../domain/projects";
import { Badge, type BadgeVariant } from "./Badge";
import { HashEmojiIcon } from "./HashEmojiIcon";
import {
    getRepositoryDisplay,
    normalizeRepository,
    STATUS_META,
} from "./projectData";

const STATUS_BADGE_VARIANT: Record<Status, BadgeVariant> = {
    [Status.Fast]: "hot",
    [Status.Pending]: "info",
    [Status.Average]: "warning",
};

type RepoCardProps = {
    project: Project;
    variant?: "standalone" | "table";
    className?: string;
};

const ACTION_BUTTON_CLASSES =
    "inline-flex h-7 w-7 text-xs items-center justify-center rounded-full bg-zinc-100 text-gray-500 transition hover:bg-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-300 sm:h-8 sm:w-8 sm:text-sm";

function HeartIcon() {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
        >
            <path
                d="M10 17s-6-3.3-6-8a3.5 3.5 0 0 1 6-2.4A3.5 3.5 0 0 1 16 9c0 4.7-6 8-6 8Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function CommentIcon() {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
        >
            <path
                d="M5 15.5 2.5 18V5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function RepoCard({
    project,
    variant = "standalone",
    className = "",
}: RepoCardProps) {
    const repositoryDisplay = getRepositoryDisplay(
        project.repository,
        project.name
    );
    const repositoryUrl = normalizeRepository(project.repository);
    const statusMeta = STATUS_META[project.status];
    const displayMaintainer =
        project.maintainer.trim() || repositoryDisplay?.owner || "";
    const hasMaintainer = displayMaintainer.length > 0;
    const blurbLength = project.blurb.trim().length;
    const hasBlurb = blurbLength > 0;
    const isManifestoBlurb = hasBlurb && blurbLength >= 120;
    const isDetailedBlurb = hasBlurb && blurbLength >= 45 && blurbLength < 120;
    const isConciseBlurb = hasBlurb && blurbLength > 0 && blurbLength < 45;
    const canVisitRepo = repositoryDisplay && repositoryUrl.length > 0;

    const isTableVariant = variant === "table";
    const wrapperClasses = isTableVariant
        ? "block py-4"
        : "block rounded-md border border-gray-200 bg-white p-4";
    const clickableClasses = canVisitRepo
        ? "group cursor-pointer transition-shadow duration-200 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-200"
        : "";
    const hashSeed =
        repositoryDisplay?.full ||
        project.repository ||
        project.name ||
        project.id;
    const titleClasses = `text-base font-semibold break-all sm:break-normal ${
        canVisitRepo
            ? "text-gray-900 transition-colors group-hover:text-gray-600"
            : "text-gray-900"
    }`;

    const content = (
        <div>
            <div className="grid grid-cols-[auto_1fr] gap-4">
                <HashEmojiIcon text={hashSeed} className="mt-1" />
                <div className="min-w-0 space-y-1 text-left">
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                            {repositoryDisplay ? (
                                <span className={titleClasses}>
                                    {repositoryDisplay.full}
                                </span>
                            ) : (
                                <span className="text-base font-semibold text-gray-400">
                                    Untitled repository
                                </span>
                            )}
                        </div>
                        <div className="flex items-start justify-end gap-2">
                            <button
                                type="button"
                                className={ACTION_BUTTON_CLASSES}
                                aria-label="Applaud repository"
                            >
                                <HeartIcon />
                                <span className="sr-only">Applaud</span>
                            </button>
                            <button
                                type="button"
                                className={ACTION_BUTTON_CLASSES}
                                aria-label="Discuss repository"
                            >
                                <CommentIcon />
                                <span className="sr-only">Comment</span>
                            </button>
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 max-w-[60ch]">
                        {hasBlurb
                            ? project.blurb
                            : "No speed claim provided. Speak now or forever hold your benchmarks."}
                    </p>
                </div>
            </div>

            <div className="mt-3 flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:justify-between">
                <div className="repo-card__meta-row flex items-center gap-2 overflow-x-auto whitespace-nowrap text-gray-500">
                    {hasMaintainer && (
                        <Badge variant="muted">
                            Maintainer {displayMaintainer}
                        </Badge>
                    )}
                    <Badge variant="muted" className="text-gray-600">
                        Certified {project.certifiedOn}
                    </Badge>
                </div>
                <div className="repo-card__meta-row flex items-center gap-2 overflow-x-auto whitespace-nowrap">
                    {isManifestoBlurb ? (
                        <Badge variant="iris">🌀 Manifesto</Badge>
                    ) : isDetailedBlurb ? (
                        <Badge variant="sunny">🥇 Detailed</Badge>
                    ) : isConciseBlurb ? (
                        <Badge variant="sage">🌱 Concise</Badge>
                    ) : null}
                    {statusMeta && (
                        <Badge variant={STATUS_BADGE_VARIANT[project.status]}>
                            {statusMeta.label}
                        </Badge>
                    )}
                    {!project.exists && (
                        <Badge variant="danger">missing repo</Badge>
                    )}
                </div>
            </div>
        </div>
    );

    const combinedClasses =
        `${wrapperClasses} ${clickableClasses} ${className}`.trim();

    if (canVisitRepo) {
        return (
            <Link href={repositoryUrl} className={combinedClasses}>
                {content}
            </Link>
        );
    }

    return <article className={combinedClasses}>{content}</article>;
}
