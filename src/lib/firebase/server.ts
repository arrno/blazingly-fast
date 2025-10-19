import { App, cert, getApps, initializeApp } from "firebase-admin/app";
import { Firestore, getFirestore } from "firebase-admin/firestore";

type AdminConfig = {
    projectId?: string;
    clientEmail?: string;
    privateKey?: string;
};

let cachedApp: App | null = null;

function getAdminConfig(): AdminConfig | null {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const rawPrivateKey = process.env.FIREBASE_PRIVATE_KEY;

    if (!projectId || !clientEmail || !rawPrivateKey) {
        return null;
    }

    const privateKey = rawPrivateKey.replace(/\\n/g, "\n");

    return {
        projectId,
        clientEmail,
        privateKey,
    };
}

function ensureAdminApp(): App | null {
    if (cachedApp) {
        return cachedApp;
    }

    const config = getAdminConfig();
    if (!config) {
        return null;
    }

    const credential = cert({
        projectId: config.projectId,
        clientEmail: config.clientEmail,
        privateKey: config.privateKey,
    });

    const app = getApps().length > 0 ? getApps()[0] : initializeApp({ credential });
    cachedApp = app;
    return app;
}

export function getServerFirestore(): Firestore | null {
    const app = ensureAdminApp();
    if (!app) {
        return null;
    }

    return getFirestore(app);
}
