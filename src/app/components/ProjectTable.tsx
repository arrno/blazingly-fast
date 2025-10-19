import type { JSX } from "react";
import Link from "next/link";
import { Project, Status } from "../domain/projects";

const long_blurb =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. precis";

const projectEntries: Project[] = [
    {
        id: "0",
        certifiedDate: new Date(),
        exists: true,
        name: "pipevine",
        maintainer: "Jess K.",
        repository: "github.com/pipevine/app",
        certifiedOn: "Apr 11, 2024",
        blurb: "2x faster builds than last Tuesday",
        status: Status.Fast,
    },
    {
        id: "0",
        certifiedDate: new Date(),
        exists: true,
        name: "thread.fast",
        maintainer: "Lance & team",
        repository: "github.com/threadfast/core",
        certifiedOn: "Mar 29, 2024",
        blurb: long_blurb,
        status: Status.Fast,
    },
    {
        id: "0",
        certifiedDate: new Date(),
        exists: true,
        name: "sidecar turbo",
        maintainer: "Amrita S.",
        repository: "github.com/amritas/sidecar-turbo",
        certifiedOn: "Feb 18, 2024",
        blurb: "Cold starts in a warm 28ms",
        status: Status.Average,
    },
    {
        id: "0",
        certifiedDate: new Date(),
        exists: true,
        name: "quantzip",
        maintainer: "Mina W.",
        repository: "github.com/minaw/quantzip",
        certifiedOn: "Mar 07, 2024",
        blurb: "Compresses before data arrives",
        status: Status.Fast,
    },
    {
        id: "0",
        certifiedDate: new Date(),
        exists: true,
        name: "cachemancer",
        maintainer: "Eli + crew",
        repository: "github.com/eli/cachemancer",
        certifiedOn: "Feb 02, 2024",
        blurb: "Caches the caches of your caches",
        status: Status.Fast,
    },
    {
        id: "0",
        certifiedDate: new Date(),
        exists: true,
        name: "warp chronicle",
        maintainer: "Val & Arjun",
        repository: "github.com/valandco/warp-chronicle",
        certifiedOn: "Dec 08, 2023",
        blurb: "Scheduling that outruns spacetime",
        status: Status.Average,
    },
    {
        id: "0",
        certifiedDate: new Date(),
        exists: true,
        name: "async orchard",
        maintainer: "Devlin H.",
        repository: "github.com/devlinh/async-orchard",
        certifiedOn: "Oct 05, 2023",
        blurb: "Harvests futures in parallel",
        status: Status.Fast,
    },
    {
        id: "0",
        certifiedDate: new Date(),
        exists: true,
        name: "glidekit",
        maintainer: "Risa M.",
        repository: "github.com/risam/glidekit",
        certifiedOn: "Sep 14, 2023",
        blurb: "UI that boots before mount",
        status: Status.Fast,
    },
    {
        id: "0",
        certifiedDate: new Date(),
        exists: true,
        name: "latency lullaby",
        maintainer: "Small Perf Lab",
        repository: "github.com/spl/latency-lullaby",
        certifiedOn: "Aug 22, 2023",
        blurb: "Puts the p99 right to sleep",
        status: Status.Average,
    },
    {
        id: "0",
        certifiedDate: new Date(),
        exists: true,
        name: "your project here",
        maintainer: "You?",
        repository: "github.com/you/blazingly-fast",
        certifiedOn: "Pending",
        blurb: "Awaiting bold claims",
        status: Status.Fast,
    },
];

const STATUS_META: Record<Status, { label: string; className: string }> = {
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

const paddedEntries: Project[] = [...projectEntries];
while (paddedEntries.length < ROW_TARGET) {
    paddedEntries.push({
        id: "0",
        certifiedDate: new Date(),
        exists: false,
        name: "",
        maintainer: "",
        repository: "",
        certifiedOn: "",
        status: Status.Average,
        blurb: "",
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
                            const isPlaceholder = !project.exists;
                            const statusMeta = project.status
                                ? STATUS_META[project.status]
                                : undefined;

                            return (
                                <tr
                                    key={`${
                                        project.repository ||
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
                                                href={`https://${project.repository}`}
                                            >
                                                {project.repository}
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
                                            project.blurb
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
