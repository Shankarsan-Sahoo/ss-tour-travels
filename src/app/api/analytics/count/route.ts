import { NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

/**
 * GET /api/analytics/count
 * Returns aggregate visitor statistics. No per-visitor data is ever exposed.
 * When Supabase is not configured the route reports configured:false and the
 * counter component hides itself.
 */
export async function GET() {
  if (!isSupabaseConfigured) {
    return NextResponse.json({ configured: false }, { status: 200 });
  }

  const supabase = getSupabaseAdmin()!;
  try {
    const [{ count: uniqueVisitors, error: e1 }, { count: totalViews, error: e2 }] = await Promise.all([
      supabase.from("visitors").select("id", { count: "exact", head: true }),
      supabase.from("page_views").select("id", { count: "exact", head: true }),
    ]);
    if (e1 || e2) throw e1 ?? e2;

    return NextResponse.json(
      { configured: true, uniqueVisitors: uniqueVisitors ?? 0, totalViews: totalViews ?? 0 },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return NextResponse.json({ configured: false }, { status: 200 });
  }
}
