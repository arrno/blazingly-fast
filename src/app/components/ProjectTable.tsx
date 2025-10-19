import type { JSX } from "react";
import Link from "next/link";

type ProjectEntry = {
    name: string;
    maintainer: string;
    repo: string;
    certifiedOn: string;
    speedClaim: string;
    status?: "fast" | "pending" | "average";
    isPlaceholder?: boolean;
};

const projectEntries: ProjectEntry[] = [
    {
        name: "pipevine",
        maintainer: "Jess K.",
        repo: "github.com/pipevine/app",
        certifiedOn: "Apr 11, 2024",
        speedClaim: "2x faster builds than last Tuesday",
        status: "fast",
    },
    {
        name: "thread.fast",
        maintainer: "Lance & team",
        repo: "github.com/threadfast/core",
        certifiedOn: "Mar 29, 2024",
        speedClaim: "Latency so low it whispers",
        status: "fast",
    },
    {
        name: "sidecar turbo",
        maintainer: "Amrita S.",
        repo: "github.com/amritas/sidecar-turbo",
        certifiedOn: "Feb 18, 2024",
        speedClaim: "Cold starts in a warm 28ms",
        status: "average",
    },
    {
        name: "quantzip",
        maintainer: "Mina W.",
        repo: "github.com/minaw/quantzip",
        certifiedOn: "Mar 07, 2024",
        speedClaim: "Compresses before data arrives",
        status: "fast",
    },
    {
        name: "cachemancer",
        maintainer: "Eli + crew",
        repo: "github.com/eli/cachemancer",
        certifiedOn: "Feb 02, 2024",
        speedClaim: "Caches the caches of your caches",
        status: "fast",
    },
    {
        name: "warp chronicle",
        maintainer: "Val & Arjun",
        repo: "github.com/valandco/warp-chronicle",
        certifiedOn: "Dec 08, 2023",
        speedClaim: "Scheduling that outruns spacetime",
        status: "average",
    },
    {
        name: "async orchard",
        maintainer: "Devlin H.",
        repo: "github.com/devlinh/async-orchard",
        certifiedOn: "Oct 05, 2023",
        speedClaim: "Harvests futures in parallel",
        status: "fast",
    },
    {
        name: "glidekit",
        maintainer: "Risa M.",
        repo: "github.com/risam/glidekit",
        certifiedOn: "Sep 14, 2023",
        speedClaim: "UI that boots before mount",
        status: "fast",
    },
    {
        name: "latency lullaby",
        maintainer: "Small Perf Lab",
        repo: "github.com/spl/latency-lullaby",
        certifiedOn: "Aug 22, 2023",
        speedClaim: "Puts the p99 right to sleep",
        status: "average",
    },
    {
        name: "your project here",
        maintainer: "You?",
        repo: "github.com/you/blazingly-fast",
        certifiedOn: "Pending",
        speedClaim: "Awaiting bold claims",
        status: "fast",
    },
];

const STATUS_META: Record<
    NonNullable<ProjectEntry["status"]>,
    { label: string; className: string }
> = {
    fast: {
        label: "✓ blazingly fast",
        className: "text-[#FF5C5C]",
    },
    pending: {
        label: "blazingly pending",
        className: "text-[#8F7DEB]",
    },
    average: {
        label: "blazingly average",
        className: "text-[#8F7DEB]",
    },
    // average: {
    //     label: "blazingly average",
    //     className: "text-[#28A745]",
    // },
};

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
                            const statusMeta = project.status
                                ? STATUS_META[project.status]
                                : undefined;

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
                                            <Link
                                                href={`https://${project.repo}`}
                                            >
                                                {project.repo}
                                            </Link>
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
                                        {isPlaceholder || !statusMeta ? (
                                            <span className="text-gray-300">
                                                —
                                            </span>
                                        ) : (
                                            <p
                                                className={`m-0 flex items-center justify-end gap-2 font-mono text-xs font-semibold tracking-wide ${statusMeta.className}`}
                                            >
                                                {statusMeta.label}
                                            </p>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="flex items-center justify-end gap-6 border-t border-gray-100 bg-gray-50 px-6 py-3 text-xs text-gray-500">
                <span className="font-mono uppercase tracking-[0.25em] text-gray-400">
                    Page 1 of 1
                </span>
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        className="inline-flex items-center gap-1 font-semibold text-gray-400 transition hover:text-gray-600 disabled:cursor-not-allowed disabled:text-gray-300"
                        disabled
                    >
                        <span aria-hidden className="text-sm">
                            ←
                        </span>
                        Prev
                    </button>
                    <button
                        type="button"
                        className="inline-flex items-center gap-1 font-semibold text-gray-400 transition hover:text-gray-600 disabled:cursor-not-allowed disabled:text-gray-300"
                        disabled
                    >
                        Next
                        <span aria-hidden className="text-sm">
                            →
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}
