import { CalendarCheck, MessageCircle, Phone } from "lucide-react";
import { site } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/animations/Reveal";

export default function Contact() {
  return (
    <section id="contact" className="bg-cream py-20 lg:py-28" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="contact-heading"
          eyebrow="Contact"
          title="Your Next Journey Starts Here."
          subtitle={`Reach ${site.name} directly - call or WhatsApp, and we'll take it from there.`}
        />

        <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-3">
          <Reveal>
            <a
              href={site.contact.phonePrimaryHref}
              className="group flex h-full flex-col items-center rounded-2xl border border-border bg-white p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_18px_40px_-20px_rgba(16,27,61,0.3)]"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-navy text-gold transition-colors group-hover:bg-gold group-hover:text-navy">
                <Phone className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-extrabold text-navy">Call Now</h3>
              <p className="mt-2 text-sm font-semibold text-royal">{site.contact.phonePrimary}</p>
              <p className="mt-1 text-xs text-fog">Fastest way to plan your trip</p>
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <a
              href={whatsappLink(site.whatsappDefaultMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col items-center rounded-2xl border border-border bg-white p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_18px_40px_-20px_rgba(16,27,61,0.3)]"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white transition-transform group-hover:scale-105">
                <MessageCircle className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-extrabold text-navy">WhatsApp Us</h3>
              <p className="mt-2 text-sm font-semibold text-royal">{site.contact.whatsappDisplay}</p>
              <p className="mt-1 text-xs text-fog">Send your dates and destination anytime</p>
            </a>
          </Reveal>

          <Reveal delay={0.2}>
            <a
              href="#enquiry"
              className="group flex h-full flex-col items-center rounded-2xl border border-border bg-white p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_18px_40px_-20px_rgba(16,27,61,0.3)]"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-navy transition-transform group-hover:scale-105">
                <CalendarCheck className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-extrabold text-navy">Enquire Now</h3>
              <p className="mt-2 text-sm font-semibold text-royal">Online enquiry form</p>
              <p className="mt-1 text-xs text-fog">Two minutes, sent on WhatsApp</p>
            </a>
          </Reveal>
        </div>

        <Reveal className="mx-auto mt-10 max-w-4xl">
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-navy px-8 py-6 sm:flex-row">
            <p className="text-center text-sm text-cream/80 sm:text-left">
              <span className="font-extrabold text-cream">{site.name}</span>
              <span className="mx-2 text-cream/40">&middot;</span>
              {site.availability}
            </p>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm">
              <a href={site.contact.phonePrimaryHref} className="font-bold text-gold-soft hover:text-gold">
                {site.contact.phonePrimary}
              </a>
              <a href={site.contact.phoneSecondaryHref} className="font-bold text-gold-soft hover:text-gold">
                {site.contact.phoneSecondary}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
