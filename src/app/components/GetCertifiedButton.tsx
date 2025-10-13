"use client";

import type { ButtonHTMLAttributes, MouseEvent } from "react";
import { useModal } from "./ModalProvider";

type GetCertifiedButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function GetCertifiedButton({
    children,
    className = "",
    onClick,
    ...rest
}: GetCertifiedButtonProps) {
    const { openModal } = useModal();

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
            openModal("certification");
        }
    };

    return (
        <button
            type="button"
            className={className}
            {...rest}
            onClick={handleClick}
        >
            {children}
        </button>
    );
}
