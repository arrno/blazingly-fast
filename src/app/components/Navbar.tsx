"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PageSection } from "./PageSection";
import { GetCertifiedButton } from "./GetCertifiedButton";

const navLinks = [
    { label: "How it works", href: "#how-it-works" },
    { label: "FAQ", href: "#faq" },
    { label: "Why", href: "#why" },
];

export function Navbar() {
    const pathname = usePathname();
    const isHome = pathname === "/";
    const [isCompact, setIsCompact] = useState(false);

    const resolveHref = (href: string) => {
        if (href.startsWith("#") && !isHome) {
            return `/${href}`;
        }
        return href;
    };

    useEffect(() => {
        const updateCompactMode = () => {
            setIsCompact(window.innerWidth < 640);
        };

        updateCompactMode();
        window.addEventListener("resize", updateCompactMode);
        return () => window.removeEventListener("resize", updateCompactMode);
    }, []);

    return (
        <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/80 backdrop-blur">
            <PageSection
                size="tight"
                className="flex items-center justify-between"
            >
                <Link
                    href="/"
                    className="flex items-center gap-2 font-semibold text-gray-900 transition hover:text-gray-700"
                >
                    {/* <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
                        🔥
                    </span> */}
                    <span className="inline-flex items-center gap-1.5 text-lg sm:text-xl">
                        {/* <Image
                            src="/badger_icon.png"
                            alt="Badger logo"
                            width={24}
                            height={24}
                            className="w-7 sm:w-7.25 -translate-y-0.25"
                            priority
                        /> */}
                        {"| "}
                        <span className="font-bold">blazingly fast</span>
                        {" |"}
                    </span>
                </Link>

                <nav className="hidden items-center gap-6 text-sm font-medium text-gray-600 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={resolveHref(link.href)}
                            className="transition hover:text-gray-900"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <Link
                        href="/hall-of-speed"
                        className="hidden rounded-lg border border-gray-300 px-4 py-2 sm:py-3 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:text-gray-900 sm:inline-flex"
                    >
                        Leaderboard
                    </Link>
                    <GetCertifiedButton className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 sm:py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800">
                        {isCompact ? "Certify" : "Certify it"}
                        <span aria-hidden>→</span>
                    </GetCertifiedButton>
                </div>
            </PageSection>
        </header>
    );
}
