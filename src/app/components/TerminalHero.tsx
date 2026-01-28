import Link from "next/link";
import { GetCertifiedButton } from "./GetCertifiedButton";
import { PageSection } from "./PageSection";
import { CliAnimation } from "./CliAnimation";

type ColorVariant =
    | "purple"
    | "coral"
    | "green"
    | "blue"
    | "lightPurple"
    | "redPurple";

const colorConfig = {
    purple: {
        gradient: "from-violet-400 via-fuchsia-400 to-violet-400",
        radialBg: "rgba(168,85,247,0.12), rgba(76,29,149,0.08)",
        prompt: "text-violet-400",
        bracket: "text-violet-400",
        hover: "hover:text-violet-400",
        success: "text-violet-400",
    },
    lightPurple: {
        gradient: "from-violet-400 via-violet-300 to-violet-400",
        radialBg: "rgba(168,85,247,0.12), rgba(76,29,149,0.08)",
        prompt: "text-violet-400",
        bracket: "text-violet-400",
        hover: "hover:text-violet-400",
        success: "text-violet-400",
    },
    redPurple: {
        gradient: "from-red-500 via-violet-500 to-red-500",
        radialBg: "rgba(139,92,246,0.12), rgba(124,58,237,0.08)",
        prompt: "text-red-400",
        bracket: "text-red-400",
        hover: "hover:text-red-400",
        success: "text-red-400",
    },
    coral: {
        gradient: "from-rose-400 via-pink-400 to-rose-400",
        radialBg: "rgba(168,85,247,0.12), rgba(217,70,239,0.08)",
        prompt: "text-fuchsia-400",
        bracket: "text-fuchsia-400",
        hover: "hover:text-fuchsia-400",
        success: "text-fuchsia-400",
    },
    green: {
        gradient: "from-emerald-400 via-green-400 to-emerald-400",
        radialBg: "rgba(52,211,153,0.12), rgba(34,197,94,0.08)",
        prompt: "text-emerald-400",
        bracket: "text-emerald-400",
        hover: "hover:text-emerald-400",
        success: "text-emerald-400",
    },
    blue: {
        gradient: "from-blue-400 via-sky-400 to-blue-400",
        radialBg: "rgba(96,165,250,0.12), rgba(56,189,248,0.08)",
        prompt: "text-blue-400",
        bracket: "text-blue-400",
        hover: "hover:text-blue-400",
        success: "text-blue-400",
    },
};

interface TerminalHeroProps {
    variant?: ColorVariant;
}

export function TerminalHero({ variant = "purple" }: TerminalHeroProps) {
    const colors = colorConfig[variant];
    return (
        <section className="relative overflow-hidden bg-slate-950 text-white">
            {/* Subtle background gradient */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-900" />
                <div
                    className="absolute inset-0"
                    style={{
                        background: `radial-gradient(circle at top, ${colors.radialBg} 45%, transparent 70%)`,
                    }}
                />
            </div>

            <PageSection className="relative z-10 py-24 sm:py-32">
                <div className="mx-auto flex max-w-3xl flex-col gap-12">
                    {/* Main heading */}
                    <div className="space-y-6 text-center sm:text-left">
                        <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                            Ship blazingly fast badges
                            <br />
                            <span
                                className={`bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}
                            >
                                from your terminal
                            </span>
                        </h1>
                        <p className="text-lg leading-relaxed text-zinc-400">
                            One command to self-certify your repo and join the
                            Hall of Speed
                        </p>
                    </div>

                    {/* CLI section with actions */}
                    <div className="space-y-8">
                        <CliAnimation variant={variant} />

                        {/* CTA buttons */}
                        <div className="flex flex-wrap items-center gap-3 font-mono text-sm">
                            <GetCertifiedButton
                                className={`group flex items-center gap-2 text-zinc-300 transition ${colors.hover}`}
                            >
                                <span className={colors.bracket}>[</span>
                                <span>Get your badge</span>
                                <span className={colors.bracket}>]</span>
                                <span className="transition-transform group-hover:translate-x-0.5">
                                    →
                                </span>
                            </GetCertifiedButton>
                            <Link
                                href="/hall-of-speed"
                                className="group flex items-center gap-2 text-zinc-500 transition hover:text-zinc-300"
                            >
                                <span className="text-zinc-600">[</span>
                                <span>Hall of Speed</span>
                                <span className="text-zinc-600">]</span>
                            </Link>
                            <div className="ml-auto hidden text-zinc-500 sm:block">
                                <code>npm install -g bfast</code>
                            </div>
                        </div>

                        {/* Mobile install hint */}
                        <div className="text-center text-sm text-zinc-600 sm:hidden">
                            <code>npm install -g bfast</code>
                        </div>
                    </div>
                </div>
            </PageSection>
        </section>
    );
}
