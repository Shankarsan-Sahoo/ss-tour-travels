import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client.
 *
 * The service-role key is used ONLY inside API routes (server side) and is
 * never exposed to the browser. When the environment variables are absent the
 * site still works: enquiries fall back to WhatsApp delivery and the visitor
 * counter hides itself.
 */

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseConfigured = Boolean(url && serviceRoleKey);

let client: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  if (!client) {
    client = createClient(url!, serviceRoleKey!, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return client;
}
