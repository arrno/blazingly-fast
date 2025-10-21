"use client";

import {
    createContext,
    type PropsWithChildren,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";

export type ModalType = "certification" | "contact" | null;

interface ModalContextValue {
    modalType: ModalType;
    openModal: (type: NonNullable<ModalType>) => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export function ModalProvider({ children }: PropsWithChildren) {
    const [modalType, setModalType] = useState<ModalType>(null);

    const openModal = useCallback((type: NonNullable<ModalType>) => {
        setModalType(type);
    }, []);

    const closeModal = useCallback(() => {
        setModalType(null);
    }, []);

    const value = useMemo(
        () => ({
            modalType,
            openModal,
            closeModal,
        }),
        [modalType, openModal, closeModal],
    );

    return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export function useModal() {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
}
