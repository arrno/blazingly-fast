import { Project, Status } from "../domain/projects";
import type { QueryDocumentSnapshot } from "firebase/firestore";

export type FirestoreProject = {
    name?: string;
    maintainer?: string;
    repository?: string;
    certifiedDate?: { toDate?: () => Date } | Date | string;
    certifiedOn?: string;
    blurb?: string;
    exists?: boolean;
    status?: Status;
    hidden?: boolean;
};

export function formatDateLabel(date: Date): string {
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    });
}

export function mapProjectDocument(doc: QueryDocumentSnapshot): Project {
    const data = doc.data() as FirestoreProject;

    const certifiedDateValue = data.certifiedDate;
    let certifiedDate: Date;

    if (certifiedDateValue instanceof Date) {
        certifiedDate = certifiedDateValue;
    } else if (
        certifiedDateValue &&
        typeof certifiedDateValue === "object" &&
        "toDate" in certifiedDateValue &&
        typeof certifiedDateValue.toDate === "function"
    ) {
        certifiedDate = certifiedDateValue.toDate();
    } else if (typeof certifiedDateValue === "string") {
        certifiedDate = new Date(certifiedDateValue);
    } else {
        certifiedDate = new Date();
    }

    const status =
        data.status === Status.Fast ||
        data.status === Status.Average ||
        data.status === Status.Pending
            ? data.status
            : Status.Pending;

    return {
        id: doc.id,
        name: data.name ?? doc.id,
        maintainer: data.maintainer ?? "",
        repository: data.repository ?? "",
        certifiedDate,
        certifiedOn: data.certifiedOn ?? formatDateLabel(certifiedDate),
        blurb: data.blurb ?? "",
        exists: data.exists ?? true,
        status,
        hidden: data.hidden ?? false,
    };
}

export const STATUS_META: Record<Status, { label: string; className: string }> =
    {
        [Status.Fast]: {
            label: "🔥 blazingly fast",
            className: "text-[#FF5C5C]",
        },
        [Status.Pending]: {
            label: "blazingly pending",
            className: "text-[#8F7DEB]",
        },
        [Status.Average]: {
            label: "blazingly average",
            className: "text-[#8F7DEB]",
        },
    };

export function normalizeRepository(repository: string): string {
    const trimmed = repository.trim();

    if (!trimmed) {
        return "";
    }

    if (trimmed.startsWith("http")) {
        return trimmed;
    }

    return `https://${trimmed}`;
}

export type RepositoryDisplay = {
    full: string;
    owner?: string;
    name: string;
};

export function getRepositoryDisplay(
    repository: string,
    fallbackName?: string
): RepositoryDisplay | null {
    const trimmed = repository.trim();
    const fallback = fallbackName?.trim();

    if (!trimmed) {
        if (!fallback) {
            return null;
        }

        return {
            full: fallback,
            name: fallback,
        };
    }

    const ensureProtocol = trimmed.startsWith("http")
        ? trimmed
        : `https://${trimmed}`;

    const normalizeRepo = (value: string): RepositoryDisplay | null => {
        const segments = value.split("/").filter(Boolean);

        if (segments.length >= 2) {
            const owner = segments[segments.length - 2];
            const repo = segments[segments.length - 1].replace(/\.git$/, "");
            return {
                full: `${owner}/${repo}`,
                owner,
                name: repo,
            };
        }

        if (segments.length === 1) {
            const repo = segments[0].replace(/\.git$/, "");
            return {
                full: repo,
                name: repo,
            };
        }

        if (fallback) {
            return {
                full: fallback,
                name: fallback,
            };
        }

        return null;
    };

    try {
        const url = new URL(ensureProtocol);
        const display = normalizeRepo(url.pathname);

        if (display) {
            return display;
        }

        return {
            full: url.hostname,
            name: url.hostname,
        };
    } catch {
        const display = normalizeRepo(trimmed);

        if (display) {
            return display;
        }

        return null;
    }
}
