"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

const AUTOPLAY_MS = 5000;

// Photo paths are collected from public/images/gallery at build time (see lib/images.ts)
export function Gallery({ photos }: { photos: string[] }) {
  const t = useTranslations("gallery");
  const [index, setIndex] = useState(0);
  const go = (step: number) => setIndex((i) => (i + step + photos.length) % photos.length);

  // Restarts on every change, so manual navigation also resets the timer
  useEffect(() => {
    const id = setTimeout(() => setIndex((i) => (i + 1) % photos.length), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [index, photos.length]);

  const arrowClass =
    "absolute top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-dark/60 hover:bg-dark/90 text-bone text-2xl transition-colors";

  return (
    <section id="gallery" className="py-24 md:py-32 bg-dark">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl text-bone mb-4 uppercase tracking-wide">
            {t("title")}
          </h2>
          <div className="w-16 h-0.5 bg-sand mx-auto mt-6" />
        </motion.div>

        <div
          className="relative aspect-[4/3] md:aspect-video bg-dark-light border border-bone/10 overflow-hidden"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") go(1);
            if (e.key === "ArrowLeft") go(-1);
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50) go(1);
                if (info.offset.x > 50) go(-1);
              }}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
            >
              <Image
                src={photos[index]}
                alt={t("photoAlt", { n: index + 1 })}
                fill
                draggable={false}
                className="object-contain"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </motion.div>
          </AnimatePresence>

          <button type="button" onClick={() => go(-1)} aria-label={t("prev")} className={`${arrowClass} left-3`}>
            ‹
          </button>
          <button type="button" onClick={() => go(1)} aria-label={t("next")} className={`${arrowClass} right-3`}>
            ›
          </button>
        </div>

        <p className="mt-4 text-center text-bone/50 text-sm tracking-widest">
          {index + 1} / {photos.length}
        </p>
      </div>
    </section>
  );
}
