import { Redis } from "@upstash/redis";

let client: Redis | null = null;

export function getRedisInstance(): Redis | null {
    if (client) {
        return client;
    }
    try {
        client = Redis.fromEnv();
        return client;
    } catch (err) {
        console.warn("Failed to initialize Upstash Redis client", err);
        return null;
    }
}

export async function getRedis(): Promise<Redis | null> {
    return getRedisInstance();
}
