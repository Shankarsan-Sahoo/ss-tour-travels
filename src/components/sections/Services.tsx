import Image from "next/image";
import { ArrowUpRight, Bus, HandHeart, Heart, MapPin, Route, Trees, Users } from "lucide-react";
import { cn } from "cn";
import { services } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/animations/Reveal";

const iconMap = {
  trees: Trees,
  users: Users,
  bus: Bus,
  heart: Heart,
  "map-pin": MapPin,
  route: Route,
  "hand-heart": HandHeart,
} as const;

export default function Services() {
  const marriage = services.find((s) => s.featured)!;
  const rest = services.filter((s) => !s.featured);
  const MarriageIcon = iconMap[marriage.icon as keyof typeof iconMap];

  return (
    <section id="services" className="bg-white py-20 lg:py-28" aria-labelledby="services-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="services-heading"
          eyebrow="What We Do"
          title="Travel Made Simple. Memories Made Forever."
          subtitle="Every journey is planned around you - the destination, the date, the group, and the occasion."
        />

        {/* Marriage programme transportation - special editorial treatment */}
        <Reveal className="mb-6">
          <article className="group grid overflow-hidden rounded-2xl bg-navy lg:grid-cols-2">
            <div className="relative min-h-[280px] overflow-hidden lg:min-h-[380px]">
              <Image
                src={marriage.image}
                alt={marriage.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-navy/30" aria-hidden="true" />
            </div>
            <div className="relative flex flex-col justify-center p-8 lg:p-12">
              <span className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold" aria-hidden="true">
                <MarriageIcon className="h-6 w-6" />
              </span>
              <p className="text-xs font-bold tracking-[0.28em] text-gold-soft uppercase">Special Occasions</p>
              <h3 className="mt-3 text-2xl font-extrabold text-cream lg:text-3xl">{marriage.title}</h3>
              <p className="mt-4 max-w-md leading-relaxed text-cream/75">{marriage.description}</p>
              <p className="mt-4 text-sm leading-relaxed text-cream/60">
                From the baraat to the last guest dropped home - we coordinate vehicles and timings so
                your celebration runs exactly as planned.
              </p>
              <div className="mt-7">
                <a
                  href={whatsappLink("Hello SS Tour & Travels, we are planning a marriage programme and need transportation. Please share options and pricing.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-bold text-navy transition hover:bg-gold-soft"
                >
                  Enquire Now
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </article>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((s, i) => {
            const Icon = iconMap[s.icon as keyof typeof iconMap];
            return (
              <Reveal key={s.slug} delay={i * 0.08}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-cream transition-shadow duration-300 hover:shadow-[0_18px_44px_-18px_rgba(16,27,61,0.35)]">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={s.image}
                      alt={s.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                    <span className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-cream/90 text-navy shadow-sm backdrop-blur-sm" aria-hidden="true">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-extrabold text-navy">{s.title}</h3>
                    <p className="mt-2.5 flex-1 text-sm leading-relaxed text-fog">{s.description}</p>
                    <a
                      href={whatsappLink(`Hello SS Tour & Travels, I am interested in ${s.title.toLowerCase()}. Please share options and pricing.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-bold text-royal",
                        "underline-offset-4 transition hover:text-navy hover:underline"
                      )}
                      aria-label={`Enquire about ${s.title} on WhatsApp`}
                    >
                      Enquire Now
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
