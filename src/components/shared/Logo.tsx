import Image from "next/image";
import { cn } from "cn";

/**
 * Official SS Tour & Travels logo (supplied by the owner). The artwork already
 * contains the business name and tagline on a black field, so it is shown as a
 * rounded badge at a fixed 3:2 ratio and never stretched.
 */
export default function Logo({
  className,
  size = "md",
}: {
  className?: string;
  /** md for header and menu, lg for the footer. */
  size?: "md" | "lg";
  /** Kept for call-site compatibility; the artwork has its own background. */
  light?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src="/images/logo.jpg"
        alt="SS Tour & Travels - Your Journey. Our Passion."
        width={960}
        height={640}
        priority={size === "md"}
        sizes={size === "lg" ? "220px" : "(min-width: 640px) 96px, 84px"}
        className={cn(
          "w-auto rounded-lg object-contain",
          size === "lg" ? "h-36 sm:h-40" : "h-14 sm:h-16"
        )}
      />
    </span>
  );
}
