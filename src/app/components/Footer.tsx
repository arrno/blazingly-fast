import Image from "next/image";
import Link from "next/link";
import { PageSection } from "./PageSection";
import { GetCertifiedButton } from "./GetCertifiedButton";
import { ContactModalTrigger } from "./ContactModalTrigger";

const legalLinkClass =
    "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/60 transition hover:text-white";

export function Footer() {
    return (
        <footer className="relative overflow-hidden border-t border-gray-200 bg-slate-950 text-gray-200">
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
                    <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                        The trust fall of performance claims.
                    </h2>
                    <p className="text-sm leading-relaxed text-white/70">
                        Certified Blazingly Fast is a self-reported performance
                        standard. We celebrate ambition, encourage optimism, and
                        remind the world that benchmarks aren’t the only metric
                        that matters.
                    </p>
                    <p className="text-sm leading-relaxed text-white/60">
                        No benchmarks were harmed in the making of this site.
                    </p>
                </div>

                <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/5 p-6 text-sm text-white/80 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.6)] sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-white mb-1">
                            Ready to self-certify?
                        </p>
                        <p className="text-white/70">
                            Submit your repo, check the box, and claim your
                            place in the Hall of Speed.
                        </p>
                    </div>
                    <GetCertifiedButton className="inline-flex items-center justify-center gap-2 rounded-lg bg-white/10 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-white/15">
                        Get certified
                        <span aria-hidden>→</span>
                    </GetCertifiedButton>
                </div>

                <div className="flex flex-col gap-4 text-xs uppercase tracking-[0.25em]">
                    <div className="flex flex-col gap-2 text-white/40 sm:flex-row sm:items-center sm:justify-between">
                        <span>
                            © {new Date().getFullYear()} blazingly.fast — run
                            responsibly.
                        </span>
                        <span>Powered entirely by trust and good vibes.</span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-white/60">
                        <ContactModalTrigger className="text-white/60" />
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
