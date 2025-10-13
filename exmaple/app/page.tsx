import Form from "./components/forms";
import ParallelFlowPreview from "./components/ParallelFlowPreview";
import Navbar from "./components/Navbar";
import { IconSection } from "./components/IconSection";
import {
    OpenSourceRepoGrid,
    AccentName,
} from "./components/OpenSourceRepoGrid";

export default function ProductPage() {
    // Define icon sets
    const topRowIcons = [
        { src: "/assets/logos/AWS.png", alt: "AWS" },
        { src: "/assets/logos/Azure.png", alt: "Azure" },
        { src: "/assets/logos/GCP.png", alt: "Google Cloud Platform" },
        { src: "/assets/logos/openAI.png", alt: "OpenAI" },
        { src: "/assets/logos/claude.png", alt: "Claude" },
        { src: "/assets/logos/python.png", alt: "Python" },
        { src: "/assets/logos/claude-ai.png", alt: "Claude AI" },
        { src: "/assets/logos/AWS.png", alt: "AWS" },
        { src: "/assets/logos/typescript.png", alt: "Typescript" },
        { src: "/assets/logos/GCP.png", alt: "Google Cloud Platform" },
        { src: "/assets/logos/rust.png", alt: "Rust" },
        { src: "/assets/logos/claude.png", alt: "Claude" },
        { src: "/assets/logos/python.png", alt: "Python" },
    ];

    const bottomRowIcons = [
        { src: "/assets/logos/co-pilot.png", alt: "GitHub Copilot" },
        { src: "/assets/logos/redis.png", alt: "Redis" },
        { src: "/assets/logos/postgres-icon.png", alt: "PostgreSQL" },
        { src: "/assets/logos/typescript.png", alt: "Typescript" },
        { src: "/assets/logos/go3.png", alt: "Go" },
        { src: "/assets/logos/claude-ai.png", alt: "Claude AI" },
        { src: "/assets/logos/co-pilot.png", alt: "GitHub Copilot" },
        { src: "/assets/logos/redis.png", alt: "Redis" },
        { src: "/assets/logos/postgres-icon.png", alt: "PostgreSQL" },
        { src: "/assets/logos/k8.png", alt: "Kubernetes" },
        { src: "/assets/logos/go3.png", alt: "Go" },
        { src: "/assets/logos/claude-ai.png", alt: "Claude AI" },
    ];

    const openSourceRepos: {
        name: string;
        url: string;
        icon: string;
        description: string;
        meta: string;
        accent: AccentName;
    }[] = [
        {
            name: "Pipevine",
            url: "https://github.com/arrno/pipevine",
            icon: "🌱",
            description:
                "Pythonic worker pools and pipelines for speedy and resilient workloads",
            meta: "Python",
            accent: "python",
        },
        {
            name: "Gliter",
            url: "https://github.com/arrno/gliter",
            icon: "✨",
            description:
                "Golang iter tools. Composable async & concurrency patterns for Go without the boilerplate.",
            meta: "Golang",
            accent: "go",
        },
        {
            name: "Rowboat",
            url: "https://github.com/arrno/dataframe",
            icon: "🛶",
            description:
                "Lightweight dataframe written in rust for blazingly fast data science.",
            meta: "Rust",
            accent: "rust",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <Navbar />
            <div className="max-w-4xl mx-auto px-6 py-20 sm:py-30 sm:pb-10">
                {/* Hero Section */}
                <div className="text-center">
                    {/* Main Title */}
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6 leading-none">
                        Async Software, Simplified
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
                        Concurrent software changes what’s possible — but it’s
                        notoriously hard to get right. <strong>Threadr</strong>{" "}
                        builds the missing tools and frameworks that let you
                        parallelize your systems <em>without</em> the pitfalls.
                    </p>

                    {/* Email Signup Form */}
                    <Form actionString="Get Access" page="schemaLoader" />

                    {/* Emoji Badges */}
                    <div className="flex flex-wrap justify-center gap-3">
                        <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-sm">
                            <span className="text-lg">🤖</span>
                            <span className="text-xs font-medium text-gray-700">
                                AI Enabled
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-sm">
                            <span className="text-lg">⚡</span>
                            <span className="text-xs font-medium text-gray-700">
                                Fast Setup
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-sm">
                            <span className="text-lg">🎯</span>
                            <span className="text-xs font-medium text-gray-700">
                                Results Driven
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-sm">
                            <span className="text-lg">🚀</span>
                            <span className="text-xs font-medium text-gray-700">
                                Production Ready
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Demo Section */}
            <div className="max-w-5xl mx-auto px-6 py-0 pb-10 sm:py-30">
                <div className="grid md:grid-cols-[55%_45%] gap-15 md:gap-6 items-center">
                    {/* Left side - Title and bullet points */}
                    <div className="space-y-8 order-2 md:order-1">
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                                <div>
                                    <h3 className="text-lg font-extrabold text-gray-900 mb-2">
                                        Safer by Design
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Concurrency is a battlefield of
                                        deadlocks, race conditions, and memory
                                        leaks. Even when it “works,” can you
                                        trust it?
                                    </p>
                                    <p className="text-gray-600 leading-relaxed mt-2">
                                        Our frameworks make safety the default —
                                        isolating hazards, surfacing errors, and
                                        preventing silent failures before they
                                        happen.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                                <div>
                                    <h3 className="text-lg font-extrabold text-gray-900 mb-2">
                                        Untangle the Chaos
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        What starts as a simple{" "}
                                        <code className="bg-gray-100">
                                            async/await
                                        </code>{" "}
                                        often spirals into a web of queues,
                                        runners, and brittle callbacks. We turn
                                        the mess back into clean, composable
                                        code that’s easy to read, reason about,
                                        and extend.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                                <div>
                                    <h3 className="text-lg font-extrabold text-gray-900 mb-2">
                                        Compose. Reuse. Scale
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        By decoupling your business logic from
                                        concurrency boilerplate, you gain the
                                        freedom to compose powerful workflows —
                                        on demand, for every use case.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Console preview */}
                    <div className="flex justify-center order-1 md:order-2">
                        {/* <ConsolePreview /> */}
                        <div className="w-full max-w-2xl">
                            <ParallelFlowPreview />
                        </div>
                    </div>
                </div>
            </div>

            {/* Data Table Preview Section */}
            <section className="sm:py-20 pt-20 pb-10 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Built for Your Stack
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
                            Whether you’re building ETL pipelines, WebSocket
                            services, pub/sub systems, or real-time streaming
                            backends, Threadr gives you the foundations to run
                            them <em>faster, safer, and cleaner.</em>
                        </p>
                    </div>
                    {/* Animated Brand Chips */}
                    <div className="py-16 bg-gray-50">
                        <div className="max-w-6xl mx-auto">
                            {/* Top Row - Moving Left */}
                            <div className="mb-8">
                                <IconSection
                                    icons={topRowIcons}
                                    direction="left"
                                />
                            </div>

                            {/* Bottom Row - Moving Right */}
                            <IconSection
                                icons={bottomRowIcons}
                                direction="right"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Open Source Section */}
            <section className="sm:py-20 sm:pb-30 py-10 pb-30  bg-gray-50">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="mb-10 text-center">
                        <span className="font-mono text-xs uppercase tracking-[0.4em] text-slate-500">
                            Open Source
                        </span>
                        <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Explore the Threadr OSS toolkit
                        </h2>
                        <p className="mt-4 text-lg md:text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
                            We ship battle-tested libraries and tooling so you
                            can build resilient concurrent systems right away.
                        </p>
                    </div>
                    <OpenSourceRepoGrid
                        repos={openSourceRepos}
                        variant="light"
                    />
                </div>
            </section>

            {/* Signup Section */}
            <section
                className="py-0 pb-20 bg-gray-50 sm:py-20"
                id="consultation"
            >
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        Ready for speed?
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
                        Learn how Threadr can{" "}
                        <strong>supercharge your systems</strong> and simplify
                        concurrency for good.
                    </p>

                    <Form actionString="Get Access" page="schemaLoader" />
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 border-t border-gray-800 py-16">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Company Info */}
                        <div className="col-span-1 md:col-span-2">
                            <div className="mb-4">
                                <span className="text-2xl font-bold text-white">
                                    Threadr
                                </span>
                            </div>
                            <p className="text-gray-300 mb-6 max-w-md">
                                We make concurrent software simple, stable, and
                                fast.
                            </p>
                            <div className="flex space-x-4">
                                <a
                                    href="https://x.com/RunThreadr"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                    </svg>
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/aaron-hough/"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                                <a
                                    href="https://github.com/arrno"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Product Links */}
                        <div>
                            <h3 className="font-semibold text-white mb-4">
                                Product
                            </h3>
                            <ul className="space-y-3">
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white transition-colors"
                                    >
                                        Features
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white transition-colors"
                                    >
                                        Pricing
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white transition-colors"
                                    >
                                        API
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white transition-colors"
                                    >
                                        Documentation
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Company Links */}
                        <div>
                            <h3 className="font-semibold text-white mb-4">
                                Company
                            </h3>
                            <ul className="space-y-3">
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white transition-colors"
                                    >
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white transition-colors"
                                    >
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white transition-colors"
                                    >
                                        Careers
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white transition-colors"
                                    >
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm">
                            © 2025 Threadr. All rights reserved.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white text-sm transition-colors"
                            >
                                Privacy Policy
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white text-sm transition-colors"
                            >
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
