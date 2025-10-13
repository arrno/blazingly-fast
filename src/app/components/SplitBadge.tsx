import type { HTMLAttributes, ReactNode } from "react";

interface SplitBadgeProps extends HTMLAttributes<HTMLSpanElement> {
    leading: ReactNode;
    trailing: ReactNode;
    color?: string;
    leadingClassName?: string;
    trailingClassName?: string;
}

const DEFAULT_COLOR = "#ff6b6b"; // hot coral

export function SplitBadge({
    leading,
    trailing,
    color = DEFAULT_COLOR,
    leadingClassName = "",
    trailingClassName = "",
    className = "",
    ...rest
}: SplitBadgeProps) {
    const baseClasses =
        "inline-flex items-center overflow-hidden rounded-lg border border-gray-200 text-xs font-semibold uppercase tracking-wider shadow-sm";

    return (
        <span className={`${baseClasses} ${className}`} {...rest}>
            <span
                className={`flex items-center gap-1 px-2 py-1 pr-2 text-white ${leadingClassName}`}
                style={{ backgroundColor: color }}
            >
                {leading}
            </span>
            <span
                className={`flex items-center px-2 py-1 pl-2 bg-white text-gray-700 ${trailingClassName}`}
            >
                {trailing}
            </span>
        </span>
    );
}
