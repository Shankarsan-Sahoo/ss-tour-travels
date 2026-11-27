import { MapPin } from "lucide-react";
import { serviceAreas, site } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/animations/Reveal";

export default function ServiceAreas() {
  return (
    <section id="areas" className="bg-white py-20 lg:py-28" aria-labelledby="areas-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="areas-heading"
          eyebrow="Service Areas"
          title="Travel Services in Bahadajhola, Odagaon, Nayagarh and Bhubaneswar"
          subtitle={`${site.name} arranges picnic, family, group, wedding and outstation travel for these areas and across Odisha.`}
        />
        <ul className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {serviceAreas.map((a, i) => (
            <li key={a.name}>
              <Reveal delay={i * 0.05}>
                <div className="flex h-full flex-col items-center rounded-2xl border border-border bg-cream p-6 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-gold">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg font-extrabold text-navy">{a.name}</h3>
                  <p className="mt-2 text-sm text-fog">{a.detail}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center text-sm text-fog">
          Looking for a car or tour from your village or town?{" "}
          <a
            href={whatsappLink("Hello SS Tour & Travels, I need a trip from my location. Please share options and pricing.")}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-royal hover:underline"
          >
            WhatsApp us your pickup point
          </a>
          .
        </p>
      </div>
    </section>
  );
}
