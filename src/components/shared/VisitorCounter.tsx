"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users } from "lucide-react";

/**
 * Live visitor counter. Fetches aggregate stats from /api/analytics/count.
 * Renders nothing when Supabase is not configured - never a fake number.
 */
export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    let cancelled = false;
    fetch("/api/analytics/count")
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled && data?.configured && typeof data.uniqueVisitors === "number") {
          setCount(data.uniqueVisitors);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  if (count === null) return null;

  return (
    <div ref={ref} className="mt-6 inline-flex items-center gap-3 rounded-xl border border-cream/10 bg-cream/5 px-4 py-3">
      <Users className="h-4 w-4 text-gold" aria-hidden="true" />
      <div className="text-xs leading-tight text-cream/60">
        <motion.span
          className="block text-lg font-extrabold text-cream tabular-nums"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          {inView ? <AnimatedNumber value={count} /> : "0"}
        </motion.span>
        Visitors who explored our website
      </div>
    </div>
  );
}

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return <>{display.toLocaleString("en-IN")}</>;
}
