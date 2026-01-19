const steps = [
    {
        title: "Paste your repo URL",
        description:
            "Drop in the GitHub link you already brag about in the README.",
        badge: "Step 1",
    },
    {
        title: "Answer truthfully",
        description:
            "Check the only box that matters. Honesty counts, winks are optional.",
        badge: "Step 2",
    },
    {
        title: "Collect your badge",
        description:
            "Embed the Certified Blazingly Fast™ badge anywhere pixels are accepted.",
        badge: "Step 3",
    },
];

interface HowCardsProps {
    ariaLabelledBy?: string;
}

export function HowCards({ ariaLabelledBy }: HowCardsProps) {
    return (
        <div
            className="w-full rounded-md border border-gray-200 bg-white/85 p-6 shadow-lg shadow-gray-900/5 backdrop-blur"
            aria-labelledby={ariaLabelledBy}
        >
            <div className="flex flex-col gap-8 sm:flex-row sm:gap-0">
                {steps.map((step, index) => (
                    <div
                        key={step.title}
                        className="relative flex-1 text-left sm:px-8 first:sm:pl-0 last:sm:pr-0"
                    >
                        <span className="inline-flex items-center gap-2 rounded-md bg-zinc-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gray-800">
                            <svg
                                viewBox="0 0 20 20"
                                aria-hidden
                                className="h-4 w-4 text-[#ff6b6b]"
                            >
                                <path
                                    d="M16 5 8.5 14 4 9.5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                />
                            </svg>
                            <span className="font-mono tracking-[0.2em]">
                                {step.badge}
                            </span>
                        </span>
                        <h3 className="mt-4 text-sm font-bold text-gray-900">
                            {step.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-gray-600">
                            {step.description}
                        </p>

                        {index < steps.length - 1 ? (
                            <>
                                <span
                                    aria-hidden
                                    className="hidden sm:block absolute right-0 top-1/2 h-[90%] w-px -translate-y-1/2 translate-x-1/2 bg-gray-200/80 shadow-[0_0_10px_rgba(0,0,0,0.08)]"
                                />
                                <span
                                    aria-hidden
                                    className="block sm:hidden mx-auto mt-6 h-px w-11/12 bg-gray-200/80 shadow-[0_0_10px_rgba(0,0,0,0.08)]"
                                />
                            </>
                        ) : null}
                    </div>
                ))}
            </div>
        </div>
    );
}
