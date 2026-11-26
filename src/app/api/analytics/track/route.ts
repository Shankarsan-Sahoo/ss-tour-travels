import { NextResponse } from "next/server";
import { getRedis, KEYS, istDay } from "@/lib/redis";
import { isBot, isValidVisitorId, rateLimitKey, RATE_LIMITS } from "@/lib/analytics";

/**
 * POST /api/analytics/track
 * Counts an anonymous browser. SADD is atomic, so a browser ID is counted as
 * "unique" exactly once even under concurrent requests; a refresh or a second
 * visit from the same browser only raises the page-view total. No IP address
 * or any personal data is stored (the rate-limit key is a salted daily hash
 * that expires on its own).
 * Never breaks the page: failures answer tracked:false.
 */
export async function POST(request: Request) {
  const redis = getRedis();
  if (!redis) {
    return NextResponse.json({ tracked: false, configured: false }, { status: 200 });
  }

  const userAgent = request.headers.get("user-agent");
  if (isBot(userAgent)) {
    return NextResponse.json({ tracked: false }, { status: 200 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ tracked: false }, { status: 400 });
  }

  const vid = (body as { vid?: unknown })?.vid;
  const path = (body as { path?: unknown })?.path;
  if (!isValidVisitorId(vid) || typeof path !== "string" || path.length > 200 || !path.startsWith("/")) {
    return NextResponse.json({ tracked: false }, { status: 400 });
  }

  try {
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() ?? null;
    const day = new Date().toISOString().slice(0, 10);
    const rlKey = KEYS.rateLimit(day, rateLimitKey(ip, userAgent));

    // Daily cap per hashed identity: keeps a refresh storm or a script from
    // burning the free command allowance.
    const used = await redis.incr(rlKey);
    if (used === 1) await redis.expire(rlKey, 90_000);
    if (used > RATE_LIMITS.maxViewsPerIpPerDay) {
      return NextResponse.json({ tracked: false }, { status: 200 });
    }

    // Daily unique set (IST day): a browser counts once per day. Expires on its own.
    const dailyKey = KEYS.dailySet(istDay());
    const [added, , addedToday] = await Promise.all([
      redis.sadd(KEYS.uniqueSet, vid),
      redis.incr(KEYS.totalViews),
      redis.sadd(dailyKey, vid),
    ]);
    if (addedToday === 1) await redis.expire(dailyKey, 3 * 86_400);
    return NextResponse.json({ tracked: true, newVisitor: added === 1, newToday: addedToday === 1 }, { status: 200 });
  } catch {
    return NextResponse.json({ tracked: false }, { status: 200 });
  }
}
