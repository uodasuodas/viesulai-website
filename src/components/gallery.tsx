"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

// Photo paths are collected from public/images/gallery at build time (see page.tsx)
export function Gallery({ photos }: { photos: string[] }) {
  const t = useTranslations("gallery");
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((active + 1) % photos.length);
      if (e.key === "ArrowLeft") setActive((active - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, photos.length]);

  return (
    <section id="gallery" className="py-24 md:py-32 bg-dark">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl text-bone mb-4 uppercase tracking-wide">
            {t("title")}
          </h2>
          <div className="w-16 h-0.5 bg-sand mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {photos.map((src, i) => (
              <motion.button
                key={src}
                type="button"
                onClick={() => setActive(i)}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.08 }}
                className="relative aspect-[4/3] overflow-hidden group cursor-pointer"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </motion.button>
            ))}
        </div>
      </div>

      {active !== null && (
        <div
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[60] bg-dark/95 flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
        >
          <div className="relative w-full h-full">
            <Image src={photos[active]} alt="" fill className="object-contain" sizes="100vw" />
          </div>
          <span className="absolute bottom-4 text-bone/50 text-sm tracking-widest">
            {active + 1} / {photos.length}
          </span>
        </div>
      )}
    </section>
  );
}
