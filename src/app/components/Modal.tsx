"use client";

import { useEffect, useState, type PropsWithChildren } from "react";
import { createPortal } from "react-dom";

interface ModalProps extends PropsWithChildren {
    open: boolean;
    onClose: () => void;
    ariaLabel?: string;
}

export function Modal({ open, onClose, ariaLabel, children }: ModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        if (!open) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [open, onClose]);

    useEffect(() => {
        if (!mounted) {
            return;
        }

        const originalOverflow = document.body.style.overflow;
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = originalOverflow;
        }

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [open, mounted]);

    if (!mounted || !open) {
        return null;
    }

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div
                aria-hidden="true"
                className="absolute inset-0 h-full w-full cursor-pointer bg-gray-950/60 backdrop-blur-sm"
                onClick={onClose}
            />
            <div
                role="dialog"
                aria-modal="true"
                aria-label={ariaLabel}
                className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-gray-100/20 bg-white/95 shadow-2xl shadow-gray-900/20"
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-500 transition hover:border-gray-300 hover:bg-gray-200"
                >
                    ✕
                </button>
                <div className="p-6 sm:p-8">{children}</div>
            </div>
        </div>,
        document.body
    );
}
