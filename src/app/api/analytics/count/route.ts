import { NextResponse } from "next/server";
import { getRedis, KEYS, istDay } from "@/lib/redis";

/**
 * GET /api/analytics/count
 * Returns aggregate numbers only. The response is cached at the edge for a
 * minute, so the footer counter costs at most about two Redis commands per
 * minute no matter how many people open the site.
 * When Redis is missing or errors, it answers configured:false and the footer
 * hides the counter: never a made-up number.
 */
export async function GET() {
  const redis = getRedis();
  if (!redis) {
    return NextResponse.json({ configured: false }, { status: 200 });
  }
  try {
    const day = istDay();
    const [uniqueVisitors, todayVisitors, totalViews] = await Promise.all([
      redis.scard(KEYS.uniqueSet),
      redis.scard(KEYS.dailySet(day)),
      redis.get<number>(KEYS.totalViews),
    ]);
    return NextResponse.json(
      { configured: true, day, todayVisitors, uniqueVisitors, totalViews: Number(totalViews ?? 0) },
      { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } }
    );
  } catch {
    return NextResponse.json({ configured: false }, { status: 200, headers: { "Cache-Control": "no-store" } });
  }
}
