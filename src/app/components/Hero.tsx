import Image from "next/image";
import Link from "next/link";
import { PageSection } from "./PageSection";
import { GetCertifiedButton } from "./GetCertifiedButton";
import { HowCards } from "./HowCards";

export function Hero() {
    return (
        <div className="relative overflow-hidden bg-zinc-50">
            <div className="absolute inset-x-0 -top-20 -z-10 h-96 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.12),_transparent_55%)]" />
            <PageSection
                className="relative pt-[4rem] pb-[4.5rem]"
                id="how-it-works"
            >
                <div className="mx-auto flex max-w-3xl flex-col items-center gap-10 text-center sm:items-start sm:text-left">
                    <div className="space-y-6">
                        <div className="flex gap-2 justify-center sm:justify-start">
                            <Image
                                src="/fast-badge.svg"
                                alt="Blazingly fast badge"
                                className="mt-2"
                                width={104}
                                height={20}
                            />
                            <Image
                                src="/slow-badge.svg"
                                alt="Blazingly pending badge"
                                className="mt-2"
                                width={124}
                                height={20}
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

                    <div className="w-full">
                        <h2 id="how-it-works-heading" className="sr-only">
                            How it works
                        </h2>
                        <HowCards ariaLabelledBy="how-it-works-heading" />
                    </div>
                </div>
            </PageSection>
        </div>
    );
}
