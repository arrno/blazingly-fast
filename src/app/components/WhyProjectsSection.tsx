import { PageSection } from "./PageSection";

const projects = [
    { name: "tokio", stars: "⭐⭐⭐", certification: "✅ blazingly fast" },
    {
        name: "polars",
        stars: "⭐⭐⭐⭐",
        certification: "✅ blazingly fast",
    },
    {
        name: "your project here",
        stars: "💫",
        certification: "☐ pending honesty",
    },
];

export function WhyProjectsSection() {
    return (
        <div className="bg-zinc-50" id="why">
            <PageSection className="grid items-start gap-12 border-t border-gray-100 py-24 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
                <div className="min-w-0 space-y-6">
                    <div className="space-y-3">
                        <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
                            Why this? Why now?
                        </p>
                        <h2 className="text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl">
                            Why does this exist?
                        </h2>
                        <p className="max-w-xl text-base leading-relaxed text-gray-600">
                            Because performance claims deserve recognition.
                            Because badges are forever. Because we could.
                        </p>
                    </div>

                    <p className="max-w-xl text-base leading-relaxed text-gray-600">
                        Certified Blazingly Fast™ is the antidote to unverified
                        speed claims. We celebrate optimism, highlight ambition,
                        and hand out badges to anyone bold enough to say their
                        project absolutely rips.
                    </p>
                </div>

                <div id="projects" className="min-w-0 space-y-6">
                    <div className="space-y-3">
                        {/* <span className="inline-flex items-center rounded-full border-1px-solid-grey px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gray-600">
                            🏆 Current Certified Projects
                        </span> */}
                        <h3 className="text-2xl font-semibold tracking-tight text-gray-950">
                            🏆 Projects already blazing
                        </h3>
                        <p className="text-sm leading-relaxed text-gray-600">
                            Every submission joins the Hall of Speed. These are
                            just the first few.
                        </p>
                    </div>

                    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
                                <thead className="bg-zinc-50 text-xs uppercase tracking-wider text-gray-500">
                                    <tr>
                                        <th className="px-4 py-4 font-semibold">
                                            Project
                                        </th>
                                        <th className="px-4 py-4 font-semibold">
                                            Stars
                                        </th>
                                        <th className="px-4 py-4 font-semibold">
                                            Certification
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {projects.map((project) => (
                                        <tr key={project.name}>
                                            <td className="px-4 py-4 font-semibold text-gray-900">
                                                {project.name}
                                            </td>
                                            <td className="px-4 py-4 text-gray-600">
                                                {project.stars}
                                            </td>
                                            <td className="px-4 py-4 text-gray-700">
                                                {project.certification}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <a
                        href="/hall-of-speed"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-gray-400"
                    >
                        See the full leaderboard
                        <span aria-hidden>→</span>
                    </a>
                </div>
            </PageSection>
        </div>
    );
}
