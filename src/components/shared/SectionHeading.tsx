import { cn } from "cn";
import Reveal from "@/components/animations/Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
  id?: string;
}

export default function SectionHeading({ eyebrow, title, subtitle, align = "center", dark = false, id }: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "mb-12 max-w-2xl md:mb-16",
        align === "center" ? "mx-auto text-center" : "text-left"
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-bold tracking-[0.28em] text-gold uppercase">{eyebrow}</p>
      )}
      <h2
        id={id}
        className={cn(
          "text-3xl font-extrabold tracking-tight text-balance md:text-[2.6rem] md:leading-[1.1]",
          dark ? "text-cream" : "text-navy"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-4 text-base leading-relaxed md:text-lg", dark ? "text-cream/70" : "text-fog")}>
          {subtitle}
        </p>
      )}
      <span
        className={cn(
          "mt-6 block h-[3px] w-14 rounded-full bg-gold",
          align === "center" && "mx-auto"
        )}
        aria-hidden="true"
      />
    </Reveal>
  );
}
