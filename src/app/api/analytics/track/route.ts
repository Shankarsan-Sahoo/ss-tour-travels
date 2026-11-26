import { NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { isBot, isValidVisitorId, rateLimitKey, RATE_LIMITS } from "@/lib/analytics";

/**
 * POST /api/analytics/track
 * Records a page view for an anonymous visitor. Fails silently from the
 * client's perspective: analytics must never break the page, and this
 * endpoint reveals nothing about whether the database accepted a write.
 */
export async function POST(request: Request) {
  if (!isSupabaseConfigured) {
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

  const supabase = getSupabaseAdmin()!;
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() ?? null;
  const rlKey = rateLimitKey(ip, userAgent);

  try {
    // Rate limit: cap daily writes per hashed identity.
    const today = new Date().toISOString().slice(0, 10);
    const { count: todayCount } = await supabase
      .from("page_views")
      .select("id", { count: "exact", head: true })
      .eq("rl_key", rlKey)
      .gte("created_at", today);
    if ((todayCount ?? 0) >= RATE_LIMITS.maxViewsPerIpPerDay) {
      return NextResponse.json({ tracked: false }, { status: 200 });
    }

    // Throttle: ignore rapid repeat views from the same visitor.
    const since = new Date(Date.now() - RATE_LIMITS.minSecondsBetweenViewsSameVisitor * 1000).toISOString();
    const { count: recent } = await supabase
      .from("page_views")
      .select("id", { count: "exact", head: true })
      .eq("visitor_id", vid)
      .gte("created_at", since);
    if ((recent ?? 0) > 0) {
      return NextResponse.json({ tracked: false }, { status: 200 });
    }

    // Upsert the anonymous visitor (first visit creates the row; a refresh
    // only bumps last_seen and never creates a new "unique" visitor).
    const now = new Date().toISOString();
    const { error: visitorError } = await supabase.from("visitors").upsert(
      { id: vid, first_seen_at: now, last_seen_at: now },
      { onConflict: "id", ignoreDuplicates: true }
    );
    if (visitorError) throw visitorError;
    await supabase.from("visitors").update({ last_seen_at: now }).eq("id", vid);

    const { error: viewError } = await supabase
      .from("page_views")
      .insert({ visitor_id: vid, path, rl_key: rlKey });
    if (viewError) throw viewError;

    return NextResponse.json({ tracked: true }, { status: 200 });
  } catch {
    return NextResponse.json({ tracked: false }, { status: 200 });
  }
}
