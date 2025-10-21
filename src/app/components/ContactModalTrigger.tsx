"use client";

import type { PropsWithChildren } from "react";
import { useModal } from "./ModalProvider";

interface ContactModalTriggerProps extends PropsWithChildren {
    className?: string;
}

export function ContactModalTrigger({
    className = "",
    children = "Contact",
}: ContactModalTriggerProps) {
    const { openModal } = useModal();

    return (
        <button
            type="button"
            onClick={() => openModal("contact")}
            className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/60 transition hover:text-white ${className}`}
        >
            {children}
        </button>
    );
}
