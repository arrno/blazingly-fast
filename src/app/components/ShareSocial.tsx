"use client";

import type { MouseEvent } from "react";

interface SharePayload {
    shareUrl: string;
    message: string;
}

interface ShareSocialProps extends SharePayload {
    shareUrl: string;
    message: string;
    className?: string;
}

function buildTwitterUrl({ shareUrl, message }: SharePayload): string {
    const params = new URLSearchParams({
        text: message,
        url: shareUrl,
    });
    return `https://twitter.com/intent/tweet?${params.toString()}`;
}

function buildLinkedInUrl({ shareUrl, message }: SharePayload): string {
    const params = new URLSearchParams({
        mini: "true",
        url: shareUrl,
        title: message,
    });
    return `https://www.linkedin.com/shareArticle?${params.toString()}`;
}

function openShareWindow(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const url = event.currentTarget.href;
    const width = 600;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    window.open(
        url,
        "share-window",
        `width=${width},height=${height},left=${left},top=${top},noopener`
    );
}

export function ShareSocial({ shareUrl, message, className = "" }: ShareSocialProps) {
    const encodedProps = { shareUrl, message };
    const twitterHref = buildTwitterUrl(encodedProps);
    const linkedinHref = buildLinkedInUrl(encodedProps);

    return (
        <div className={`flex flex-wrap items-center gap-3 ${className}`}>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                Share the flex
            </span>
            <div className="flex items-center gap-2">
                <a
                    href={twitterHref}
                    onClick={openShareWindow}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-sm text-gray-600 transition hover:border-gray-300 hover:text-gray-900"
                    aria-label="Share on X"
                >
                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="h-4 w-4"
                    >
                        <path
                            fill="currentColor"
                            d="M20.98 3.5h-3.5l-4.07 5.38-3.6-5.38H3.03l7.48 10.8-6.85 9.2h3.52l4.4-5.94 4 5.94h6.33l-7.63-10.7 6.7-9.3z"
                        />
                    </svg>
                </a>
                <a
                    href={linkedinHref}
                    onClick={openShareWindow}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-sm text-gray-600 transition hover:border-gray-300 hover:text-gray-900"
                    aria-label="Share on LinkedIn"
                >
                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="h-4 w-4"
                    >
                        <path
                            fill="currentColor"
                            d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Zm-9.75 15.25H6.25V10h3v8.25ZM7.75 8.75a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5Zm10.5 9.5h-3v-4c0-.95-.78-1.75-1.75-1.75S11.75 13.3 11.75 14.25v4h-3V10h3v1.02a3.25 3.25 0 0 1 5.25 2.53v4.7Z"
                        />
                    </svg>
                </a>
            </div>
        </div>
    );
}
