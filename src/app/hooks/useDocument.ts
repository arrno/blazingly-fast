"use client";

import { useCallback, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { getClientFirestore } from "@/lib/firebase/client";

type UseDocumentState<T> = {
    data: T | null;
    loading: boolean;
    error: string | null;
    refresh: () => void;
};

export function useDocument<T>(path: string): UseDocumentState<
    T & { id: string }
> {
    const [data, setData] = useState<(T & { id: string }) | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchDocument = useCallback(async () => {
        const firestore = getClientFirestore();
        if (!firestore) {
            setError("Missing Firebase client configuration");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const docRef = doc(firestore, path);
            const snapshot = await getDoc(docRef);
            if (!snapshot.exists()) {
                setData(null);
                setError("Document not found");
            } else {
                setData({ id: snapshot.id, ...(snapshot.data() as T) });
            }
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    }, [path]);

    useEffect(() => {
        fetchDocument();
    }, [fetchDocument]);

    return {
        data,
        loading,
        error,
        refresh: fetchDocument,
    };
}
