import { Firestore, getFirestore } from "firebase/firestore";
import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";

type FirebaseClientConfig = {
    apiKey?: string;
    authDomain?: string;
    projectId?: string;
    storageBucket?: string;
    messagingSenderId?: string;
    appId?: string;
};

function getConfig(): FirebaseClientConfig | null {
    const config: FirebaseClientConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };

    if (!config.apiKey || !config.projectId || !config.appId) {
        return null;
    }

    return config;
}

let cachedApp: FirebaseApp | null = null;

function ensureClientApp(): FirebaseApp | null {
    if (cachedApp) {
        return cachedApp;
    }

    const config = getConfig();
    if (!config) {
        return null;
    }

    const app = getApps().length > 0 ? getApp() : initializeApp(config);
    cachedApp = app;
    return app;
}

export function getClientFirestore(): Firestore | null {
    const app = ensureClientApp();
    if (!app) {
        return null;
    }

    return getFirestore(app);
}
