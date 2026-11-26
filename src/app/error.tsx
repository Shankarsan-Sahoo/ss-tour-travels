"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-cream px-6 text-center">
      <h1 className="text-3xl font-bold text-navy">Something went wrong</h1>
      <p className="max-w-md text-fog">
        The page hit an unexpected bump. You can try again, or reach us directly at{" "}
        <a href="tel:+918327708096" className="font-semibold text-royal underline">
          +91 8327708096
        </a>
        .
      </p>
      <button
        onClick={reset}
        className="rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-cream transition hover:bg-navy-soft"
      >
        Try again
      </button>
    </div>
  );
}
