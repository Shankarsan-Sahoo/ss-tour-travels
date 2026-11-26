import { createHash } from "crypto";

/**
 * Visitor analytics helpers (server side only).
 *
 * Privacy design:
 * - Visitors are identified by a random, anonymous first-party ID generated
 *   in their browser (no personal data, no fingerprinting).
 * - IPs are never stored; a salted daily hash is used only for rate limiting.
 * - Bots and automated requests are filtered before anything is written.
 */

const BOT_PATTERN =
  /bot|crawl|spider|slurp|bingpreview|facebookexternal|headless|phantom|lighthouse|pingdom|uptime|scrapy|curl|wget|python-requests|httpclient/i;

export function isBot(userAgent: string | null): boolean {
  if (!userAgent) return true;
  return BOT_PATTERN.test(userAgent);
}

/** Anonymous daily rate-limit key. Not reversible to an IP, expires daily. */
export function rateLimitKey(ip: string | null, userAgent: string | null): string {
  const day = new Date().toISOString().slice(0, 10);
  const salt = process.env.ANALYTICS_SALT ?? "sstour-static-salt";
  return createHash("sha256").update(`${salt}|${day}|${ip ?? "unknown"}|${userAgent ?? ""}`).digest("hex");
}

/** Anonymous visitor IDs are uuid-like tokens minted client-side. */
export function isValidVisitorId(vid: unknown): vid is string {
  return typeof vid === "string" && /^[a-f0-9-]{36}$/.test(vid);
}

/** Per-identity daily write caps: a refresh storm can never inflate counts. */
export const RATE_LIMITS = {
  maxViewsPerIpPerDay: 60,
  minSecondsBetweenViewsSameVisitor: 30,
} as const;
