"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { cn } from "cn";
import { galleryImages, type GalleryCategory } from "@/config/site";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/animations/Reveal";

const categories: Array<GalleryCategory | "All"> = ["All", "Destinations", "Nature", "Family Travel", "Wedding Transportation"];

/** Varying tile heights give the masonry its editorial rhythm. */
const tileHeights = ["aspect-[4/5]", "aspect-[4/3]", "aspect-square", "aspect-[3/4]", "aspect-[16/10]", "aspect-[4/5]"];

export default function Gallery() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const visible = galleryImages.filter((g) => filter === "All" || g.category === filter);

  const close = useCallback(() => setLightbox(null), []);
  const step = useCallback(
    (dir: 1 | -1) => {
      setLightbox((cur) => (cur === null ? cur : (cur + dir + visible.length) % visible.length));
    },
    [visible.length]
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, close, step]);

  return (
    <section className="bg-cream py-20 lg:py-28" aria-labelledby="gallery-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="gallery-heading"
          eyebrow="Photo Gallery"
          title="Moments From the Road"
          subtitle="Real places, real journeys - the Odisha we drive through every week."
        />

        <Reveal className="mb-10 flex flex-wrap justify-center gap-2.5" >
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
              className={cn(
                "rounded-full border px-5 py-2 text-sm font-semibold transition-all",
                filter === c
                  ? "border-navy bg-navy text-cream"
                  : "border-border bg-white text-fog hover:border-navy/30 hover:text-navy"
              )}
            >
              {c}
            </button>
          ))}
        </Reveal>

        <motion.div layout className="masonry columns-2 md:columns-3">
          <AnimatePresence mode="popLayout">
            {visible.map((g, i) => (
              <motion.figure
                layout
                key={g.src}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className="group relative mb-4 cursor-zoom-in overflow-hidden rounded-xl"
                onClick={() => setLightbox(i)}
              >
                <div className={cn("relative w-full", tileHeights[i % tileHeights.length])}>
                  <Image
                    src={g.src}
                    alt={g.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                </div>
                <figcaption className="absolute inset-0 flex items-end bg-gradient-to-t from-navy-deep/70 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="flex w-full items-center justify-between text-sm font-semibold text-cream">
                    {g.caption}
                    <Expand className="h-4 w-4" aria-hidden="true" />
                  </span>
                </figcaption>
                <span className="sr-only">Open {g.caption} in the viewer</span>
              </motion.figure>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && visible[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-deep/95 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={`${visible[lightbox].caption} - image viewer`}
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close viewer"
              className="absolute top-5 right-5 rounded-full bg-cream/10 p-2.5 text-cream transition hover:bg-cream/20"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Previous image"
              onClick={(e) => { e.stopPropagation(); step(-1); }}
              className="absolute left-3 z-10 rounded-full bg-cream/10 p-2.5 text-cream transition hover:bg-cream/20 sm:left-6"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <motion.div
              key={visible[lightbox].src}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative max-h-[82vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
                <Image
                  src={visible[lightbox].src}
                  alt={visible[lightbox].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-contain"
                  priority
                />
              </div>
              <p className="mt-4 text-center text-sm font-semibold text-cream/85">
                {visible[lightbox].caption}
                <span className="ml-3 text-cream/45">
                  {lightbox + 1} / {visible.length}
                </span>
              </p>
            </motion.div>
            <button
              type="button"
              aria-label="Next image"
              onClick={(e) => { e.stopPropagation(); step(1); }}
              className="absolute right-3 z-10 rounded-full bg-cream/10 p-2.5 text-cream transition hover:bg-cream/20 sm:right-6"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
