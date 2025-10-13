"use client";

import Image from "next/image";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
            <div className="max-w-4xl mx-auto px-6">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <button
                            onClick={() =>
                                window.scrollTo({ top: 0, behavior: "smooth" })
                            }
                            className="text-2xl font-extrabold hover:text-gray-600 transition-colors cursor-pointer"
                        >
                            {/* MODULAR */}
                            <div className="flex text-center items-center justify-center">
                                Threadr
                            </div>
                        </button>
                    </div>

                    {/* Right side buttons */}
                    <div className="flex items-center space-x-3">
                        {/* Sign In Button */}
                        <button
                            className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors font-medium flex items-center gap-2"
                            onClick={() =>
                                document
                                    .getElementById("consultation")
                                    ?.scrollIntoView({ behavior: "smooth" })
                            }
                        >
                            Sign In
                            <svg
                                className="w-4 h-4"
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
                        </button>

                        {/* Sign Up Button */}
                        <button
                            onClick={() =>
                                document
                                    .getElementById("consultation")
                                    ?.scrollIntoView({ behavior: "smooth" })
                            }
                            className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
