import { Phone } from "lucide-react";
import { destinations, imageCredits, services, site } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";
import Logo from "@/components/shared/Logo";
import VisitorCounter from "@/components/shared/VisitorCounter";
import CopyrightYear from "@/components/shared/CopyrightYear";

export default function Footer() {

  return (
    <footer className="bg-navy-deep text-cream">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo light />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/60">
              Comfortable, dependable travel across Odisha - picnics, family tours, group journeys,
              wedding transportation and outstation trips.
            </p>
            <VisitorCounter />
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="text-sm font-bold tracking-[0.2em] text-gold uppercase">Explore</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-cream/70 transition hover:text-gold-soft">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer destinations and services">
            <h3 className="text-sm font-bold tracking-[0.2em] text-gold uppercase">Destinations</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {destinations.map((d) => (
                <li key={d.slug}>
                  <a href="#destinations" className="text-cream/70 transition hover:text-gold-soft">
                    {d.name}
                  </a>
                </li>
              ))}
            </ul>
            <h3 className="mt-8 text-sm font-bold tracking-[0.2em] text-gold uppercase">Services</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.slice(0, 4).map((s) => (
                <li key={s.slug}>
                  <a href="#services" className="text-cream/70 transition hover:text-gold-soft">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-sm font-bold tracking-[0.2em] text-gold uppercase">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={site.contact.phonePrimaryHref} className="flex items-center gap-2 text-cream/70 transition hover:text-gold-soft">
                  <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {site.contact.phonePrimary}
                </a>
              </li>
              <li>
                <a href={site.contact.phoneSecondaryHref} className="flex items-center gap-2 text-cream/70 transition hover:text-gold-soft">
                  <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {site.contact.phoneSecondary}
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink(site.whatsappDefaultMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-gold px-4 py-2.5 font-bold text-navy transition hover:bg-gold-soft"
                >
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-cream/10 pt-6">
          <p className="text-xs leading-relaxed text-cream/40">{imageCredits}</p>
          <p className="mt-2 text-sm text-cream/60">
            &copy; <CopyrightYear /> {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
