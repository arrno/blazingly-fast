import Form from "../components/forms";
import Navbar from "../components/Navbar";
import { IconSection } from "../components/IconSection";

export default function Home() {
    // Define icon sets
    const topRowIcons = [
        { src: "/assets/logos/AWS.png", alt: "AWS" },
        { src: "/assets/logos/Azure.png", alt: "Azure" },
        { src: "/assets/logos/GCP.png", alt: "Google Cloud Platform" },
        { src: "/assets/logos/openAI.png", alt: "OpenAI" },
        { src: "/assets/logos/claude.png", alt: "Claude" },
        { src: "/assets/logos/gemini.png", alt: "Gemini" },
        { src: "/assets/logos/claude-ai.png", alt: "Claude AI" },
        { src: "/assets/logos/AWS.png", alt: "AWS" },
        { src: "/assets/logos/Azure.png", alt: "Azure" },
        { src: "/assets/logos/GCP.png", alt: "Google Cloud Platform" },
        { src: "/assets/logos/openAI.png", alt: "OpenAI" },
        { src: "/assets/logos/claude.png", alt: "Claude" },
        { src: "/assets/logos/gemini.png", alt: "Gemini" },
    ];

    const bottomRowIcons = [
        { src: "/assets/logos/co-pilot.png", alt: "GitHub Copilot" },
        { src: "/assets/logos/redis.png", alt: "Redis" },
        { src: "/assets/logos/postgres-icon.png", alt: "PostgreSQL" },
        { src: "/assets/logos/k8.png", alt: "Kubernetes" },
        { src: "/assets/logos/go3.png", alt: "Go" },
        { src: "/assets/logos/claude-ai.png", alt: "Claude AI" },
        { src: "/assets/logos/co-pilot.png", alt: "GitHub Copilot" },
        { src: "/assets/logos/redis.png", alt: "Redis" },
        { src: "/assets/logos/postgres-icon.png", alt: "PostgreSQL" },
        { src: "/assets/logos/k8.png", alt: "Kubernetes" },
        { src: "/assets/logos/go3.png", alt: "Go" },
        { src: "/assets/logos/claude-ai.png", alt: "Claude AI" },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 py-20 sm:py-30">
                {/* Hero Section */}
                <div className="text-center">
                    {/* Main Title */}
                    <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-none">
                        Big Ideas in Simple Systems
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
                        The only advantage that matters: systems that go fast
                        and don’t break. We build reliable infrastructure and AI
                        workflows that squash chaos and help your team get more
                        done.
                    </p>

                    {/* Email Signup Form */}
                    <Form actionString="Get Started" page="consule" />

                    {/* Emoji Badges */}
                    <div className="flex flex-wrap justify-center gap-3">
                        <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-sm">
                            <span className="text-lg">🤖</span>
                            <span className="text-xs font-medium text-gray-700">
                                AI Workflows
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
                                Results Focused
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

            {/* Animated Brand Chips */}
            <div className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6">
                    {/* Top Row - Moving Left */}
                    <div className="mb-8">
                        <IconSection icons={topRowIcons} direction="left" />
                    </div>

                    {/* Bottom Row - Moving Right */}
                    <IconSection icons={bottomRowIcons} direction="right" />
                </div>
            </div>

            {/* Problem Section */}
            <section className="py-36 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6">
                    {/* Section Title */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Growing Pain
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            You’ve built something that works.. until it
                            doesn’t. As teams grow and tools multiply, workflows
                            buckle, context gets lost, and small cracks turn
                            into major blockers. We can help.
                        </p>
                    </div>

                    <div className="space-y-12 max-w-6xl mx-auto">
                        {/* First Row - 3 items */}
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-[rgb(246,243,255)] rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg
                                        className="w-8 h-8 text-[rgb(81,59,194)]"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    Workflows Off Track
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    You’ve got automations in place, but they’re
                                    brittle. Edge cases fall through and
                                    visibility disappears when you need it most.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-[rgb(241,255,241)] rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg
                                        className="w-8 h-8 text-[rgb(46,133,46)]"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    Scattered Tools
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Critical context lives across docs, APIs,
                                    and spreadsheets. Stitching it together
                                    turns into duct-tape engineering.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-[rgb(255,243,237)] rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg
                                        className="w-8 h-8 text-[rgb(201,78,25)]"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    Overbuilding
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    You don’t need a giant event bus or full RAG
                                    pipeline.. you just need a clean, reliable
                                    way to move data and decisions.
                                </p>
                            </div>
                        </div>
                        {/* Second Row - 2 items centered */}
                        <div className="grid md:grid-cols-2 gap-8 w-2/3 mx-auto">
                            {/* <div></div> */}
                            <div className="flex items-center justify-center">
                                <div className="text-center w-full">
                                    <div className="w-16 h-16 bg-[rgb(239,246,255)] rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg
                                            className="w-8 h-8 text-[rgb(30,64,175)]"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                        Compliance Pressure
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Security, privacy, and auditability
                                        aren’t optional.. but most workflows
                                        aren’t built with governance in mind.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-center">
                                <div className="text-center w-full">
                                    <div className="w-16 h-16 bg-[rgb(255,250,237)] rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg
                                            className="w-8 h-8 text-[rgb(156,133,20)]"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 10V3L4 14h7v7l9-11h-7z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                        Scaling is Hard
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        What works for a solo developer or small
                                        team falls apart when things grow into
                                        many moving parts.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Premium Cards Section */}
            <section className="py-36 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6">
                    {/* Section Title */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            What We Do
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            We design systems that move fast and think clearly —
                            from async infrastructure to AI-powered workflows.
                            Whether you need automation, orchestration, or
                            structured context, We build the architecture that
                            keeps things running.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Purple Card */}
                        <div className="bg-white rounded-lg p-10 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-bold text-gray-900">
                                    System Design
                                </h3>
                                <span className="px-4 py-2 bg-[rgb(246,243,255)] text-[rgb(81,59,194)] text-sm font-semibold rounded-md">
                                    Strategy
                                </span>
                            </div>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                Break down complex tasks into modular, reliable
                                systems — whether backend pipelines or
                                intelligent prompt flows.
                            </p>
                        </div>

                        {/* Green Card */}
                        <div className="bg-white rounded-lg p-10 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-bold text-gray-900">
                                    Context & Data Layering
                                </h3>
                                <span className="px-4 py-2 bg-[rgb(241,255,241)] text-[rgb(46,133,46)] text-sm font-semibold rounded-md">
                                    Intelligence
                                </span>
                            </div>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                Organize your knowledge into structured layers
                                that models and systems can use, reuse, and
                                reason with.
                            </p>
                        </div>

                        {/* Orange Card */}
                        <div className="bg-white rounded-lg p-10 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-bold text-gray-900">
                                    Workflow Automation
                                </h3>
                                <span className="px-4 py-2 bg-[rgb(255,243,237)] text-[rgb(201,78,25)] text-sm font-semibold rounded-md">
                                    Execution
                                </span>
                            </div>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                Build automated flows that connect tools,
                                trigger actions, and reduce manual load across
                                your stack.
                            </p>
                        </div>

                        {/* Blue Card */}
                        <div className="bg-white rounded-lg p-10 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-bold text-gray-900">
                                    Strategic Advisory
                                </h3>
                                <span className="px-4 py-2 bg-[rgb(239,246,255)] text-[rgb(30,64,175)] text-sm font-semibold rounded-md">
                                    Direction
                                </span>
                            </div>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                Not sure what to build yet? I’ll help you scope
                                high-leverage use cases and avoid overbuilding.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who am I Section */}
            <section className="py-36 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        {/* Talking Head Icon */}
                        <div className="flex-shrink-0">
                            <div className="w-24 h-24 bg-[rgb(239,246,255)] rounded-full flex items-center justify-center">
                                <svg
                                    className="w-12 h-12 text-[rgb(30,64,175)]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Quote Content */}
                        <div className="flex-1">
                            <blockquote className="relative">
                                <div className="absolute -top-4 -left-4 text-6xl text-gray-200 font-serif">
                                    {`"`}
                                </div>
                                <p className="text-2xl md:text-3xl text-gray-900 leading-relaxed mb-6 relative z-10">
                                    I’ve been fortunate to work at a very high
                                    level in both cloud infrastructure and
                                    software. What I love most is connecting the
                                    pieces along the stack to transform abstract
                                    ideas into concrete realities.
                                </p>
                                <p className="text-xl text-gray-600 leading-relaxed">
                                    We help teams design infrastructure that
                                    moves with them: async where it counts,
                                    automated where it helps, and intelligent
                                    where it matters. Not fragile hacks — just
                                    thoughtful systems that hold up under
                                    pressure.
                                </p>
                                <footer className="mt-8">
                                    <cite className="text-lg font-semibold text-gray-900 not-italic">
                                        — Aaron Hough
                                    </cite>
                                    <p className="text-gray-600 mt-1">
                                        Software Builder & Tech Founder
                                    </p>
                                </footer>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </section>

            {/* Book Free Consultation Section */}
            <section id="consultation" className="py-36 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    {/* Main Title */}
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Book free consultation
                    </h2>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
                        Let’s discuss your vision and explore how we can help
                        your team get more done.
                    </p>

                    {/* Email Signup Form */}
                    <Form actionString="Book Intro" page="consult" />

                    {/* Muted Taglines */}
                    <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            <span>✓</span>
                            <span>No commitment required</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>✓</span>
                            <span>15-minute session</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>✓</span>
                            <span>Custom strategy roadmap</span>
                        </div>
                    </div>
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
                                We help teams design intelligent systems that
                                actually work at scale.
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
