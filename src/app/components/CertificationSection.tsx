"use client";

import { CertificationFormCard } from "./CertificationFormCard";
import { PageSection } from "./PageSection";

const faqItems = [
    {
        question: "Do you verify the speed?",
        answer: "No. We believe in trust and optimism.",
    },
    {
        question: "What if my project isn’t fast?",
        answer: "Then make it blazingly fast and re-apply.",
    },
    {
        question: "Is there a badge for that?",
        answer: "Coming soon: actually.blazingly.fast.",
    },
];

export function CertificationSection() {
    return (
        <div className="bg-white">
            <PageSection
                id="faq"
                className="grid gap-12 border-t border-gray-100 py-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
            >
                <div className="space-y-6">
                    <div className="space-y-3">
                        <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
                            Vibes required
                        </p>
                        <h2 className="text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl">
                            Trust the badge. Trust yourself.
                        </h2>
                        <p className="max-w-lg text-base leading-relaxed text-gray-600">
                            Certified Blazingly Fast™ is a self-reported
                            performance standard. We measure confidence, not
                            microbenchmarks.
                        </p>
                    </div>

                    <dl className="space-y-6">
                        {faqItems.map((item) => (
                            <div key={item.question} className="space-y-2">
                                <dt className="text-sm font-semibold text-gray-900">
                                    {item.question}
                                </dt>
                                <dd className="text-sm leading-relaxed text-gray-600">
                                    {item.answer}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>

                <CertificationFormCard anchorId="submit" />
            </PageSection>
        </div>
    );
}
