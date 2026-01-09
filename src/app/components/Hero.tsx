import Link from "next/link";
import { PageSection } from "./PageSection";
import { SplitBadge } from "./SplitBadge";
import { GetCertifiedButton } from "./GetCertifiedButton";

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
        <div className="relative overflow-hidden bg-zinc-50">
            <div className="absolute inset-x-0 -top-20 -z-10 h-96 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.12),_transparent_55%)]" />
            <PageSection
                className="relative pt-[4.5rem] pb-24 sm:pt-32 sm:pb-24"
                id="how-it-works"
            >
                <div className="mx-auto flex max-w-3xl flex-col items-center gap-10 text-center sm:items-start sm:text-left">
                    <div className="space-y-6">
                        <div className="flex gap-2 justify-center sm:justify-start">
                            <img
                                src="/fast-badge.svg"
                                alt="Blazingly fast badge"
                                className="mt-2"
                            />
                            <img
                                src="/slow-badge.svg"
                                alt="Blazingly pending badge"
                                className="mt-2"
                            />
                        </div>
                        <h1 className="text-5xl font-bold tracking-tight text-gray-950 sm:text-6xl lg:text-7xl">
                            The world’s most rigorous self-certification
                            program.
                        </h1>
                        <p className="text-lg leading-relaxed text-gray-600">
                            Every project claims to be{" "}
                            <strong>blazingly fast</strong>. We believe it.
                            Submit your repo, tick &quot;Yes&quot;, and join the
                            official Hall of Speed with the badge that makes
                            everything appear <em>12% faster</em>.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                        <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start w-55 sm:w-auto">
                            <GetCertifiedButton className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-gray-900/10 transition hover:bg-gray-800 sm:inline-flex sm:w-auto">
                                Submit repo
                                <span aria-hidden>→</span>
                            </GetCertifiedButton>
                            <Link
                                href="/hall-of-speed"
                                className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-zinc-50 px-6 py-3 text-sm font-semibold text-gray-800 transition hover:border-zinc-400 sm:inline-flex sm:w-auto"
                            >
                                Browse leaderboard
                            </Link>
                        </div>
                        <span className="w-full text-center text-xs text-gray-500 sm:w-auto sm:text-left">
                            *Statistically significant in vibes, not in
                            benchmarks.
                        </span>
                    </div>

                    <div
                        className="grid w-full gap-4 sm:grid-cols-3"
                        aria-labelledby="how-it-works-heading"
                    >
                        <h2 id="how-it-works-heading" className="sr-only">
                            How it works
                        </h2>
                        {steps.map((step) => (
                            <div
                                key={step.title}
                                className="rounded-md border border-gray-100 bg-white/70 p-4 text-left shadow-lg backdrop-blur"
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
                            </div>
                        ))}
                    </div>
                </div>
            </PageSection>
        </div>
    );
}
