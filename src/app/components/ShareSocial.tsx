"use client";

import type { MouseEvent } from "react";

interface SharePayload {
    shareUrl: string;
    message: string;
}

interface ShareSocialProps extends SharePayload {
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
        title: "Certified Blazingly Fast™",
        summary: message,
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
                            d="M3 3h4.5l4.1 5.68L15.7 3H21l-7.5 9.2L21 21h-4.5l-4.4-6.06L7.9 21H3l7.6-9.06L3 3Z"
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
                            d="M4.98 3.5c0 1.38-1.12 2.5-2.49 2.5H2.4C1.05 6 0 4.88 0 3.5 0 2.12 1.1 1 2.45 1 3.8 1 4.9 2.12 4.98 3.5ZM0 8.5h4.9V23H0V8.5Zm7.6 0h4.7v1.98h.07c.66-1.24 2.28-2.54 4.69-2.54 5.02 0 5.94 3.3 5.94 7.59V23h-4.9v-7.17c0-1.71-.03-3.92-2.39-3.92-2.4 0-2.77 1.87-2.77 3.8V23H7.6V8.5Z"
                        />
                    </svg>
                </a>
            </div>
        </div>
    );
}
