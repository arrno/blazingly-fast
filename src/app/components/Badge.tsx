import type { HTMLAttributes, ReactNode } from "react";

const VARIANT_STYLES = {
    neutral: "border border-zinc-200 bg-zinc-50 text-zinc-700",
    outline: "border border-zinc-300 bg-white text-zinc-700",
    success: "border border-emerald-200 bg-emerald-50 text-emerald-800",
    info: "border border-sky-200 bg-sky-50 text-sky-800",
    warning: "border border-amber-200 bg-amber-50 text-amber-800",
    danger: "border border-rose-200 bg-rose-50 text-rose-800",
    hot: "px-2 py-0.5 border border-orange-200 bg-gradient-to-r from-orange-100 to-red-100 text-orange-700",
    iris: "px-2 py-0.5 border border-purple-200 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700",
    sunny: "px-2 py-0.5 border border-yellow-200 bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700",
    sprout: "px-2 py-0.5 border border-emerald-200 bg-gradient-to-r from-emerald-50 to-lime-100 text-emerald-700",
    sage: "px-2 py-0.5 border border-emerald-100 bg-gradient-to-r from-zinc-100 to-emerald-100 text-emerald-700",
    muted: "border-0 bg-zinc-100 text-zinc-600",
} as const;

export type BadgeVariant = keyof typeof VARIANT_STYLES;

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
    children: ReactNode;
}

export function Badge({
    variant = "neutral",
    children,
    className = "",
    ...rest
}: BadgeProps) {
    const baseClasses =
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide sm:text-xs";

    return (
        <span
            className={`${baseClasses} ${VARIANT_STYLES[variant]} ${className}`}
            {...rest}
        >
            {children}
        </span>
    );
}
