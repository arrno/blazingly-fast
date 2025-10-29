import { Project, Status } from "../src/app/domain/projects";
import { FieldValue } from "firebase-admin/firestore";
import { getServerFirestore } from "../src/lib/firebase/server";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { existsSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envCandidates = [
    resolve(process.cwd(), ".env.local"),
    resolve(process.cwd(), ".env"),
    resolve(__dirname, "../.env.local"),
    resolve(__dirname, "../.env"),
];

for (const candidate of envCandidates) {
    if (!existsSync(candidate)) {
        continue;
    }

    dotenv.config({ path: candidate, quiet: true });
    break;
}

const requiredEnvVars = [
    "FIREBASE_PROJECT_ID",
    "FIREBASE_CLIENT_EMAIL",
    "FIREBASE_PRIVATE_KEY",
];

const missingEnv = requiredEnvVars.filter((key) => !process.env[key]);
if (missingEnv.length > 0) {
    throw new Error(
        `Missing required Firebase admin env vars (${missingEnv.join(
            ", "
        )}). ` + "Ensure .env.local is reachable from seed.ts."
    );
}

const seed = async () => {
    for (let i = 0; i < 47; i++) {
        console.log(`seeding doc ${i}`);

        const project: Project = {
            blurb: "woop woop",
            certifiedDate: new Date(),
            certifiedOn: "Oct 23, 2025",
            exists: true,
            id: `arrno@project_${i}`,
            maintainer: "arrno",
            name: `Project ${i}`,
            repository: "github.com/arrno/gliter",
            status: Status.Fast,
        };

        const now = new Date();
        const docId = `arrno@test_${i}_${i}_${i}`;

        const payload = {
            ...project,
            certifiedDate: now,
            github: {
                description:
                    "Go-lang-iter tools aims to make it easier to compose complex async systems in Go.",
                forks: 0,
                fullName: "arrno/gliter",
                htmlUrl: "https://github.com/arrno/gliter",
                id: 900338380,
                lastPushedAt: "2025-10-19T15:53:39Z",
                openIssues: 0,
                stars: 62,
            },
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp(),
        };

        await addDocument("projects", payload, { id: docId });
    }
};

export async function addDocument<T extends Record<string, unknown>>(
    collectionName: string,
    payload: T,
    options: { id?: string } = {}
): Promise<string> {
    const firestore = getServerFirestore();
    if (!firestore) {
        throw new Error("Missing Firebase admin configuration");
    }

    const collectionRef = firestore.collection(collectionName);

    if (options.id) {
        await collectionRef.doc(options.id).set(payload);
        return options.id;
    }

    const docRef = await collectionRef.add(payload);
    return docRef.id;
}

seed();
