"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Phone, Menu } from "lucide-react";
import { cn } from "cn";
import { site } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";
import Logo from "@/components/shared/Logo";
import MobileMenu from "@/components/layout/MobileMenu";

const sectionIds = site.nav.map((n) => n.href.slice(1));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const solid = scrolled || menuOpen;

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.21, 0.65, 0.35, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid ? "bg-cream/95 shadow-[0_1px_0_0_rgba(16,27,61,0.08)] backdrop-blur-md" : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <a href="#home" aria-label="SS Tour & Travels - home">
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {site.nav.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative rounded-md px-3.5 py-2 text-sm font-semibold transition-colors",
                    solid ? "text-navy hover:text-royal" : "text-cream/90 hover:text-cream",
                    isActive && (solid ? "text-royal" : "text-gold-soft")
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-left rounded-full bg-gold transition-transform duration-300",
                      isActive ? "scale-x-100" : "scale-x-0"
                    )}
                    aria-hidden="true"
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-2.5 lg:flex">
          <a
            href={site.contact.phonePrimaryHref}
            className={cn(
              "inline-flex h-9 items-center gap-1.5 rounded-lg border px-4 text-sm font-semibold transition-all outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
              solid
                ? "border-transparent bg-navy text-cream hover:bg-navy-soft"
                : "border-cream/40 bg-cream/10 text-cream hover:bg-cream/20"
            )}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call Now
          </a>
          <a
            href={whatsappLink(site.whatsappDefaultMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center rounded-lg bg-gold px-4 text-sm font-bold text-navy transition-colors hover:bg-gold-soft"
          >
            WhatsApp Enquiry
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-lg transition lg:hidden",
            solid ? "text-navy hover:bg-navy/5" : "text-cream hover:bg-cream/10"
          )}
        >
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </motion.header>
  );
}
