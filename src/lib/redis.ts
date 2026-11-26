import { Redis } from "@upstash/redis";

/**
 * Server-only Redis client (Upstash Redis, installed through the Vercel
 * Marketplace). The integration injects KV_REST_API_URL / KV_REST_API_TOKEN;
 * the UPSTASH_* names are accepted as a fallback. When neither pair exists the
 * site keeps working and the visitor counter simply stays hidden.
 */
const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

export const isRedisConfigured = Boolean(url && token);

let client: Redis | null = null;

export function getRedis(): Redis | null {
  if (!isRedisConfigured) return null;
  if (!client) client = new Redis({ url: url!, token: token!, retry: { retries: 1 } });
  return client;
}

/**
 * Keys are namespaced by deployment environment so preview deployments and
 * local tests can never change the real production visitor numbers.
 */
export const KEY_PREFIX = process.env.VERCEL_ENV === "production" || process.env.SST_COUNTER_NS === "prod" ? "sst:v1" : "sst:test";

export const KEYS = {
  uniqueSet: `${KEY_PREFIX}:visitors`,
  totalViews: `${KEY_PREFIX}:views`,
  rateLimit: (day: string, hash: string) => `${KEY_PREFIX}:rl:${day}:${hash}`,
} as const;
