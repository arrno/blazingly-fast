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

export const metadata: Metadata = {
    title: "blazingly.fast — Certified Blazingly Fast™",
    description:
        "The world’s most rigorous self-certification program for claiming speed. Submit your repo, tick yes, collect your badge.",
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
