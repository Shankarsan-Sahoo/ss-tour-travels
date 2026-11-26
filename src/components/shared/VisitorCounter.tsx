"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users } from "lucide-react";

/**
 * Live visitor counter. Fetches aggregate stats from /api/analytics/count.
 * Renders nothing when the counter store is unavailable - never a fake number.
 * Counts unique browsers internally (an estimate, not unique people).
 */
export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [today, setToday] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    let cancelled = false;
    fetch("/api/analytics/count")
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled && data?.configured && typeof data.uniqueVisitors === "number") {
          setCount(data.uniqueVisitors);
          setToday(typeof data.todayVisitors === "number" ? data.todayVisitors : 0);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  if (count === null) return null;

  return (
    <div>
    <div ref={ref} className="mt-4 inline-flex items-center gap-4 rounded-xl border border-cream/10 bg-cream/5 px-4 py-3">
      <Users className="h-4 w-4 text-gold" aria-hidden="true" />
      <div className="text-xs leading-tight text-cream/60">
        <motion.span
          className="block text-lg font-extrabold text-cream tabular-nums"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          {inView ? <AnimatedNumber value={today} /> : "0"}
        </motion.span>
        Visitors Today
      </div>
      <div className="h-8 w-px bg-cream/15" aria-hidden="true" />
      <div className="text-xs leading-tight text-cream/60">
        <motion.span
          className="block text-lg font-extrabold text-cream tabular-nums"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          {inView ? <AnimatedNumber value={count} /> : "0"}
        </motion.span>
        Total Visitors
      </div>
    </div>
    <p className="mt-1 text-[11px] text-cream/40">Estimated</p>
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
