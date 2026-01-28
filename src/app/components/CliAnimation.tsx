"use client";

import { useEffect, useState } from "react";

type AnimationPhase =
    | "typing"
    | "detecting"
    | "analyzing"
    | "certified"
    | "complete";

type ColorVariant =
    | "purple"
    | "coral"
    | "green"
    | "blue"
    | "lightPurple"
    | "redPurple";

const colorConfig = {
    purple: {
        prompt: "text-violet-400",
        cursor: "bg-violet-400",
        success: "text-emerald-400",
        badge: "text-violet-400",
    },
    lightPurple: {
        prompt: "text-violet-400",
        cursor: "bg-violet-400",
        success: "text-emerald-400",
        badge: "text-violet-400",
    },
    redPurple: {
        prompt: "text-red-400",
        cursor: "bg-red-400",
        success: "text-emerald-400",
        badge: "text-red-400",
    },
    coral: {
        prompt: "text-fuchsia-400",
        cursor: "bg-fuchsia-400",
        success: "text-emerald-400",
        badge: "text-fuchsia-400",
    },
    green: {
        prompt: "text-emerald-400",
        cursor: "bg-emerald-400",
        success: "text-emerald-400",
        badge: "text-emerald-400",
    },
    blue: {
        prompt: "text-blue-400",
        cursor: "bg-blue-400",
        success: "text-emerald-400",
        badge: "text-blue-400",
    },
};

interface CliAnimationProps {
    variant?: ColorVariant;
}

export function CliAnimation({ variant = "purple" }: CliAnimationProps) {
    const colors = colorConfig[variant];
    const [typedText, setTypedText] = useState("");
    const [phase, setPhase] = useState<AnimationPhase>("typing");
    const fullCommand = 'declare "vibes boosted"';

    useEffect(() => {
        if (phase !== "typing") return;

        // Phase 1: Type out command
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            if (currentIndex <= fullCommand.length) {
                setTypedText(fullCommand.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(typingInterval);
                setTimeout(() => setPhase("detecting"), 300);
            }
        }, 100);

        return () => clearInterval(typingInterval);
    }, [phase]);

    useEffect(() => {
        if (phase === "detecting") {
            setTimeout(() => setPhase("analyzing"), 100);
        } else if (phase === "analyzing") {
            setTimeout(() => setPhase("certified"), 700);
        } else if (phase === "certified") {
            setTimeout(() => setPhase("complete"), 400);
        } else if (phase === "complete") {
            // Wait 2 seconds then restart the animation
            setTimeout(() => {
                setTypedText("");
                setPhase("typing");
            }, 2000);
        }
    }, [phase]);

    return (
        <div className="w-full max-w-2xl space-y-3 font-mono text-base sm:text-lg">
            {/* Command line */}
            <div className="flex items-center gap-3 text-left">
                <span className={colors.prompt}>$</span>
                <span className="text-zinc-100">
                    {typedText}
                    {phase === "typing" && (
                        <span
                            className={`ml-0.5 inline-block h-5 w-[2px] animate-blink ${colors.cursor}`}
                        ></span>
                    )}
                </span>
            </div>

            {/* Output section */}
            <div className="min-h-[5rem] space-y-2 text-left text-sm sm:text-base">
                {phase === "detecting" && (
                    <div className="animate-in fade-in duration-200 text-zinc-500">
                        Detected repository: blazingly-fast
                    </div>
                )}

                {phase === "analyzing" && (
                    <>
                        <div className="text-zinc-500">
                            Detected repository: blazingly-fast
                        </div>
                        <div className="animate-in fade-in duration-200 text-zinc-500">
                            Analyzing speed vibes...
                        </div>
                    </>
                )}

                {(phase === "certified" || phase === "complete") && (
                    <div
                        className={`animate-in fade-in duration-300 ${colors.success}`}
                    >
                        ✓ Certified blazingly fast
                    </div>
                )}

                {phase === "complete" && (
                    <div
                        className={`animate-in fade-in slide-in-from-top-1 duration-300 ${colors.badge}`}
                    >
                        → Badge live at blazinglyfast.dev/hall-of-speed
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes blink {
                    0%,
                    50% {
                        opacity: 1;
                    }
                    51%,
                    100% {
                        opacity: 0;
                    }
                }
                .animate-blink {
                    animation: blink 1s infinite;
                }
            `}</style>
        </div>
    );
}
