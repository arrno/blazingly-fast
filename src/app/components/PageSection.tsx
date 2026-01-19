import type { HTMLAttributes, PropsWithChildren } from "react";

type SectionSize = "default" | "tight";

type PageSectionProps = HTMLAttributes<HTMLDivElement> & {
    size?: SectionSize;
};

export function PageSection({
    children,
    className = "",
    size = "default",
    ...rest
}: PropsWithChildren<PageSectionProps>) {
    const spacingClasses =
        size === "tight" ? "px-6 py-4" : "px-6 py-16 sm:py-30";
    const baseClasses = `mx-auto w-full max-w-6xl ${spacingClasses}`;
    const merged = className ? `${baseClasses} ${className}` : baseClasses;

    return (
        <section className={merged} {...rest}>
            {children}
        </section>
    );
}
