import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Destinations from "@/components/sections/Destinations";
import Services from "@/components/sections/Services";
import Experience from "@/components/sections/Experience";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import BookingSteps from "@/components/sections/BookingSteps";
import Gallery from "@/components/sections/Gallery";
import EnquirySection from "@/components/sections/EnquirySection";
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
      <BookingSteps />
      <Gallery />
      <EnquirySection />
      <Contact />
    </>
  );
}
