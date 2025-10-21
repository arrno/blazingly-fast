import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
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
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} bg-white text-gray-900 antialiased`}
            >
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
