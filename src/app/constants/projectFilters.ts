import type { FirestoreFilter } from "../hooks/useCollection";

export const visibleProjectFilters: FirestoreFilter[] = [
    {
        fieldPath: "hidden",
        opStr: "!=",
        value: true,
    },
];
