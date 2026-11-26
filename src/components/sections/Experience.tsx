"use client";

import { useEffect, useRef } from "react";
import SceneArt from "@/components/shared/SceneArt";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

/**
 * Cinematic editorial section - scroll-driven image movement via GSAP.
 */
export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const bigRef = useRef<HTMLDivElement>(null);
  const smallRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bigRef.current,
        { yPercent: -4 },
        {
          yPercent: 4,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 0.7 },
        }
      );
      gsap.fromTo(
        smallRef.current,
        { yPercent: 8 },
        {
          yPercent: -8,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 0.9 },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section id="about" ref={sectionRef} className="overflow-hidden bg-navy py-20 lg:py-28" aria-labelledby="experience-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <div ref={bigRef} className="absolute inset-x-0 -inset-y-[10%] will-change-transform">
                <SceneArt className="h-full w-full" />
              </div>
            </div>
            </div>

          <div className="order-1 lg:order-2">
            <p className="mb-3 text-xs font-bold tracking-[0.28em] text-gold uppercase">The Odisha Experience</p>
            <h2 id="experience-heading" className="text-3xl font-extrabold tracking-tight text-cream md:text-[2.6rem] md:leading-[1.1]">
              Every Destination Has a Story.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-cream/75 md:text-lg">
              Whether you&apos;re planning a family outing, a memorable picnic, or a journey across
              Odisha, we&apos;re here to make every mile comfortable.
            </p>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-cream/60">
              From the first phone call to the final drop, your trip is handled by people who drive
              these roads every week - and know exactly where the views are worth slowing down for.
            </p>
            <a
              href="#enquiry"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3.5 text-sm font-bold text-navy transition hover:bg-gold-soft"
            >
              Enquire About a Trip
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
