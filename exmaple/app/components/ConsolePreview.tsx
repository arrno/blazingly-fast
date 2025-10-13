import RobotIcon from "./RobotIcon";

export default function ConsolePreview() {
    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg py-6 px-4 font-mono text-sm shadow-2xl border border-gray-700/50 backdrop-blur-sm">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>

            {/* Chat Conversation */}
            <div className="space-y-5 relative">
                <div className="flex items-start gap-3 group">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center border border-green-500/30">
                        <span className="text-green-400 text-xs font-bold">
                            U
                        </span>
                    </div>
                    <div className="flex-1">
                        <div className="text-green-400 text-xs font-semibold mb-1">
                            User
                        </div>
                        <div className="text-gray-200 leading-relaxed">
                            {`"The test database is at localhost:5432, I need a realistic scale environment."`}
                        </div>
                    </div>
                </div>

                <div className="flex items-start gap-3 group">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                        <RobotIcon size="w-7 h-7" className="text-blue-400" />
                    </div>
                    <div className="flex-1">
                        <div className="text-blue-400 text-xs font-semibold mb-1">
                            Assistant
                        </div>
                        <div className="text-gray-200 leading-relaxed">
                            {`"Checking the schema.. How many projects does a typical user have?"`}
                        </div>
                    </div>
                </div>

                <div className="flex items-start gap-3 group">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center border border-green-500/30">
                        <span className="text-green-400 text-xs font-bold">
                            U
                        </span>
                    </div>
                    <div className="flex-1">
                        <div className="text-green-400 text-xs font-semibold mb-1">
                            User
                        </div>
                        <div className="text-gray-200 leading-relaxed">
                            {`"Usually 3–5, but power users might have 50+."`}
                        </div>
                    </div>
                </div>

                <div className="flex items-start gap-3 group">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                        <RobotIcon size="w-7 h-7" className="text-blue-400" />
                    </div>
                    <div className="flex-1">
                        <div className="text-blue-400 text-xs font-semibold mb-1">
                            Assistant
                        </div>
                        <div className="text-gray-200 leading-relaxed">
                            {`"Got it. Should I simulate a small power-law distribution — a few users with lots of notes, most with just a few?"`}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mock Input Field */}
            <div className="mt-3 pt-3 border-t border-gray-700/50">
                <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center border border-green-500/30">
                        <span className="text-green-400 text-xs font-bold">
                            U
                        </span>
                    </div>
                    <div className="flex-1 bg-gray-800/50 rounded-lg border border-green-400/30 px-3 py-2">
                        <span className="text-gray-300 text-sm">
                            Yes, seed it!
                        </span>
                    </div>
                </div>
            </div>

            {/* Subtle glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-transparent to-purple-500/20 rounded-xl blur-xl opacity-20"></div>
        </div>
    );
}
