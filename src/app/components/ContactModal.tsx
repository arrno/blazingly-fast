"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { Modal } from "./Modal";
import { useModal } from "./ModalProvider";
import {
    buildContactFormSubmission,
    type ContactFormSubmission,
} from "../domain/contactForm";

function isValidEmail(value: string): boolean {
    return /.+@.+\..+/i.test(value.trim());
}

export function ContactModal() {
    const { modalType, closeModal } = useModal();
    const open = modalType === "contact";

    const [subject, setSubject] = useState("");
    const [fromEmail, setFromEmail] = useState("");
    const [body, setBody] = useState("");
    const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
    const [error, setError] = useState<string | null>(null);
    const [submission, setSubmission] = useState<ContactFormSubmission | null>(
        null
    );
    const [isCompact, setIsCompact] = useState(false);

    useEffect(() => {
        if (!open) {
            setSubject("");
            setFromEmail("");
            setBody("");
            setStatus("idle");
            setError(null);
            setSubmission(null);
        }
    }, [open]);

    useEffect(() => {
        const updateCompactMode = () => {
            setIsCompact(window.innerHeight < 750);
        };

        updateCompactMode();
        window.addEventListener("resize", updateCompactMode);
        return () => window.removeEventListener("resize", updateCompactMode);
    }, []);

    const trimmedSubject = useMemo(() => subject.trim(), [subject]);
    const trimmedEmail = useMemo(() => fromEmail.trim(), [fromEmail]);
    const trimmedBody = useMemo(() => body.trim(), [body]);

    const isFormValid =
        trimmedSubject.length > 0 &&
        isValidEmail(trimmedEmail) &&
        trimmedBody.length > 0 &&
        status !== "sending";

    const handleSubmit = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            if (trimmedSubject.length === 0) {
                setError("Subject is required");
                return;
            }

            if (!isValidEmail(trimmedEmail)) {
                setError("Enter a valid email");
                return;
            }

            if (trimmedBody.length === 0) {
                setError("Message body is required");
                return;
            }

            setError(null);
            setStatus("sending");

            const contactSubmission = buildContactFormSubmission({
                subject: trimmedSubject,
                fromEmail: trimmedEmail,
                body: trimmedBody,
            });

            setSubmission(contactSubmission);
            setStatus("sent");
        },
        [trimmedSubject, trimmedEmail, trimmedBody]
    );

    const containerSpacingClass = isCompact ? "space-y-6" : "space-y-8";
    const headerSpacingClass = isCompact ? "space-y-1" : "space-y-2";
    const headingTextClass = `${
        isCompact ? "text-xl" : "text-2xl"
    } font-semibold tracking-tight text-gray-900`;
    const formSpacingClass = isCompact ? "space-y-5" : "space-y-6";
    const textareaClass = `w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 shadow-sm transition focus:border-[#ff6b6b] focus:outline-none focus:ring-2 focus:ring-[#ff6b6b]/20 focus:shadow-[0_0_0_4px_rgba(255,107,107,0.12)] ${
        isCompact ? "min-h-[120px]" : "min-h-[160px]"
    }`;
    const submitButtonClass = `inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-8 ${
        isCompact ? "py-3" : "py-4"
    } text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-200 w-full`;

    return (
        <Modal open={open} onClose={closeModal} ariaLabel="Contact form">
            <div className={containerSpacingClass}>
                <header className={headerSpacingClass}>
                    <h2 className={headingTextClass}>Say hello 👋</h2>
                    {isCompact ? (
                        <p className="text-xs text-gray-500">
                            Drop us a note and we&apos;ll reply soon.
                        </p>
                    ) : (
                        <p className="text-sm text-gray-600">
                            Questions, feedback, or spicy benchmark stories —
                            send them our way.
                        </p>
                    )}
                </header>

                {status === "sent" && submission ? (
                    <div className="space-y-4 rounded-lg border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-800">
                        <p className="font-semibold">Message sent!</p>
                        <p>
                            We&apos;ll follow up at {submission.fromEmail}. Feel
                            free to close this window or send another note.
                        </p>
                    </div>
                ) : (
                    <form className={formSpacingClass} onSubmit={handleSubmit}>
                        <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                            Subject
                            <input
                                value={subject}
                                onChange={(event) =>
                                    setSubject(event.target.value)
                                }
                                placeholder="How can we help?"
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 shadow-sm transition focus:border-[#ff6b6b] focus:outline-none focus:ring-2 focus:ring-[#ff6b6b]/20 focus:shadow-[0_0_0_4px_rgba(255,107,107,0.12)]"
                            />
                        </label>

                        <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                            From email
                            <input
                                value={fromEmail}
                                onChange={(event) =>
                                    setFromEmail(event.target.value)
                                }
                                placeholder="you@example.com"
                                inputMode="email"
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 shadow-sm transition focus:border-[#ff6b6b] focus:outline-none focus:ring-2 focus:ring-[#ff6b6b]/20 focus:shadow-[0_0_0_4px_rgba(255,107,107,0.12)]"
                            />
                        </label>

                        <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                            Message
                            <textarea
                                value={body}
                                onChange={(event) =>
                                    setBody(event.target.value)
                                }
                                placeholder="Tell us what's on your mind."
                                className={textareaClass}
                            />
                        </label>

                        {error && (
                            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                                {error}
                            </div>
                        )}

                        <div className="flex">
                            <button
                                type="submit"
                                disabled={!isFormValid}
                                className={submitButtonClass}
                            >
                                {status === "sending" ? "Sending…" : "Send"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </Modal>
    );
}
