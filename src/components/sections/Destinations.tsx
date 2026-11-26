import { ArrowRight, Check, MapPin, Mountain } from "lucide-react";
import { cn } from "cn";
import { destinations } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/animations/Reveal";

const tones = [
  "radial-gradient(120% 90% at 20% 10%, #2b3f8f 0%, #16224f 55%, #0b1430 100%)",
  "radial-gradient(120% 90% at 80% 10%, #b45309 0%, #3b2a52 55%, #0b1430 100%)",
  "radial-gradient(120% 90% at 20% 90%, #166534 0%, #14325a 55%, #0b1430 100%)",
  "radial-gradient(120% 90% at 70% 20%, #1d4ed8 0%, #1b2a63 55%, #0b1430 100%)",
];

/**
 * Featured destinations in an asymmetric editorial grid:
 * Puri spans tall on the left, the others stagger around it.
 */
export default function Destinations() {
  return (
    <section id="destinations" className="bg-cream py-20 lg:py-28" aria-labelledby="destinations-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="destinations-heading"
          eyebrow="Featured Destinations"
          title="Discover the Beauty of Odisha"
          subtitle="From sacred temples to breathtaking mountain landscapes, explore Odisha's most memorable destinations."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          {destinations.map((d, i) => (
            <Reveal
              key={d.slug}
              delay={i * 0.1}
              className={cn(
                i === 0 && "lg:row-span-2",
                i === 3 && "lg:col-span-2"
              )}
            >
              <article
                className={cn(
                  "group relative h-full min-h-[320px] overflow-hidden rounded-2xl bg-navy",
                  i === 0 && "lg:min-h-[540px]"
                )}
              >
                <div
                  className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  style={{ background: tones[i % tones.length] }}
                  aria-hidden="true"
                >
                  <Mountain className="absolute -top-6 -right-6 h-56 w-56 text-cream/10" strokeWidth={1} />
                </div>
                <div
                  className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/25 to-transparent transition-opacity duration-500 group-hover:opacity-90"
                  aria-hidden="true"
                />

                <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6">
                  <p className="mb-1.5 inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.22em] text-gold-soft uppercase">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    Odisha
                  </p>
                  <h3 className="text-2xl font-extrabold text-cream">{d.name}</h3>
                  <p className="mt-1 text-sm text-cream/75">{d.tagline}</p>

                  <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                    {d.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-1.5 text-xs text-cream/70">
                        <Check className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={whatsappLink(`Hello SS Tour & Travels, I would like to explore ${d.name}. Please share trip options and pricing.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex translate-y-1 items-center gap-1.5 rounded-lg bg-cream/15 px-4 py-2 text-xs font-bold text-cream opacity-90 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:bg-gold group-hover:text-navy group-hover:opacity-100"
                    aria-label={`Explore ${d.name} trips on WhatsApp`}
                  >
                    Explore
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 text-center">
          <p className="text-sm text-fog">
            Koraput&apos;s valleys, Deomali&apos;s peaks, Chilika&apos;s waters, Daringbadi&apos;s mist -
            and every road in between.{" "}
            <a href="#enquiry" className="font-bold text-royal underline-offset-4 hover:underline">
              Ask about any Odisha destination
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
