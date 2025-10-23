import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import {
    buildContactFormSubmission,
    parseContactFormPayload,
    sanitizeContactFormInput,
    validateContactFormInput,
} from "@/app/domain/contactForm";
import { addDocument } from "@/app/hooks/useAddDocument";
import { getServerFirestore } from "@/lib/firebase/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
    let payloadInput = null;

    try {
        const body = await request.json();
        payloadInput = parseContactFormPayload(body);
    } catch {
        return NextResponse.json(
            { error: "Invalid JSON payload" },
            { status: 400 }
        );
    }

    if (!payloadInput) {
        return NextResponse.json(
            { error: "Invalid contact submission" },
            { status: 400 }
        );
    }

    const sanitizedInput = sanitizeContactFormInput(payloadInput);
    const validationError = validateContactFormInput(sanitizedInput);

    if (validationError) {
        return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const firestore = getServerFirestore();

    if (!firestore) {
        return NextResponse.json(
            { error: "Server firestore configuration missing" },
            { status: 500 }
        );
    }

    const submission = buildContactFormSubmission({ ...sanitizedInput });

    try {
        await addDocument("contactMessages", {
            subject: submission.subject,
            fromEmail: submission.fromEmail,
            body: submission.body,
            submittedAt: FieldValue.serverTimestamp(),
            createdAt: FieldValue.serverTimestamp(),
        });
    } catch (error) {
        const message = (error as Error).message || "Contact submission failed";
        return NextResponse.json({ error: message }, { status: 500 });
    }

    return NextResponse.json(
        {
            success: true,
            submission: {
                subject: submission.subject,
                fromEmail: submission.fromEmail,
                body: submission.body,
                submittedAt: submission.submittedAt.toISOString(),
            },
        },
        { status: 201 }
    );
}
