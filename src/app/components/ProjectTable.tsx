import type { JSX } from "react";

type ProjectEntry = {
    name: string;
    maintainer: string;
    repo: string;
    certifiedOn: string;
    speedClaim: string;
    status?: string;
    isPlaceholder?: boolean;
};

const projectEntries: ProjectEntry[] = [
    {
        name: "pipevine",
        maintainer: "Jess K.",
        repo: "github.com/pipevine/app",
        certifiedOn: "Apr 11, 2024",
        speedClaim: "2x faster builds than last Tuesday",
        status: "Certified",
    },
    {
        name: "thread.fast",
        maintainer: "Lance & team",
        repo: "github.com/threadfast/core",
        certifiedOn: "Mar 29, 2024",
        speedClaim: "Latency so low it whispers",
        status: "Certified",
    },
    {
        name: "sidecar turbo",
        maintainer: "Amrita S.",
        repo: "github.com/amritas/sidecar-turbo",
        certifiedOn: "Feb 18, 2024",
        speedClaim: "Cold starts in a warm 28ms",
        status: "Certified",
    },
    {
        name: "your project here",
        maintainer: "You?",
        repo: "github.com/you/blazingly-fast",
        certifiedOn: "Pending",
        speedClaim: "Awaiting bold claims",
        status: "Submit",
    },
];

const ROW_TARGET = 10;

const paddedEntries: ProjectEntry[] = [...projectEntries];
while (paddedEntries.length < ROW_TARGET) {
    paddedEntries.push({
        name: "",
        maintainer: "",
        repo: "",
        certifiedOn: "",
        speedClaim: "",
        isPlaceholder: true,
    });
}

export function ProjectTable(): JSX.Element {
    return (
        <div className="relative overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
            <div />
            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm text-gray-700">
                    <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
                        <tr>
                            <th scope="col" className="px-6 py-5">
                                Project
                            </th>
                            <th scope="col" className="px-6 py-5">
                                Maintainer
                            </th>
                            <th scope="col" className="px-6 py-5">
                                Repository
                            </th>
                            <th
                                scope="col"
                                className="min-w-[140px] px-6 py-5 whitespace-nowrap"
                            >
                                Certified On
                            </th>
                            <th scope="col" className="px-6 py-5">
                                Speed Claim
                            </th>
                            <th scope="col" className="px-6 py-5 text-right">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {paddedEntries.map((project, index) => {
                            const isPlaceholder = Boolean(
                                project.isPlaceholder
                            );

                            return (
                                <tr
                                    key={`${
                                        project.repo ||
                                        project.name ||
                                        "placeholder"
                                    }-${index}`}
                                    className="transition hover:bg-gray-50/80"
                                >
                                    <th
                                        scope="row"
                                        className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-gray-900"
                                    >
                                        {isPlaceholder ? (
                                            <span className="text-gray-300">
                                                —
                                            </span>
                                        ) : (
                                            project.name
                                        )}
                                    </th>
                                    <td className="px-6 py-4 text-gray-600">
                                        {isPlaceholder ? (
                                            <span className="text-gray-300">
                                                —
                                            </span>
                                        ) : (
                                            project.maintainer
                                        )}
                                    </td>
                                    <td className="px-6 py-4 font-mono text-xs text-gray-500">
                                        {isPlaceholder ? (
                                            <span className="text-gray-300">
                                                —
                                            </span>
                                        ) : (
                                            project.repo
                                        )}
                                    </td>
                                    <td className="min-w-[140px] whitespace-nowrap px-6 py-4 text-gray-600">
                                        {isPlaceholder ? (
                                            <span className="text-gray-300">
                                                —
                                            </span>
                                        ) : (
                                            project.certifiedOn
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {isPlaceholder ? (
                                            <span className="text-gray-300">
                                                —
                                            </span>
                                        ) : (
                                            project.speedClaim
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {isPlaceholder ? (
                                            <span className="text-gray-300">
                                                —
                                            </span>
                                        ) : (
                                            <p className="m-0 flex items-center justify-end gap-2 font-mono text-xs font-semibold tracking-wide text-[#e45656]">
                                                ✓ blazingly fast
                                            </p>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="flex items-center justify-end border-t border-gray-100 bg-gray-50 px-6 py-4 text-sm text-gray-600">
                <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 shadow-sm">
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-gray-400 transition"
                        disabled
                    >
                        <span aria-hidden className="text-base">←</span>
                        Prev
                    </button>
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-gray-400">
                        Page 1 of 1
                    </span>
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-gray-400 transition"
                        disabled
                    >
                        Next
                        <span aria-hidden className="text-base">→</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
