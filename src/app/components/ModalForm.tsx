"use client";

import { useEffect, useMemo, useState } from "react";
import { Modal } from "./Modal";
import { useModal } from "./ModalProvider";

function normalizeRepoInput(input: string) {
    const trimmed = input.trim();
    if (!trimmed) {
        return "";
    }
    const withoutProtocol = trimmed.replace(/^https?:\/\/github\.com\//i, "");
    const withoutTrailing = withoutProtocol.replace(/\.git$/i, "");
    return withoutTrailing;
}

export function ModalForm() {
    const { modalType, closeModal } = useModal();
    const open = modalType === "certification";

    const [repoInput, setRepoInput] = useState("https://github.com/");
    const [isFast, setIsFast] = useState<"yes" | "no" | null>(null);

    useEffect(() => {
        if (!open) {
            setRepoInput("https://github.com/");
            setIsFast(null);
        }
    }, [open]);

    const repoSlug = useMemo(() => normalizeRepoInput(repoInput), [repoInput]);
    const isComplete = repoSlug.length > 0 && isFast === "yes";
    const badgeSnippet = useMemo(() => {
        if (!isComplete) {
            return "";
        }
        const encodedRepo = encodeURIComponent(repoSlug);
        return `![blazingly fast](https://blazingly.fast/badge.svg?repo=${encodedRepo})`;
    }, [isComplete, repoSlug]);

    return (
        <Modal open={open} onClose={closeModal} ariaLabel="Certification form">
            <div className="space-y-8">
                <header className="space-y-2">
                    <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        Submit your project
                    </h2>
                    <p className="text-sm text-gray-600">
                        Claim the badge in three moves: paste your repo, choose
                        honesty, and we will hand you the Certified Blazingly
                        Fast™ markdown.
                    </p>
                </header>

                <form
                    className="space-y-6"
                    onSubmit={(event) => event.preventDefault()}
                >
                    <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                        Repo URL
                        <input
                            value={repoInput}
                            onChange={(event) =>
                                setRepoInput(event.target.value)
                            }
                            placeholder="https://github.com/you/yourproject"
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 shadow-sm transition focus:border-[#ff6b6b] focus:outline-none focus:ring-2 focus:ring-[#ff6b6b]/20 focus:shadow-[0_0_0_4px_rgba(255,107,107,0.12)]"
                        />
                    </label>

                    <fieldset className="space-y-3 rounded-2xl border border-gray-200 bg-white p-4">
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

                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                        <span>All certifications rely on trust.</span>
                        <span className="hidden sm:inline">&bull;</span>
                        <span>
                            Benchmarks are optional; swagger is mandatory.
                        </span>
                    </div>
                </form>

                {isComplete && (
                    <div className="space-y-4 rounded-3xl border border-gray-200 bg-gray-50 p-5">
                        <div className="space-y-1">
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Congratulations 🎉
                            </p>
                            <p className="text-sm text-gray-600">
                                Drop this flex into your README, docs, or merch.
                            </p>
                        </div>
                        <pre className="overflow-x-auto rounded-2xl bg-gray-900 p-4 text-[13px] leading-relaxed text-gray-100">
                            <code className="block whitespace-pre-wrap break-words font-mono">
                                {badgeSnippet}
                            </code>
                        </pre>
                    </div>
                )}
            </div>
        </Modal>
    );
}
