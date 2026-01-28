import Image from "next/image";
import Link from "next/link";
import { PageSection } from "./PageSection";
import { GetCertifiedButton } from "./GetCertifiedButton";
import { ContactModalTrigger } from "./ContactModalTrigger";

const legalLinkClass =
    "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500 transition hover:text-zinc-300";

export function Footer() {
    return (
        <footer className="relative overflow-hidden border-t border-white/10 bg-slate-950 text-gray-200">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-900" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.12),_rgba(76,29,149,0.08)_45%,_transparent_70%)]" />
            </div>
            <PageSection className="relative z-10 flex flex-col gap-12 py-20 sm:py-24">
                <div className="space-y-4 max-w-3xl">
                    <div className="flex gap-2">
                        <Image
                            src="/fast-badge.svg"
                            alt="Blazingly fast badge"
                            className="mt-2"
                            width={104}
                            height={20}
                        />
                        {/* <img
                            src="/slow-badge.svg"
                            alt="Blazingly pending badge"
                            className="mt-2"
                        /> */}
                    </div>
                    <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                        The trust fall of performance claims.
                    </h2>
                    <p className="text-sm leading-relaxed text-zinc-400">
                        Certified Blazingly Fast is a self-reported performance
                        standard. We celebrate ambition, encourage optimism, and
                        remind the world that benchmarks aren't the only metric
                        that matters.
                    </p>
                    <p className="text-sm leading-relaxed text-zinc-400">
                        No benchmarks were harmed in the making of this site.
                    </p>
                </div>

                <div className="flex flex-col gap-4 border-t border-white/10 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-white mb-1">
                            Ready to self-certify?
                        </p>
                        <p className="text-zinc-400">
                            Submit your repo, check the box, and claim your
                            place in the Hall of Speed.
                        </p>
                    </div>
                    <GetCertifiedButton className="group inline-flex items-center gap-2 font-mono text-sm text-zinc-300 transition hover:text-violet-400">
                        <span className="text-violet-400">[</span>
                        <span>Certify repo</span>
                        <span className="text-violet-400">]</span>
                        <span
                            className="transition-transform group-hover:translate-x-0.5"
                            aria-hidden
                        >
                            →
                        </span>
                    </GetCertifiedButton>
                </div>

                <div className="flex flex-col gap-4 text-xs uppercase tracking-[0.25em]">
                    <div className="flex flex-col gap-2 text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
                        <span>
                            © {new Date().getFullYear()} blazingly.fast — run
                            responsibly.
                        </span>
                        <span>Powered entirely by trust and good vibes.</span>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <ContactModalTrigger className="text-zinc-500" />
                        <Link href="/terms" className={legalLinkClass}>
                            Terms
                        </Link>
                        <Link href="/privacy" className={legalLinkClass}>
                            Privacy
                        </Link>
                    </div>
                </div>
            </PageSection>
        </footer>
    );
}
