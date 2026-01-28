"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { Modal } from "./Modal";
import { useModal } from "./ModalProvider";
import { Spinner } from "./Spinner";
import {
    buildContactFormSubmission,
    sanitizeContactFormInput,
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
        async (event: FormEvent<HTMLFormElement>) => {
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
            setSubmission(null);
            setStatus("sending");

            const sanitizedInput = sanitizeContactFormInput({
                subject: trimmedSubject,
                fromEmail: trimmedEmail,
                body: trimmedBody,
            });

            try {
                const response = await fetch("/api/contact", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(sanitizedInput),
                });

                const payload = await response.json().catch(() => ({}));

                if (!response.ok) {
                    const message =
                        typeof payload.error === "string"
                            ? payload.error
                            : "Unable to send message";
                    throw new Error(message);
                }

                const submissionPayload = payload.submission as
                    | {
                          subject?: string;
                          fromEmail?: string;
                          body?: string;
                          submittedAt?: string;
                      }
                    | undefined;

                const submissionResult = buildContactFormSubmission({
                    subject:
                        submissionPayload?.subject ?? sanitizedInput.subject,
                    fromEmail:
                        submissionPayload?.fromEmail ??
                        sanitizedInput.fromEmail,
                    body: submissionPayload?.body ?? sanitizedInput.body,
                    submittedAt: submissionPayload?.submittedAt
                        ? new Date(submissionPayload.submittedAt)
                        : new Date(),
                });

                setSubmission(submissionResult);
                setStatus("sent");
            } catch (submissionError) {
                setStatus("idle");
                setError((submissionError as Error).message);
            }
        },
        [trimmedSubject, trimmedEmail, trimmedBody]
    );

    const containerSpacingClass = isCompact ? "space-y-6" : "space-y-8";
    const headerSpacingClass = isCompact ? "space-y-1" : "space-y-2";
    const headingTextClass = `${
        isCompact ? "text-xl" : "text-2xl"
    } font-semibold tracking-tight text-zinc-900`;
    const formSpacingClass = isCompact ? "space-y-5" : "space-y-6";
    const inputBaseClass =
        "w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-base text-zinc-900 placeholder:text-zinc-400 transition focus:border-[#ff6b6b] focus:outline-none focus:ring-2 focus:ring-[#ff6b6b]/30 sm:text-sm";
    const textareaClass = `${inputBaseClass} ${
        isCompact ? "min-h-[120px]" : "min-h-[160px]"
    }`;
    const submitButtonClass = `w-full rounded-lg bg-black ${
        isCompact ? "py-3" : "py-3.5"
    } text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-70`;

    return (
        <Modal open={open} onClose={closeModal} ariaLabel="Contact form">
            <div className={containerSpacingClass}>
                <header className="flex items-start justify-between gap-4">
                    <div className={headerSpacingClass}>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                            Contact
                        </p>
                        <h2 className={headingTextClass}>Say hello 👋</h2>
                        {isCompact ? (
                            <p className="text-xs text-zinc-500">
                                Drop us a note and we&apos;ll reply soon.
                            </p>
                        ) : (
                            <p className="text-sm text-zinc-500">
                                Questions, feedback, or spicy benchmark stories
                                — send them our way.
                            </p>
                        )}
                    </div>
                    <button
                        type="button"
                        aria-label="Close contact modal"
                        onClick={closeModal}
                        className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-zinc-100 bg-zinc-100 text-sm font-semibold text-zinc-500 transition hover:border-zinc-300 hover:bg-zinc-300 hover:text-zinc-800"
                    >
                        ✕
                    </button>
                </header>

                {status === "sent" && submission ? (
                    <div className="space-y-4 rounded-lg border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-800">
                        <p className="font-semibold">Message sent!</p>
                        <p>
                            We&apos;ll follow up at {submission.fromEmail}. Feel
                            free to close this window or send another note.
                        </p>
                        <button
                            type="button"
                            onClick={() => {
                                setStatus("idle");
                                setSubmission(null);
                                setSubject("");
                                setFromEmail("");
                                setBody("");
                            }}
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-300 bg-white px-4 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100"
                        >
                            Send another message
                        </button>
                    </div>
                ) : status === "sending" ? (
                    <div className="flex flex-col items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-800">
                        <Spinner
                            className="h-6 w-6 text-emerald-600"
                            label="Sending"
                        />
                        <p>Sending your message…</p>
                    </div>
                ) : (
                    <form className={formSpacingClass} onSubmit={handleSubmit}>
                        <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700">
                            Subject
                            <input
                                value={subject}
                                onChange={(event) =>
                                    setSubject(event.target.value)
                                }
                                placeholder="How can we help?"
                                className={inputBaseClass}
                            />
                        </label>

                        <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700">
                            From email
                            <input
                                value={fromEmail}
                                onChange={(event) =>
                                    setFromEmail(event.target.value)
                                }
                                placeholder="you@example.com"
                                inputMode="email"
                                className={inputBaseClass}
                            />
                        </label>

                        <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700">
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
                                Send
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </Modal>
    );
}
