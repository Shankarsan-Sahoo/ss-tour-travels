import { bookingSteps } from "@/config/site";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/animations/Reveal";

export default function BookingSteps() {
  return (
    <section className="bg-white py-20 lg:py-28" aria-labelledby="booking-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="booking-heading"
          eyebrow="How It Works"
          title="Booking Your Trip Is Easy"
          subtitle="Four simple steps between you and the road."
        />

        {/* Desktop: horizontal timeline */}
        <ol className="relative hidden gap-8 md:grid md:grid-cols-4">
          <span className="absolute top-7 right-[12%] left-[12%] h-px bg-border" aria-hidden="true" />
          {bookingSteps.map((s, i) => (
            <Reveal as="li" key={s.step} delay={i * 0.12} className="relative text-center">
              <span className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold bg-white text-sm font-extrabold text-navy">
                {s.step}
              </span>
              <h3 className="mt-5 text-base font-extrabold text-navy">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-[15rem] text-sm leading-relaxed text-fog">{s.description}</p>
            </Reveal>
          ))}
        </ol>

        {/* Mobile: vertical timeline */}
        <ol className="relative ml-4 space-y-8 border-l-2 border-border pl-8 md:hidden">
          {bookingSteps.map((s, i) => (
            <Reveal as="li" key={s.step} delay={i * 0.1} className="relative">
              <span className="absolute top-0 -left-[3.28rem] flex h-11 w-11 items-center justify-center rounded-full border-2 border-gold bg-white text-xs font-extrabold text-navy">
                {s.step}
              </span>
              <h3 className="pt-2 text-base font-extrabold text-navy">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-fog">{s.description}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
