import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-cream px-6 text-center">
      <p className="text-sm font-semibold tracking-[0.3em] text-gold uppercase">404</p>
      <h1 className="text-4xl font-bold text-navy">This road doesn&apos;t exist</h1>
      <p className="max-w-md text-fog">
        The page you are looking for has moved or never existed. Let&apos;s get you back on route.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-cream transition hover:bg-navy-soft"
      >
        Back to home
      </Link>
    </div>
  );
}
