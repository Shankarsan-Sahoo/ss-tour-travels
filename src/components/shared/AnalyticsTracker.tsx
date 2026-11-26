"use client";

import { useEffect } from "react";

const VID_KEY = "sst_vid";
const SESSION_KEY = "sst_tracked";

/**
 * First-party anonymous visitor tracking.
 * - Mints a random anonymous ID stored in localStorage (no PII, no cookies).
 * - Sends at most one page-view ping per browser session, so refreshing the
 *   page never inflates the count.
 * - Silently no-ops when the visitor store is not configured server-side.
 */
export default function AnalyticsTracker() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
      let vid = localStorage.getItem(VID_KEY);
      if (!vid || !/^[a-f0-9-]{36}$/.test(vid)) {
        vid = crypto.randomUUID();
        localStorage.setItem(VID_KEY, vid);
      }
      sessionStorage.setItem(SESSION_KEY, "1");
      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vid, path: window.location.pathname }),
        keepalive: true,
      }).catch(() => {});
    } catch {
      // Storage blocked (private mode etc.) - skip tracking entirely.
    }
  }, []);

  return null;
}
