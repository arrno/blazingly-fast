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
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-10 sm:px-6">
            <button
                type="button"
                aria-label="Close modal"
                className="absolute inset-0 cursor-pointer bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />
            <div
                role="dialog"
                aria-modal="true"
                aria-label={ariaLabel}
                className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/20 bg-gradient-to-b from-white to-white/90 shadow-2xl"
            >
                <div className="p-6 sm:p-8">{children}</div>
            </div>
        </div>,
        document.body
    );
}
