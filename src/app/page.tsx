import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Destinations from "@/components/sections/Destinations";
import Services from "@/components/sections/Services";
import Experience from "@/components/sections/Experience";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import BookingSteps from "@/components/sections/BookingSteps";
import EnquirySection from "@/components/sections/EnquirySection";
import { isSupabaseConfigured } from "@/lib/supabase";
import ServiceAreas from "@/components/sections/ServiceAreas";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Destinations />
      <Services />
      <Experience />
      <WhyChooseUs />
      <ServiceAreas />
      <BookingSteps />
      <EnquirySection supabaseConfigured={isSupabaseConfigured} />
      <Contact />
    </>
  );
}
