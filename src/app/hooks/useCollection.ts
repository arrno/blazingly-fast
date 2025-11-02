"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    QueryDocumentSnapshot,
    collection,
    documentId,
    getCountFromServer,
    getDocs,
    limit,
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
    WhereFilterOp,
} from "firebase/firestore";
import { getClientFirestore } from "@/lib/firebase/client";

export type UseCollectionOptions<T> = {
    pageSize?: number;
    orderByField?: string;
    orderDirection?: "asc" | "desc";
    mapDocument: (doc: QueryDocumentSnapshot) => T;
    filters?: FirestoreFilter[];
};

export type FirestoreFilter = {
    fieldPath: string;
    opStr: WhereFilterOp;
    value: unknown;
};

type UseCollectionState<T> = {
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

export function useCollection<T>(
    collectionName: string,
    options: UseCollectionOptions<T>
): UseCollectionState<T> {
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
    const cursorsRef = useRef<QueryDocumentSnapshot[]>([]);

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

    const fetchCount = useCallback(async () => {
        const firestore = getClientFirestore();
        if (!firestore) {
            setError("Missing Firebase client configuration");
            return;
        }

        try {
            const collRef = collection(firestore, collectionName);
            const countQuery = query(collRef, ...filterConstraints);
            const countSnapshot = await getCountFromServer(countQuery);
            setTotalRecords(countSnapshot.data().count);
        } catch (err) {
            setError((err as Error).message);
        }
    }, [collectionName, filterConstraints]);

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
                    | QueryFieldFilterConstraint
                > = [
                    ...filterConstraints,
                    orderBy(orderByField, orderDirection),
                    limit(pageSize),
                ];

                if (targetPage > 0) {
                    const priorCursor = cursorsRef.current[targetPage - 1];
                    if (priorCursor) {
                        constraints.push(startAfter(priorCursor));
                    }
                }

                const snapshot = await getDocs(query(collRef, ...constraints));
                const mapped = snapshot.docs.map((doc) => mapDocument(doc));
                setData(mapped);

                if (snapshot.docs.length > 0) {
                    cursorsRef.current[targetPage] =
                        snapshot.docs[snapshot.docs.length - 1];
                }

                setPage(targetPage);
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
        cursorsRef.current = [];
        fetchCount();
        fetchPage(0);
    }, [fetchCount, fetchPage]);

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
        fetchCount();
        fetchPage(0);
    }, [fetchCount, fetchPage]);

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
