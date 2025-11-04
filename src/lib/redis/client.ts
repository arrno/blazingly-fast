import { createClient } from "redis";

let client: ReturnType<typeof createClient> | null = null;

const connectPromise = (async (): Promise<ReturnType<
    typeof createClient
> | null> => {
    try {
        client = createClient({ url: process.env.REDIS_URL });
        client.on("error", (err) => console.error("Redis error", err));
        await client.connect();
        return client;
    } catch (err) {
        console.log(`failed to initialize redis client. Err: ${err}`);
    }
    return null;
})();

export async function getRedis(): Promise<ReturnType<
    typeof createClient
> | null> {
    return connectPromise;
}
