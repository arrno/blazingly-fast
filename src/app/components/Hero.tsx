import Link from "next/link";
import { PageSection } from "./PageSection";

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

export function Hero() {
    return (
        <div className="relative overflow-hidden bg-gradient-to-b from-white via-white to-gray-50">
            <div className="absolute inset-x-0 -top-20 -z-10 h-96 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.12),_transparent_55%)]" />
            <PageSection className="relative py-24">
                <div className="mx-auto flex max-w-3xl flex-col items-center gap-10 text-center sm:items-start sm:text-left">
                    <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-1 text-sm font-medium text-gray-600 shadow-sm backdrop-blur">
                        <span className="text-base">💠</span>
                        Certified Blazingly Fast™
                    </div>

                    <div className="space-y-6">
                        <h1 className="text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
                            The world’s most rigorous self-certification
                            program.
                        </h1>
                        <p className="text-lg leading-relaxed text-gray-600">
                            Every project claims to be{" "}
                            <strong>blazingly fast</strong>. We believe you.
                            Submit your repo, tick &quot;Yes&quot;, and join the
                            official Hall of Speed with the badge that makes
                            everything appear <em>12% faster*</em>.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                        <Link
                            href="#submit"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-gray-900/10 transition hover:bg-gray-800"
                        >
                            Submit your repo
                            <span aria-hidden>→</span>
                        </Link>
                        <Link
                            href="#leaderboard"
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-800 transition hover:border-gray-300"
                        >
                            Browse the leaderboard
                        </Link>
                        <span className="text-xs text-gray-500">
                            *Statistically significant in vibes, not in
                            benchmarks.
                        </span>
                    </div>

                    <div
                        className="grid w-full gap-4 sm:grid-cols-3"
                        id="how-it-works"
                        aria-labelledby="how-it-works-heading"
                    >
                        <h2 id="how-it-works-heading" className="sr-only">
                            How it works
                        </h2>
                        {steps.map((step) => (
                            <div
                                key={step.title}
                                className="rounded-2xl border border-gray-200 bg-white/70 p-4 text-left shadow-sm backdrop-blur"
                            >
                                <span className="inline-flex rounded-full bg-gray-900 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                                    {step.badge}
                                </span>
                                <h3 className="mt-4 text-sm font-semibold text-gray-900">
                                    {step.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </PageSection>
        </div>
    );
}
