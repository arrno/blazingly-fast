"use client";

import { useCallback, useEffect, useMemo, useState, FormEvent } from "react";
import { Modal } from "./Modal";
import { useModal } from "./ModalProvider";
import { ShareSocial } from "./ShareSocial";
import { Spinner } from "./Spinner";

function normalizeRepoInput(input: string) {
    const trimmed = input.trim();
    if (!trimmed) {
        return "";
    }
    const withoutProtocol = trimmed.replace(/^https?:\/\/github\.com\//i, "");
    const withoutTrailing = withoutProtocol.replace(/\.git$/i, "");
    return withoutTrailing.replace(/\/$/, "");
}

function toGithubUrl(slug: string): string {
    if (!slug) {
        return "";
    }
    if (/^https?:\/\//i.test(slug)) {
        return slug;
    }
    return `https://github.com/${slug}`;
}

export function ModalForm() {
    const { modalType, closeModal } = useModal();
    const open = modalType === "certification";

    const [repoInput, setRepoInput] = useState("https://github.com/");
    const [isFast, setIsFast] = useState<"yes" | "no" | null>(null);
    const [blurb, setBlurb] = useState("");
    const [status, setStatus] = useState<"idle" | "submitting" | "success">(
        "idle"
    );
    const [error, setError] = useState<string | null>(null);
    const [successRepo, setSuccessRepo] = useState<string | null>(null);
    const [isCompact, setIsCompact] = useState(false);
    const [copyState, setCopyState] = useState<"idle" | "copied" | "error">(
        "idle"
    );

    useEffect(() => {
        if (!open) {
            setRepoInput("https://github.com/");
            setIsFast(null);
            setBlurb("");
            setStatus("idle");
            setError(null);
            setSuccessRepo(null);
        }
    }, [open]);

    useEffect(() => {
        const updateCompactMode = () => {
            setIsCompact(window.innerHeight < 750);
        };

        updateCompactMode();

        window.addEventListener("resize", updateCompactMode);
        return () => window.removeEventListener("resize", updateCompactMode);
    }, []);

    const repoSlug = useMemo(() => normalizeRepoInput(repoInput), [repoInput]);
    const trimmedBlurb = useMemo(() => blurb.trim(), [blurb]);
    const blurbLength = trimmedBlurb.length;
    const isBlurbValid = blurbLength > 0 && blurbLength <= 128;
    const isComplete =
        repoSlug.length > 0 &&
        isFast === "yes" &&
        isBlurbValid &&
        status !== "submitting";
    const badgeSnippet = useMemo(() => {
        if (!repoSlug || status !== "success") {
            return "";
        }
        const encodedRepo = encodeURIComponent(repoSlug);
        return `[![blazingly fast](https://blazingly.fast/api/badge.svg?repo=${encodedRepo})](https://blazingly.fast)`;
    }, [repoSlug, status]);

    useEffect(() => {
        setCopyState("idle");
    }, [badgeSnippet]);

    useEffect(() => {
        if (copyState !== "copied") {
            return;
        }
        const timeoutId = window.setTimeout(() => {
            setCopyState("idle");
        }, 2000);
        return () => window.clearTimeout(timeoutId);
    }, [copyState]);

    const handleCopySnippet = useCallback(async () => {
        if (!badgeSnippet) {
            return;
        }
        try {
            if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(badgeSnippet);
            } else {
                const textarea = document.createElement("textarea");
                textarea.value = badgeSnippet;
                textarea.setAttribute("readonly", "");
                textarea.style.position = "absolute";
                textarea.style.left = "-9999px";
                document.body.appendChild(textarea);
                textarea.select();
                const copied = document.execCommand("copy");
                document.body.removeChild(textarea);
                if (!copied) {
                    throw new Error("Copy command failed");
                }
            }
            setCopyState("copied");
        } catch (copyError) {
            console.error("Failed to copy badge snippet", copyError);
            setCopyState("error");
        }
    }, [badgeSnippet]);

    const handleSubmit = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (!repoSlug) {
                setError("Enter a GitHub repository");
                return;
            }
            if (isFast !== "yes") {
                setError("Confirm your project is blazingly fast");
                return;
            }
            if (!isBlurbValid) {
                setError("Blurb must be between 1 and 128 characters");
                return;
            }

            setError(null);
            setStatus("submitting");

            try {
                const response = await fetch("/api/project", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        repoUrl: toGithubUrl(repoSlug),
                        isBlazinglyFast: isFast === "yes",
                        blurb: trimmedBlurb,
                        hidden: false,
                    }),
                });

                const payload = await response.json().catch(() => ({}));

                if (!response.ok) {
                    const message =
                        typeof payload.error === "string"
                            ? payload.error
                            : "Submission failed";
                    throw new Error(message);
                }

                setStatus("success");
                setSuccessRepo(repoSlug);
                window.dispatchEvent(new Event("project-submitted"));
            } catch (submissionError) {
                setStatus("idle");
                setError((submissionError as Error).message);
            }
        },
        [repoSlug, isFast, isBlurbValid, trimmedBlurb]
    );

    const containerSpacingClass = isCompact ? "space-y-6" : "space-y-8";
    const headerSpacingClass = isCompact ? "space-y-1" : "space-y-2";
    const headingTextClass = `${
        isCompact ? "text-xl" : "text-2xl"
    } font-semibold tracking-tight text-gray-900`;
    const formSpacingClass = isCompact ? "space-y-5" : "space-y-6";
    const fieldsetPaddingClass = isCompact
        ? "space-y-2 rounded-2xl border border-gray-200 bg-white p-3"
        : "space-y-3 rounded-2xl border border-gray-200 bg-white p-4";
    const textareaClass = `w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-[16px] text-gray-900 shadow-sm transition focus:border-[#ff6b6b] focus:outline-none focus:ring-2 focus:ring-[#ff6b6b]/20 focus:shadow-[0_0_0_4px_rgba(255,107,107,0.12)] sm:text-sm ${
        isCompact ? "min-h-[72px]" : "min-h-[96px]"
    }`;
    const submitButtonClass = `inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-8 ${
        isCompact ? "py-3" : "py-4"
    } text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-200 w-full`;
    const copyButtonClass = `inline-flex items-center gap-1 rounded-md bg-transparent px-2 py-1 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b6b]/30 ${
        copyState === "copied"
            ? "text-emerald-600"
            : "text-gray-500 hover:text-gray-900"
    }`;

    return (
        <Modal open={open} onClose={closeModal} ariaLabel="Certification form">
            <div className={containerSpacingClass}>
                <header className={headerSpacingClass}>
                    <h2 className={headingTextClass}>Submit your project</h2>
                    {isCompact ? (
                        <p className="text-xs text-gray-500">
                            Paste your repo, confirm it&apos;s fast, and submit.
                        </p>
                    ) : (
                        <p className="text-sm text-gray-600">
                            Claim the badge in three moves: paste your repo,
                            choose honesty, write your speed boast, and we will
                            handle the rest.
                        </p>
                    )}
                </header>

                <form className={formSpacingClass} onSubmit={handleSubmit}>
                    {status !== "success" && (
                        <>
                            <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                                Repo URL
                                <input
                                    value={repoInput}
                                    onChange={(event) =>
                                        setRepoInput(event.target.value)
                                    }
                                    placeholder="https://github.com/you/yourproject"
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-[16px] text-gray-900 shadow-sm transition focus:border-[#ff6b6b] focus:outline-none focus:ring-2 focus:ring-[#ff6b6b]/20 focus:shadow-[0_0_0_4px_rgba(255,107,107,0.12)] sm:text-sm"
                                />
                            </label>

                            <fieldset className={fieldsetPaddingClass}>
                                <legend className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Is your project blazingly fast?
                                </legend>
                                <label className="flex items-center gap-3 text-sm text-gray-700">
                                    <input
                                        type="radio"
                                        name="isFast"
                                        value="yes"
                                        checked={isFast === "yes"}
                                        onChange={() => setIsFast("yes")}
                                        className="h-4 w-4 appearance-none rounded-full border border-gray-300 checked:border-[#ff6b6b] checked:bg-[#ff6b6b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b6b]/30"
                                    />
                                    Yes
                                </label>
                                <label className="flex items-center gap-3 text-sm text-gray-700">
                                    <input
                                        type="radio"
                                        name="isFast"
                                        value="no"
                                        checked={isFast === "no"}
                                        onChange={() => setIsFast("no")}
                                        className="h-4 w-4 appearance-none rounded-full border border-gray-300 checked:border-[#ff6b6b] checked:bg-[#ff6b6b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b6b]/30"
                                    />
                                    No (come back when it is)
                                </label>
                            </fieldset>

                            <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                                Speed claim blurb
                                <textarea
                                    value={blurb}
                                    maxLength={128}
                                    onChange={(event) =>
                                        setBlurb(event.target.value)
                                    }
                                    placeholder="Tell us how blazingly fast you are in 128 characters."
                                    className={textareaClass}
                                />
                                <span className="self-end text-xs text-gray-400">
                                    {blurbLength}/128
                                </span>
                            </label>
                        </>
                    )}

                    {error && (
                        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    {status === "submitting" && (
                        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600">
                            <Spinner
                                className="h-5 w-5 text-gray-500"
                                label="Submitting"
                            />
                            <span>Submitting your project…</span>
                        </div>
                    )}

                    {status === "success" && successRepo && (
                        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                            Project accepted! Welcome to the Hall of Speed.
                        </div>
                    )}

                    {status !== "success" && (
                        <div className="flex">
                            <button
                                type="submit"
                                disabled={!isComplete}
                                className={submitButtonClass}
                            >
                                {status === "submitting"
                                    ? "Submitting…"
                                    : "Submit project"}
                            </button>
                        </div>
                    )}
                </form>

                {badgeSnippet && (
                    <div className="space-y-4 rounded-3xl border border-gray-200 bg-gray-50 p-5">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="space-y-1">
                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Congratulations 🎉
                                </p>
                                <p className="text-sm text-gray-600">
                                    Drop this flex into your README, docs, or
                                    merch.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={handleCopySnippet}
                                className={copyButtonClass}
                                aria-label="Copy badge snippet"
                            >
                                {copyState === "copied" ? "Copied!" : "Copy"}
                            </button>
                        </div>
                        <div className="relative">
                            <pre className="overflow-x-auto rounded-2xl bg-gray-900 p-4 text-[13px] leading-relaxed text-gray-100">
                                <code className="block whitespace-pre-wrap break-words font-mono">
                                    {badgeSnippet}
                                </code>
                            </pre>
                        </div>
                        {copyState === "error" && (
                            <p className="text-xs text-red-500">
                                Copy didn&apos;t work. You can still select and
                                copy manually.
                            </p>
                        )}
                        {successRepo && (
                            <ShareSocial
                                shareUrl={`https://blazingly.fast/api/badge.svg?repo=${encodeURIComponent(
                                    successRepo
                                )}`}
                                message={`It's official! 🔥 Just certified ${successRepo} as Blazingly Fast™ on https://blazingly.fast\n\n`}
                                className="pt-2"
                            />
                        )}
                    </div>
                )}
            </div>
        </Modal>
    );
}
