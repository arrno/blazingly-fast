export interface ContactFormSubmission {
    subject: string;
    fromEmail: string;
    body: string;
    submittedAt: Date;
}

interface BuildContactFormSubmissionArgs {
    subject: string;
    fromEmail: string;
    body: string;
    submittedAt?: Date;
}

export function buildContactFormSubmission({
    subject,
    fromEmail,
    body,
    submittedAt = new Date(),
}: BuildContactFormSubmissionArgs): ContactFormSubmission {
    return {
        subject,
        fromEmail,
        body,
        submittedAt,
    };
}
