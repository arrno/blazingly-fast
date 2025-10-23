export interface ContactFormInput {
    subject: string;
    fromEmail: string;
    body: string;
}

export interface ContactFormSubmission extends ContactFormInput {
    submittedAt: Date;
}

interface BuildContactFormSubmissionArgs extends ContactFormInput {
    submittedAt?: Date;
}

export function sanitizeContactFormInput(
    input: ContactFormInput
): ContactFormInput {
    return {
        subject: input.subject.trim(),
        fromEmail: input.fromEmail.trim(),
        body: input.body.trim(),
    };
}

export function parseContactFormPayload(payload: unknown): ContactFormInput | null {
    if (typeof payload !== "object" || payload === null) {
        return null;
    }

    const { subject, fromEmail, body } = payload as Partial<ContactFormInput>;

    if (
        typeof subject !== "string" ||
        typeof fromEmail !== "string" ||
        typeof body !== "string"
    ) {
        return null;
    }

    return {
        subject,
        fromEmail,
        body,
    };
}

export function validateContactFormInput(
    input: ContactFormInput
): string | null {
    if (input.subject.length === 0 || input.subject.length > 128) {
        return "Subject must be between 1 and 128 characters";
    }

    if (!/.+@.+\..+/i.test(input.fromEmail)) {
        return "Enter a valid email";
    }

    if (input.body.length === 0 || input.body.length > 1000) {
        return "Message must be between 1 and 1000 characters";
    }

    return null;
}

export function buildContactFormSubmission({
    subject,
    fromEmail,
    body,
    submittedAt = new Date(),
}: BuildContactFormSubmissionArgs): ContactFormSubmission {
    const sanitized = sanitizeContactFormInput({ subject, fromEmail, body });
    return {
        ...sanitized,
        submittedAt,
    };
}
