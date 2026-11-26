import { Baby, CalendarCheck, MapPinned, Route, Sparkles } from "lucide-react";
import Reveal from "@/components/animations/Reveal";

const highlights = [
  { icon: Baby, label: "Family-Friendly Travel" },
  { icon: MapPinned, label: "Local & Outstation" },
  { icon: Route, label: "Group Transportation" },
  { icon: CalendarCheck, label: "Easy Booking" },
  { icon: Sparkles, label: "Comfortable Journeys" },
];

export default function TrustBar() {
  return (
    <section id="trust" aria-label="Service highlights" className="border-b border-border bg-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-6 py-10 sm:grid-cols-3 lg:grid-cols-5">
          {highlights.map(({ icon: Icon, label }, i) => (
            <Reveal as="li" key={label} delay={i * 0.07} className="group flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy/[0.06] text-royal transition-colors duration-300 group-hover:bg-gold group-hover:text-navy">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-sm font-bold text-navy">{label}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
