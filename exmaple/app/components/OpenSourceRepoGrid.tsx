import Link from "next/link";
import type { ReactNode } from "react";

const joinClasses = (...classes: (string | undefined)[]) =>
    classes.filter(Boolean).join(" ");

const variantStyles = {
    dark: {
        card: "relative flex h-full flex-col rounded-xl border border-slate-900 bg-slate-950 p-5 shadow-[0_12px_32px_-20px_rgba(15,23,42,0.8)] transition-all duration-150 hover:-translate-y-1 hover:border-blue-500/60 hover:shadow-[0_20px_48px_-18px_rgba(59,130,246,0.4)]",
        icon: "flex h-10 w-10 items-center justify-center rounded-lg border border-blue-500/40 bg-slate-900 text-blue-300 shadow-[0_0_0_1px_rgba(59,130,246,0.4)]",
        name: "font-mono text-sm font-semibold uppercase tracking-wide text-blue-200 group-hover:text-blue-100",
        meta: "font-mono text-[11px] uppercase tracking-[0.28em] text-gray-500/90",
        description:
            "mt-4 font-mono text-[13px] leading-relaxed text-slate-300",
        cta: "mt-6 flex items-center justify-between font-mono text-xs uppercase tracking-[0.3em] text-blue-200",
        accent: "pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/80 to-transparent opacity-0 transition-opacity duration-150 group-hover:opacity-100",
    },
    light: {
        card: "relative flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-[0_16px_40px_-32px_rgba(15,23,42,0.45)] transition-transform duration-150 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_22px_52px_-26px_rgba(15,23,42,0.25)]",
        icon: "flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-100 text-slate-600 shadow-[0_0_0_1px_rgba(15,23,42,0.08)] transition-colors duration-150",
        name: "font-mono text-sm font-semibold uppercase tracking-wide text-slate-900 transition-colors duration-150",
        meta: "font-mono text-[11px] uppercase tracking-[0.28em] text-slate-400",
        description:
            "mt-4 font-mono text-[13px] leading-relaxed text-slate-600",
        cta: "mt-6 flex items-center justify-between font-mono text-xs uppercase tracking-[0.3em] text-slate-600 transition-colors duration-150",
        accent: "pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent to-transparent opacity-0 transition-opacity duration-150 group-hover:opacity-100",
    },
} as const;

const accentThemes = {
    default: {
        card: "",
        icon: "",
        name: "",
        cta: "",
        accent: "",
    },
    python: {
        card: "hover:border-[#3776AB]/50 hover:shadow-[0_22px_52px_-26px_rgba(55,118,171,0.35)]",
        icon: "border-[#91BFE4] bg-[#EAF2FB] text-[#2B5B94] shadow-[0_0_0_1px_rgba(55,118,171,0.25)]",
        name: "text-[#2B5B94] group-hover:text-[#3776AB]",
        cta: "text-[#3776AB] group-hover:text-[#2B5B94]",
        accent: "bg-gradient-to-r from-transparent via-[#3776AB]/55 to-transparent",
    },
    go: {
        card: "hover:border-[#00ADD8]/50 hover:shadow-[0_22px_52px_-26px_rgba(0,173,216,0.35)]",
        icon: "border-[#99E3F5] bg-[#E6FAFF] text-[#007EA2] shadow-[0_0_0_1px_rgba(0,173,216,0.25)]",
        name: "text-[#007EA2] group-hover:text-[#00ADD8]",
        cta: "text-[#00ADD8] group-hover:text-[#007EA2]",
        accent: "bg-gradient-to-r from-transparent via-[#00ADD8]/55 to-transparent",
    },
    rust: {
        card: "hover:border-[#B7410E]/50 hover:shadow-[0_22px_52px_-26px_rgba(183,65,14,0.35)]",
        icon: "border-[#F0C6B2] bg-[#FFF3ED] text-[#B7410E] shadow-[0_0_0_1px_rgba(183,65,14,0.25)]",
        name: "text-[#B7410E] group-hover:text-[#8F320B]",
        cta: "text-[#B7410E] group-hover:text-[#8F320B]",
        accent: "bg-gradient-to-r from-transparent via-[#B7410E]/55 to-transparent",
    },
} as const;

export type AccentName = Exclude<keyof typeof accentThemes, "default">;

type RepoBadge = {
    name: string;
    url: string;
    icon: ReactNode;
    description?: string;
    meta?: string;
    accent?: AccentName;
};

type Variant = keyof typeof variantStyles;

type OpenSourceRepoGridProps = {
    repos: RepoBadge[];
    heading?: string;
    className?: string;
    variant?: Variant;
};

export function OpenSourceRepoGrid({
    repos,
    heading,
    className,
    variant = "dark",
}: OpenSourceRepoGridProps) {
    if (!repos.length) {
        return null;
    }

    const sectionClass = ["w-full", className].filter(Boolean).join(" ");
    const styles = variantStyles[variant] ?? variantStyles.dark;
    const arrowClass =
        "transition-transform duration-150 group-hover:translate-x-1";

    return (
        <section className={sectionClass}>
            {heading ? (
                <div className="mb-6">
                    <h2 className="font-mono text-xs uppercase tracking-[0.4em] text-gray-500/80">
                        {heading}
                    </h2>
                </div>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {repos.map((repo) => {
                    const accent = repo.accent
                        ? accentThemes[repo.accent]
                        : accentThemes.default;

                    return (
                        <Link
                            key={repo.url}
                            href={repo.url}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="group"
                        >
                            <article
                                className={joinClasses(
                                    styles.card,
                                    accent.card
                                )}
                            >
                                <div className="flex items-start gap-3">
                                    <div
                                        className={joinClasses(
                                            styles.icon,
                                            accent.icon
                                        )}
                                    >
                                        {typeof repo.icon === "string" ? (
                                            <span className="text-xl leading-none">
                                                {repo.icon}
                                            </span>
                                        ) : (
                                            repo.icon
                                        )}
                                    </div>
                                    <div className="flex min-w-0 flex-col">
                                        <span
                                            className={joinClasses(
                                                styles.name,
                                                accent.name
                                            )}
                                        >
                                            {repo.name}
                                        </span>
                                        {repo.meta ? (
                                            <span className={styles.meta}>
                                                {repo.meta}
                                            </span>
                                        ) : null}
                                    </div>
                                </div>

                                {repo.description ? (
                                    <p className={styles.description}>
                                        {repo.description}
                                    </p>
                                ) : null}

                                <div
                                    className={joinClasses(
                                        styles.cta,
                                        accent.cta
                                    )}
                                >
                                    <span>View Repo</span>
                                    <span className={arrowClass}>→</span>
                                </div>

                                <div
                                    className={joinClasses(
                                        styles.accent,
                                        accent.accent
                                    )}
                                />
                            </article>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
