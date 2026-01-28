import Image from "next/image";
import { PageSection } from "./PageSection";
import { HowCards } from "./HowCards";

export function HowSection() {
    return (
        <div className="bg-zinc-50">
            <PageSection
                className="grid gap-12 border-t border-gray-100 py-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
                id="how-it-works"
            >
                {/* Left side */}
                <div className="space-y-6">
                    <div className="space-y-3">
                        <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
                            Optimism unlocked
                        </p>
                        <h2 className="text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl">
                            Every project claims to be fast, we believe it
                        </h2>
                        <p className="max-w-lg text-base leading-relaxed text-gray-600">
                            Submit your repo, tick "Yes", and join the official
                            Hall of Speed with the badge that makes everything
                            appear 12% faster.
                        </p>
                        <p className="max-w-lg text-base leading-relaxed text-gray-600">
                            <em>
                                *Statistically significant in vibes, not in
                                benchmarks.
                            </em>
                        </p>
                    </div>

                    <div className="flex gap-2 pl-1">
                        <Image
                            src="/fast-badge.svg"
                            alt="Blazingly fast badge"
                            width={104}
                            height={20}
                        />
                        <Image
                            src="/slow-badge.svg"
                            alt="Blazingly pending badge"
                            width={124}
                            height={20}
                        />
                    </div>
                </div>

                {/* Right side */}
                <div>
                    <h3 id="how-it-works-heading" className="sr-only">
                        How it works
                    </h3>
                    <HowCards
                        ariaLabelledBy="how-it-works-heading"
                        layout="vertical"
                    />
                </div>
            </PageSection>
        </div>
    );
}
