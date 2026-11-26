import { HandHeart, Map, MessagesSquare, PhoneCall, SlidersHorizontal, UsersRound } from "lucide-react";
import { whyChooseUs } from "@/config/site";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/animations/Reveal";

const iconMap = {
  "phone-call": PhoneCall,
  "hand-heart": HandHeart,
  "sliders-horizontal": SlidersHorizontal,
  map: Map,
  "users-round": UsersRound,
  "messages-square": MessagesSquare,
} as const;

export default function WhyChooseUs() {
  return (
    <section className="bg-cream py-20 lg:py-28" aria-labelledby="why-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="why-heading"
          eyebrow="Why Choose Us"
          title="Travel With Confidence"
          subtitle="The things our travellers count on, trip after trip."
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item, i) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <Reveal as="li" key={item.title} delay={i * 0.07}>
                <div className="group h-full rounded-2xl border border-border bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_18px_40px_-20px_rgba(16,27,61,0.3)]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-navy">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-base font-extrabold text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fog">{item.description}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
