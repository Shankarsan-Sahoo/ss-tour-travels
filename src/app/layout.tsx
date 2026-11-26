import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { site } from "@/config/site";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/shared/WhatsAppFloat";
import BackToTop from "@/components/shared/BackToTop";
import AnalyticsTracker from "@/components/shared/AnalyticsTracker";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Tours, Travels & Vehicle Rental in Odisha`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Tours, Travels & Vehicle Rental in Odisha`,
    description: site.description,
    images: [{ url: "/images/logo.jpg", width: 960, height: 640, alt: "SS Tour & Travels - Your Journey. Our Passion." }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Tours, Travels & Vehicle Rental in Odisha`,
    description: site.description,
    images: ["/images/logo.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#101b3d",
  width: "device-width",
  initialScale: 1,
};

/** LocalBusiness structured data - only verified business facts. */
function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.contact.phonePrimary.replace(/\s/g, ""),
    areaServed: { "@type": "State", name: "Odisha", containedInPlace: { "@type": "Country", name: "India" } },
    contactPoint: [
      { "@type": "ContactPoint", telephone: "+918327708096", contactType: "reservations", availableLanguage: ["en", "or", "hi"] },
      { "@type": "ContactPoint", telephone: "+918144142094", contactType: "reservations", availableLanguage: ["en", "or", "hi"] },
    ],
    knowsAbout: site.keywords,
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-cream text-ink">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }} />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <BackToTop />
        <AnalyticsTracker />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
