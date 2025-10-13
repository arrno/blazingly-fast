import Link from "next/link";
import { PageSection } from "./PageSection";

const navLinks = [
    { label: "How it works", href: "#how-it-works" },
    { label: "Why", href: "#why" },
    { label: "FAQ", href: "#faq" },
];

export function Navbar() {
    return (
        <header className="sticky top-0 z-20 border-b border-black/5 bg-white/80 backdrop-blur">
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
                    <span className="text-lg font-bold tracking-tight">
                        🔥 blazingly.fast
                    </span>
                </Link>

                <nav className="hidden items-center gap-6 text-sm font-medium text-gray-600 sm:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="transition hover:text-gray-900"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <Link
                        href="#leaderboard"
                        className="hidden rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-300 hover:text-gray-900 sm:inline-flex"
                    >
                        Leaderboard
                    </Link>
                    <Link
                        href="#submit"
                        className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800"
                    >
                        Get certified
                        <span aria-hidden>→</span>
                    </Link>
                </div>
            </PageSection>
        </header>
    );
}
