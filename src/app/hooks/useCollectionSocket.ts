"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    QueryDocumentSnapshot,
    Unsubscribe,
    collection,
    documentId,
    getDocs,
    limit,
    onSnapshot,
    orderBy,
    query,
    startAfter,
    QueryOrderByConstraint,
    QueryLimitConstraint,
    QueryStartAtConstraint,
} from "firebase/firestore";
import { getClientFirestore } from "@/lib/firebase/client";

export type UseCollectionSocketOptions<T> = {
    pageSize?: number;
    orderByField?: string;
    orderDirection?: "asc" | "desc";
    mapDocument: (doc: QueryDocumentSnapshot) => T;
};

type UseCollectionSocketState<T> = {
    data: T[];
    loading: boolean;
    error: string | null;
    page: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
    nextPage: () => void;
    prevPage: () => void;
    refresh: () => void;
};

export function useCollectionSocket<T>(
    collectionName: string,
    options: UseCollectionSocketOptions<T>
): UseCollectionSocketState<T> {
    const pageSize = options.pageSize ?? 10;
    const orderByField = options.orderByField ?? documentId();
    const orderDirection = options.orderDirection ?? "asc";
    const mapDocument = options.mapDocument;
    const cursorsRef = useRef<QueryDocumentSnapshot[]>([]);
    const currentPageRef = useRef(0);
    const totalRecordsRef = useRef(0);

    const [data, setData] = useState<T[]>([]);
    const [page, setPage] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const totalPages = useMemo(() => {
        if (totalRecords === 0) {
            return 1;
        }
        return Math.max(1, Math.ceil(totalRecords / pageSize));
    }, [pageSize, totalRecords]);

    const fetchPage = useCallback(
        async (targetPage: number) => {
            const firestore = getClientFirestore();
            if (!firestore) {
                setError("Missing Firebase client configuration");
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const collRef = collection(firestore, collectionName);
                const constraints: Array<
                    | QueryOrderByConstraint
                    | QueryLimitConstraint
                    | QueryStartAtConstraint
                > = [orderBy(orderByField, orderDirection), limit(pageSize)];

                if (targetPage > 0) {
                    const priorCursor = cursorsRef.current[targetPage - 1];
                    if (priorCursor) {
                        constraints.push(startAfter(priorCursor));
                    } else {
                        // No prior cursor means the cached pagination is invalid.
                        setError("Pagination cursor missing, please refresh.");
                        setLoading(false);
                        return;
                    }
                }

                const snapshot = await getDocs(query(collRef, ...constraints));
                const mapped = snapshot.docs.map((doc) => mapDocument(doc));
                setData(mapped);

                if (snapshot.docs.length > 0) {
                    cursorsRef.current[targetPage] =
                        snapshot.docs[snapshot.docs.length - 1];
                }

                currentPageRef.current = targetPage;
                setPage(targetPage);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        },
        [collectionName, mapDocument, orderByField, orderDirection, pageSize]
    );

    useEffect(() => {
        const firestore = getClientFirestore();
        if (!firestore) {
            setError("Missing Firebase client configuration");
            return;
        }

        const collRef = collection(firestore, collectionName);
        let unsubscribe: Unsubscribe | undefined;
        let isInitialSnapshot = true;

        try {
            unsubscribe = onSnapshot(
                collRef,
                (snapshot) => {
                    const newTotal = snapshot.size;
                    const previousTotal = totalRecordsRef.current;
                    totalRecordsRef.current = newTotal;

                    setTotalRecords(newTotal);

                    if (isInitialSnapshot) {
                        isInitialSnapshot = false;
                        return;
                    }

                    if (newTotal !== previousTotal && currentPageRef.current === 0) {
                        fetchPage(0);
                    }
                },
                (snapshotError) => {
                    setError(snapshotError.message);
                }
            );
        } catch (err) {
            setError((err as Error).message);
        }

        return () => {
            unsubscribe?.();
        };
    }, [collectionName, fetchPage]);

    useEffect(() => {
        cursorsRef.current = [];
        currentPageRef.current = 0;
        totalRecordsRef.current = 0;
        fetchPage(0);
    }, [fetchPage]);

    const nextPage = useCallback(() => {
        if (page + 1 >= totalPages) {
            return;
        }
        fetchPage(page + 1);
    }, [fetchPage, page, totalPages]);

    const prevPage = useCallback(() => {
        if (page === 0) {
            return;
        }
        fetchPage(page - 1);
    }, [fetchPage, page]);

    const refresh = useCallback(() => {
        cursorsRef.current = [];
        currentPageRef.current = 0;
        fetchPage(0);
    }, [fetchPage]);

    return {
        data,
        loading,
        error,
        page,
        pageSize,
        totalRecords,
        totalPages,
        nextPage,
        prevPage,
        refresh,
    };
}
