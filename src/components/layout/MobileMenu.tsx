"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, X } from "lucide-react";
import { site } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";
import Logo from "@/components/shared/Logo";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  // Render at document.body: the header's backdrop-filter would otherwise
  // contain this fixed overlay to the header box.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="absolute inset-0 bg-navy-deep/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-y-0 right-0 flex w-[84%] max-w-sm flex-col bg-navy shadow-2xl"
          >
            <div className="flex h-[4.5rem] items-center justify-between border-b border-cream/10 px-5">
              <Logo />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-cream hover:bg-cream/10"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <ul className="flex flex-col gap-1 px-5 py-6">
              {site.nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.35 }}
                >
                  <a
                    href={item.href}
                    onClick={onClose}
                    className="block rounded-lg px-4 py-3.5 text-lg font-semibold text-cream transition hover:bg-cream/10 hover:text-gold-soft"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="mt-auto flex flex-col gap-3 border-t border-cream/10 p-5">
              <a
                href={site.contact.phonePrimaryHref}
                className="flex items-center justify-center gap-2 rounded-lg bg-cream px-4 py-3.5 text-sm font-bold text-navy"
              >
                <Phone className="h-4 w-4" />
                Call {site.contact.phonePrimary}
              </a>
              <a
                href={whatsappLink(site.whatsappDefaultMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg bg-gold px-4 py-3.5 text-sm font-bold text-navy"
              >
                WhatsApp Enquiry
              </a>
              <p className="pt-1 text-center text-xs text-cream/50">{site.availability}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
