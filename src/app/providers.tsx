"use client";

import type { PropsWithChildren } from "react";
import { ModalProvider } from "./components/ModalProvider";

export function Providers({ children }: PropsWithChildren) {
    return <ModalProvider>{children}</ModalProvider>;
}
