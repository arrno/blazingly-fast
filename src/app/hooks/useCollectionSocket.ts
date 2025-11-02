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
    where,
} from "firebase/firestore";
import type {
    QueryOrderByConstraint,
    QueryLimitConstraint,
    QueryStartAtConstraint,
    QueryFieldFilterConstraint,
} from "firebase/firestore";
import { getClientFirestore } from "@/lib/firebase/client";
import type { FirestoreFilter } from "./useCollection";

export type UseCollectionSocketOptions<T> = {
    pageSize?: number;
    orderByField?: string;
    orderDirection?: "asc" | "desc";
    mapDocument: (doc: QueryDocumentSnapshot) => T;
    filters?: FirestoreFilter[];
};

type UseCollectionSocketState<T> = {
    data: T[];
    loading: boolean;
    error: string | null;
    page: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
    hasStaleData: boolean;
    nextPage: () => void;
    prevPage: () => void;
    refresh: () => void;
};

type FetchPageOptions = {
    rebuildChain?: boolean;
};

export function useCollectionSocket<T>(
    collectionName: string,
    options: UseCollectionSocketOptions<T>
): UseCollectionSocketState<T> {
    const pageSize = options.pageSize ?? 10;
    const orderByField = options.orderByField ?? documentId();
    const orderDirection = options.orderDirection ?? "asc";
    const mapDocument = options.mapDocument;
    const filterStateRef = useRef<{
        key: string;
        constraints: QueryFieldFilterConstraint[];
    }>({
        key: "[]",
        constraints: [],
    });
    const filtersKey =
        options.filters && options.filters.length > 0
            ? JSON.stringify(
                  options.filters.map(({ fieldPath, opStr, value }) => ({
                      fieldPath,
                      opStr,
                      value,
                  }))
              )
            : "[]";
    if (filtersKey !== filterStateRef.current.key) {
        if (!options.filters || options.filters.length === 0) {
            filterStateRef.current = {
                key: "[]",
                constraints: [],
            };
        } else {
            filterStateRef.current = {
                key: filtersKey,
                constraints: options.filters.map(({ fieldPath, opStr, value }) =>
                    where(fieldPath, opStr, value)
                ),
            };
        }
    }
    const filterConstraints = filterStateRef.current.constraints;
    const cursorsRef = useRef<Array<QueryDocumentSnapshot | undefined>>([]);
    const currentPageRef = useRef(0);
    const totalRecordsRef = useRef(0);

    const [data, setData] = useState<T[]>([]);
    const [page, setPage] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasStaleData, setHasStaleData] = useState(false);

    const totalPages = useMemo(() => {
        if (totalRecords === 0) {
            return 1;
        }
        return Math.max(1, Math.ceil(totalRecords / pageSize));
    }, [pageSize, totalRecords]);

    const fetchPage = useCallback(
        async (targetPage: number, options: FetchPageOptions = {}) => {
            const firestore = getClientFirestore();
            if (!firestore) {
                setError("Missing Firebase client configuration");
                return;
            }

            const needsRebuild =
                options.rebuildChain ||
                (targetPage > 0 && !cursorsRef.current[targetPage - 1]);

            setLoading(true);
            setError(null);

            try {
                const collRef = collection(firestore, collectionName);
                let snapshotDocs: QueryDocumentSnapshot[] = [];

                if (needsRebuild) {
                    const nextCursors: Array<
                        QueryDocumentSnapshot | undefined
                    > = [];
                    let lastDoc: QueryDocumentSnapshot | undefined;

                    for (let index = 0; index <= targetPage; index += 1) {
                        const pageConstraints: Array<
                            | QueryOrderByConstraint
                            | QueryLimitConstraint
                            | QueryStartAtConstraint
                            | QueryFieldFilterConstraint
                        > = [
                            ...filterConstraints,
                            orderBy(orderByField, orderDirection),
                            limit(pageSize),
                        ];

                        if (lastDoc) {
                            pageConstraints.push(startAfter(lastDoc));
                        }

                        const pageSnapshot = await getDocs(
                            query(collRef, ...pageConstraints)
                        );

                        if (pageSnapshot.docs.length > 0) {
                            lastDoc =
                                pageSnapshot.docs[pageSnapshot.docs.length - 1];
                            nextCursors[index] = lastDoc;
                        } else {
                            nextCursors[index] = lastDoc;
                        }

                        if (index === targetPage) {
                            snapshotDocs = pageSnapshot.docs;
                        }
                    }

                    cursorsRef.current = nextCursors;
                } else {
                    const constraints: Array<
                        | QueryOrderByConstraint
                        | QueryLimitConstraint
                        | QueryStartAtConstraint
                        | QueryFieldFilterConstraint
                    > = [
                        ...filterConstraints,
                        orderBy(orderByField, orderDirection),
                        limit(pageSize),
                    ];

                    if (targetPage > 0) {
                        const priorCursor = cursorsRef.current[targetPage - 1];
                        if (!priorCursor) {
                            setError(
                                "Pagination cursor missing, please refresh."
                            );
                            return;
                        }

                        constraints.push(startAfter(priorCursor));
                    }

                    const snapshot = await getDocs(
                        query(collRef, ...constraints)
                    );
                    snapshotDocs = snapshot.docs;

                    if (snapshot.docs.length > 0) {
                        cursorsRef.current[targetPage] =
                            snapshot.docs[snapshot.docs.length - 1];
                    }
                }

                const mapped = snapshotDocs.map((doc) => mapDocument(doc));
                setData(mapped);

                currentPageRef.current = targetPage;
                setPage(targetPage);

                if (targetPage === 0) {
                    setTotalRecords(totalRecordsRef.current);
                }

                if (targetPage === 0 || options.rebuildChain) {
                    setHasStaleData(false);
                }
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        },
        [
            collectionName,
            filterConstraints,
            mapDocument,
            orderByField,
            orderDirection,
            pageSize,
        ]
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
                query(collRef, ...filterConstraints),
                (snapshot) => {
                    const newTotal = snapshot.size;
                    const previousTotal = totalRecordsRef.current;
                    totalRecordsRef.current = newTotal;

                    if (isInitialSnapshot) {
                        isInitialSnapshot = false;
                        setTotalRecords(newTotal);
                        return;
                    }

                    if (currentPageRef.current === 0) {
                        if (newTotal !== previousTotal) {
                            setTotalRecords(newTotal);
                            fetchPage(0);
                        }
                        return;
                    }

                    if (newTotal < previousTotal) {
                        setTotalRecords(newTotal);

                        const nextTotalPages = Math.max(
                            1,
                            Math.ceil(newTotal / pageSize)
                        );
                        const targetPageIndex = Math.min(
                            currentPageRef.current,
                            nextTotalPages - 1
                        );

                        fetchPage(targetPageIndex, { rebuildChain: true });
                        return;
                    }

                    if (newTotal > previousTotal) {
                        setHasStaleData(true);
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
    }, [collectionName, fetchPage, filterConstraints, pageSize]);

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
        setTotalRecords(totalRecordsRef.current);
        setHasStaleData(false);
        fetchPage(0, { rebuildChain: true });
    }, [fetchPage]);

    return {
        data,
        loading,
        error,
        page,
        pageSize,
        totalRecords,
        totalPages,
        hasStaleData,
        nextPage,
        prevPage,
        refresh,
    };
}
