import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = localFont({
    variable: "--font-geist-sans",
    display: "swap",
    src: [
        {
            path: "../../public/fonts/geist/Geist[wght].woff2",
            weight: "100 900",
            style: "normal",
        },
        {
            path: "../../public/fonts/geist/Geist-Italic[wght].woff2",
            weight: "100 900",
            style: "italic",
        },
    ],
});

const geistMono = localFont({
    variable: "--font-geist-mono",
    display: "swap",
    src: [
        {
            path: "../../public/fonts/geist-mono/GeistMono[wght].woff2",
            weight: "100 900",
            style: "normal",
        },
        {
            path: "../../public/fonts/geist-mono/GeistMono-Italic[wght].woff2",
            weight: "100 900",
            style: "italic",
        },
    ],
});

const siteUrl = "https://blazingly.fast";

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: "blazingly.fast — Certified Blazingly Fast™",
        template: "%s | blazingly.fast",
    },
    description:
        "The world’s most rigorous self-certification program for claiming speed. Submit your repo, tick yes, collect your badge.",
    keywords: [
        "blazingly fast",
        "performance",
        "certification",
        "speed badge",
        "hall of speed",
    ],
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "blazingly.fast — Certified Blazingly Fast™",
        description:
            "The world’s most rigorous self-certification program for claiming speed.",
        url: siteUrl,
        siteName: "blazingly.fast",
        locale: "en_US",
        type: "website",
        images: [
            {
                url: "/fast-badge.svg",
                alt: "Certified Blazingly Fast badge",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "blazingly.fast — Certified Blazingly Fast™",
        description:
            "Submit your repo, tick yes, collect the Certified Blazingly Fast™ badge.",
        images: ["/fast-badge.svg"],
    },
    robots: {
        index: true,
        follow: true,
    },
    themeColor: "#ffffff",
    appleWebApp: {
        title: "blazingly.fast",
        statusBarStyle: "default",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable}`}
        >
            <body className="bg-white text-gray-900 antialiased">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
