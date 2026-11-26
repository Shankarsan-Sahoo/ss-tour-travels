"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CalendarCheck, ChevronDown, MapPin, Phone } from "lucide-react";
import { site } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.25 } },
};
const item = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.21, 0.65, 0.35, 1] as const } },
};

export default function Hero() {
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !imageWrapRef.current || !sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(imageWrapRef.current, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section id="home" ref={sectionRef} className="hero-grain relative flex min-h-[100svh] items-end overflow-hidden bg-navy-deep">
      {/* Cinematic background with GSAP parallax */}
      <div ref={imageWrapRef} className="absolute inset-x-0 -inset-y-[16%] will-change-transform">
        <Image
          src="/images/hero.jpg"
          alt="The mountain landscape of Deomali, Odisha's highest peak, at dawn"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/55 to-navy-deep/20" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/70 via-transparent to-transparent" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-36 pb-28 sm:px-6 md:pb-36 lg:px-8">
        <motion.div variants={container} initial="hidden" animate="visible" className="max-w-3xl">
          <motion.p
            variants={item}
            className="mb-5 inline-flex items-center gap-3 text-xs font-bold tracking-[0.32em] text-gold-soft uppercase"
          >
            <span className="h-px w-10 bg-gold" aria-hidden="true" />
            Explore Odisha with Comfort
          </motion.p>

          <motion.h1
            variants={item}
            className="text-[2.75rem] leading-[1.02] font-extrabold tracking-tight text-cream sm:text-6xl lg:text-7xl"
          >
            Your Journey.
            <br />
            <span className="text-gold-soft">Our Passion.</span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg">
            Discover beautiful destinations, create unforgettable memories, and travel comfortably
            with {site.name}.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3.5">
            <a
              href="#destinations"
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-7 py-3.5 text-sm font-bold text-navy shadow-[0_10px_30px_rgba(234,179,8,0.35)] transition hover:bg-gold-soft"
            >
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Explore Destinations
            </a>
            <a
              href="#enquiry"
              className="inline-flex items-center gap-2 rounded-lg border border-cream/35 bg-cream/10 px-7 py-3.5 text-sm font-bold text-cream backdrop-blur-sm transition hover:bg-cream/20"
            >
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              Book Your Journey
            </a>
          </motion.div>

          <motion.p variants={item} className="mt-7 inline-flex items-center gap-2.5 text-sm text-cream/75">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold" />
            </span>
            {site.availability}
          </motion.p>
        </motion.div>
      </div>

      {/* Floating booking information panel */}
      <motion.aside
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8, ease: [0.21, 0.65, 0.35, 1] }}
        className="absolute right-4 bottom-28 z-10 hidden w-72 rounded-2xl border border-cream/15 bg-navy/70 p-5 backdrop-blur-md sm:right-6 lg:right-8 xl:block"
        aria-label="Quick booking information"
      >
        <p className="text-xs font-bold tracking-[0.24em] text-gold uppercase">Plan a trip today</p>
        <a href={site.contact.phonePrimaryHref} className="mt-3 flex items-center gap-3 rounded-lg bg-cream/10 px-3.5 py-3 transition hover:bg-cream/15">
          <Phone className="h-4 w-4 shrink-0 text-gold-soft" aria-hidden="true" />
          <span className="text-sm font-bold text-cream">{site.contact.phonePrimary}</span>
        </a>
        <a
          href={whatsappLink(site.whatsappDefaultMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2.5 flex items-center justify-center gap-2 rounded-lg bg-gold px-3.5 py-3 text-sm font-bold text-navy transition hover:bg-gold-soft"
        >
          WhatsApp Enquiry
        </a>
        <p className="mt-3 text-center text-[11px] leading-relaxed text-cream/55">
          Picnics &middot; Family tours &middot; Weddings &middot; Outstation
        </p>
      </motion.aside>

      {/* Scroll indicator */}
      <motion.a
        href="#trust"
        aria-label="Scroll to explore"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-cream/60 transition hover:text-cream md:flex"
      >
        <span className="text-[10px] font-semibold tracking-[0.3em] uppercase">Scroll</span>
        <motion.span animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}>
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </motion.a>
    </section>
  );
}
