export default function DataTablePreview() {
    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden">
            {/* Table Header */}
            <div
                className="bg-gray-100 border-b border-gray-200"
                style={{ padding: "12px 24px" }}
            >
                <div className="flex gap-4 text-sm font-semibold text-gray-800">
                    <div className="w-16 flex-shrink-0">User ID</div>
                    <div className="flex-1 min-w-0">Name</div>
                    <div className="flex-1 min-w-0">Email</div>
                    <div className="w-20 flex-shrink-0">Created</div>
                </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-100">
                <div
                    className="hover:bg-gray-50 transition-colors"
                    style={{ padding: "12px 24px" }}
                >
                    <div className="flex gap-4 text-sm text-gray-900">
                        <div className="w-16 flex-shrink-0 font-mono text-gray-600">
                            #001
                        </div>
                        <div className="flex-1 min-w-0 truncate">
                            Sarah Chen
                        </div>
                        <div className="flex-1 min-w-0 truncate text-blue-600">
                            sarah.chen@acme.com
                        </div>
                        <div className="w-20 flex-shrink-0 text-gray-500">
                            2024-01-15
                        </div>
                    </div>
                </div>

                <div
                    className="hover:bg-gray-50 transition-colors"
                    style={{ padding: "12px 24px" }}
                >
                    <div className="flex gap-4 text-sm text-gray-900">
                        <div className="w-16 flex-shrink-0 font-mono text-gray-600">
                            #002
                        </div>
                        <div className="flex-1 min-w-0 truncate">
                            Marcus Rodriguez
                        </div>
                        <div className="flex-1 min-w-0 truncate text-blue-600">
                            m.rodriguez@techcorp.com
                        </div>
                        <div className="w-20 flex-shrink-0 text-gray-500">
                            2024-01-16
                        </div>
                    </div>
                </div>

                <div
                    className="hover:bg-gray-50 transition-colors"
                    style={{ padding: "12px 24px" }}
                >
                    <div className="flex gap-4 text-sm text-gray-900">
                        <div className="w-16 flex-shrink-0 font-mono text-gray-600">
                            #003
                        </div>
                        <div className="flex-1 min-w-0 truncate">
                            Emma Thompson
                        </div>
                        <div className="flex-1 min-w-0 truncate text-blue-600">
                            emma.t@startup.io
                        </div>
                        <div className="w-20 flex-shrink-0 text-gray-500">
                            2024-01-17
                        </div>
                    </div>
                </div>

                <div
                    className="hover:bg-gray-50 transition-colors"
                    style={{ padding: "12px 24px" }}
                >
                    <div className="flex gap-4 text-sm text-gray-900">
                        <div className="w-16 flex-shrink-0 font-mono text-gray-600">
                            #004
                        </div>
                        <div className="flex-1 min-w-0 truncate">David Kim</div>
                        <div className="flex-1 min-w-0 truncate text-blue-600">
                            david.kim@enterprise.com
                        </div>
                        <div className="w-20 flex-shrink-0 text-gray-500">
                            2024-01-18
                        </div>
                    </div>
                </div>

                <div
                    className="hover:bg-gray-50 transition-colors"
                    style={{ padding: "12px 24px" }}
                >
                    <div className="flex gap-4 text-sm text-gray-900">
                        <div className="w-16 flex-shrink-0 font-mono text-gray-600">
                            #005
                        </div>
                        <div className="flex-1 min-w-0 truncate">Lisa Park</div>
                        <div className="flex-1 min-w-0 truncate text-blue-600">
                            lisa.park@innovate.co
                        </div>
                        <div className="w-20 flex-shrink-0 text-gray-500">
                            2024-01-19
                        </div>
                    </div>
                </div>
            </div>

            {/* Table Footer */}
            <div
                className="bg-gray-100 border-t border-gray-200"
                style={{ padding: "12px 24px" }}
            >
                <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span>Showing 5 of 1,000,000 rows</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span>Page 1 of 200,000</span>
                        <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
