"use client";

import type { HTMLAttributes } from "react";

export interface CertificationFormCardProps
    extends HTMLAttributes<HTMLDivElement> {
    anchorId?: string;
}

export function CertificationFormCard({
    className = "",
    anchorId,
    ...rest
}: CertificationFormCardProps) {
    const baseClasses =
        "relative min-w-0 rounded-lg border border-gray-200 bg-white/85 p-8 shadow-2xl shadow-gray-900/10 backdrop-blur";

    return (
        <div
            id={anchorId}
            className={className ? `${baseClasses} ${className}` : baseClasses}
            {...rest}
        >
            <div className="absolute -top-10 -left-6 hidden h-32 w-32 rounded-full bg-gradient-to-tr from-gray-200 via-transparent to-transparent blur-3xl lg:block" />
            <div className="absolute -bottom-10 -right-6 hidden h-28 w-28 rounded-full bg-gradient-to-tr from-blue-200 via-transparent to-transparent blur-3xl lg:block" />
            <div className="relative space-y-6">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-gray-500">
                    <span>Certification form</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-600">
                        Live preview
                    </span>
                </div>

                <div className="space-y-4">
                    <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                        Repo URL
                        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-gray-600">
                            <span className="text-xs text-gray-400">
                                https://github.com/
                            </span>
                            <span className="text-gray-900">
                                you/yourproject
                            </span>
                        </div>
                    </label>

                    <fieldset className="rounded-xl border border-gray-200 bg-white p-4">
                        <legend className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                            Is your project blazingly fast?
                        </legend>
                        <div className="mt-3 space-y-3 text-sm text-gray-700">
                            <label className="flex items-center gap-3">
                                <span className="grid h-5 w-5 place-items-center rounded-md border border-gray-300 bg-white text-xs text-gray-300"></span>
                                No
                            </label>
                            <label className="flex items-center gap-3">
                                <span className="grid h-5 w-5 place-items-center rounded-md border border-gray-900 bg-gray-900 text-xs font-semibold text-white">
                                    ✓
                                </span>
                                Yes
                            </label>
                        </div>
                    </fieldset>

                    <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                            Copy & paste badge
                        </p>
                        <div className="mt-3 overflow-hidden rounded-xl bg-gray-900">
                            <pre className="w-full overflow-x-auto text-[13px] leading-relaxed text-gray-100">
                                <code className="block w-max whitespace-pre px-4 py-3 font-mono">
                                    {`![blazingly fast](https://blazingly.fast/badge.svg?repo=you/yourproject)`}
                                </code>
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
