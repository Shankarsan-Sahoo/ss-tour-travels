import Image from "next/image";
import { cn } from "cn";

/**
 * Official SS Tour & Travels logo (supplied by the owner). The artwork already
 * contains the business name and tagline on a black field, so it is shown
 * at its natural ratio and never stretched. The black field is transparent in logo.png (the original logo.jpg stays for social previews), so it sits cleanly on the dark header, menu and footer.
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
        src="/images/logo.png"
        alt="SS Tour & Travels - Your Journey. Our Passion."
        width={950}
        height={612}
        priority={size === "md"}
        sizes={size === "lg" ? "220px" : "(min-width: 640px) 96px, 84px"}
        className={cn(
          "w-auto object-contain",
          size === "lg" ? "h-36 sm:h-40" : "h-[4.25rem] sm:h-[4.25rem]"
        )}
      />
    </span>
  );
}
