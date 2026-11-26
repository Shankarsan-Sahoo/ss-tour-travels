import { cn } from "cn";

/**
 * Original minimal travel-inspired brand mark:
 * a rising sun over two mountain ridges, inside a rounded square.
 */
export default function Logo({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 40 40"
        className="h-9 w-9 shrink-0"
        role="img"
        aria-label="SS Tour & Travels logo"
      >
        <rect width="40" height="40" rx="10" className={light ? "fill-cream" : "fill-navy"} />
        <circle cx="20" cy="15" r="4.6" className="fill-gold" />
        <path
          d="M7 30 L15.5 18.5 L20 24 L24.5 17 L33 30 Z"
          className={light ? "fill-navy" : "fill-cream"}
          opacity="0.95"
        />
        <rect x="7" y="32" width="26" height="1.8" rx="0.9" className="fill-gold" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={cn("text-[15px] font-extrabold tracking-tight", light ? "text-cream" : "text-navy")}>
          SS Tour &amp; Travels
        </span>
        <span className={cn("mt-1 text-[10px] font-semibold tracking-[0.22em] uppercase", light ? "text-gold-soft" : "text-royal")}>
          Explore Odisha
        </span>
      </span>
    </span>
  );
}
