"use client";

import { useAddDocument } from "@/hooks/useAddDocument";
import { FormEvent, useState } from "react";

export default function Form({
    actionString,
    page,
}: {
    actionString: string;
    page: string;
}) {
    const { doAddDoc } = useAddDocument("/anybody/contact/webForm");
    const [email, setEmail] = useState<string>("");
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await doAddDoc({
                source: "Threadr",
                page,
                date: Date.now(),
                email,
            });

            setEmail("");
            setIsSubmitted(true);

            // Reset success state after 2 seconds
            setTimeout(() => {
                setIsSubmitted(false);
            }, 2000);
        } catch (error) {
            console.error("Form submission error:", error);
        }
    };

    return (
        <div className="max-w-md mx-auto mb-12 relative">
            {isSubmitted && (
                <div className="success-notification">
                    <svg
                        className="success-checkmark"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="20,6 9,17 4,12"></polyline>
                    </svg>
                    <span>Success</span>
                </div>
            )}
            <form
                className="flex flex-col sm:flex-row gap-4"
                onSubmit={handleSubmit}
            >
                <input
                    type="email"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="flex-1 px-6 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[rgb(78,128,245)] focus:border-transparent text-lg bg-white"
                    required
                />
                <button
                    type="submit"
                    className="bg-[rgb(78,128,245)] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[rgb(62,102,196)] transition-colors whitespace-nowrap"
                >
                    {actionString}
                </button>
            </form>
        </div>
    );
}
