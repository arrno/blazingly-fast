import { getServerFirestore } from "@/lib/firebase/server";

type AddDocumentOptions = {
    id?: string;
};

export async function addDocument<T extends Record<string, unknown>>(
    collectionName: string,
    payload: T,
    options: AddDocumentOptions = {}
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
