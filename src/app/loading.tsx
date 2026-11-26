export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy">
      <div className="flex flex-col items-center gap-4" role="status" aria-label="Loading">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-gold border-t-transparent" />
        <p className="text-sm tracking-widest text-cream/70 uppercase">SS Tour &amp; Travels</p>
      </div>
    </div>
  );
}
