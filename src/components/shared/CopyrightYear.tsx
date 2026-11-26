"use client";

import { useEffect, useState } from "react";

/** Current year, generated on the client so prerendering stays stable. */
export default function CopyrightYear() {
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => {
    const id = requestAnimationFrame(() => setYear(new Date().getFullYear()));
    return () => cancelAnimationFrame(id);
  }, []);
  return <>{year ?? ""}</>;
}
