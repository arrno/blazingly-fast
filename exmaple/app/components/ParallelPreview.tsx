export default function ParallelPreview() {
    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg py-6 px-4 font-mono text-sm shadow-2xl border border-gray-700/50 backdrop-blur-sm">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>

            {/* Flow Diagram */}
            <div className="relative space-y-8">
                {/* Input Node */}
                <div className="flex justify-center">
                    <div className="bg-blue-500/20 rounded-lg border border-blue-500/30 px-4 py-3">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                                <svg
                                    className="w-5 h-5 text-blue-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1}
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                            </div>
                            <span className="text-blue-400 font-semibold">
                                INPUT
                            </span>
                        </div>
                    </div>
                </div>

                {/* Connection Line */}
                <div className="flex justify-center">
                    <div className="w-px h-8 bg-blue-400/30"></div>
                </div>

                {/* Parallel Processing Nodes */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-green-500/20 rounded-lg border border-green-500/30 px-3 py-2">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-green-500/20 rounded flex items-center justify-center border border-green-500/30">
                                <span className="text-green-400 text-xs font-bold">
                                    1
                                </span>
                            </div>
                            <span className="text-green-400 text-xs font-semibold">
                                VALIDATE
                            </span>
                        </div>
                    </div>

                    <div className="bg-purple-500/20 rounded-lg border border-purple-500/30 px-3 py-2">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-purple-500/20 rounded flex items-center justify-center border border-purple-500/30">
                                <span className="text-purple-400 text-xs font-bold">
                                    2
                                </span>
                            </div>
                            <span className="text-purple-400 text-xs font-semibold">
                                TRANSFORM
                            </span>
                        </div>
                    </div>

                    <div className="bg-orange-500/20 rounded-lg border border-orange-500/30 px-3 py-2">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-orange-500/20 rounded flex items-center justify-center border border-orange-500/30">
                                <span className="text-orange-400 text-xs font-bold">
                                    3
                                </span>
                            </div>
                            <span className="text-orange-400 text-xs font-semibold">
                                ENRICH
                            </span>
                        </div>
                    </div>
                </div>

                {/* Connection Lines */}
                <div className="flex justify-center">
                    <div className="w-px h-8 bg-blue-400/30"></div>
                </div>

                {/* Output Node */}
                <div className="flex justify-center">
                    <div className="bg-blue-500/20 rounded-lg border border-blue-500/30 px-4 py-3">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                                <svg
                                    className="w-5 h-5 text-blue-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1}
                                        d="M5 12h14M12 5l7 7-7 7"
                                    />
                                </svg>
                            </div>
                            <span className="text-blue-400 font-semibold">
                                OUTPUT
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Status Indicator */}
            <div className="mt-6 pt-4 border-t border-gray-700/50">
                <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-300 text-xs">
                        Processing in parallel
                    </span>
                </div>
            </div>

            {/* Subtle glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-transparent to-purple-500/20 rounded-xl blur-xl opacity-20"></div>
        </div>
    );
}
