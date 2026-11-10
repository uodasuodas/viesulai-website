"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Video } from "./video";

const AUTOPLAY_MS = 4000;
const SWIPE_PX = 40;

// Photo paths are collected from public/images/gallery at build time (see lib/images.ts)
export function Gallery({ photos }: { photos: string[] }) {
  const t = useTranslations("gallery");
  const count = photos.length;
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [stopped, setStopped] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const swipeStart = useRef<number | null>(null);
  const inView = useInView(frameRef, { amount: 0.5 });

  // Manual navigation stops autoplay for good
  const go = (step: number) => {
    setStopped(true);
    setIndex((i) => (i + step + count) % count);
  };

  useEffect(() => {
    if (stopped || hovered || !inView || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [index, stopped, hovered, inView, count]);

  // Neighbours stay mounted so they are already loaded when shown
  const mounted = new Set([index, (index + 1) % count, (index - 1 + count) % count]);

  const arrowClass =
    "absolute top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-dark/50 hover:bg-dark/80 text-bone text-2xl leading-none transition-opacity duration-200 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100";

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

        {count > 0 && (
          <>
            <div
              ref={frameRef}
              role="region"
              aria-roledescription="carousel"
              aria-label={t("title")}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") go(1);
                if (e.key === "ArrowLeft") go(-1);
              }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onPointerDown={(e) => (swipeStart.current = e.clientX)}
              onPointerUp={(e) => {
                if (swipeStart.current === null) return;
                const dx = e.clientX - swipeStart.current;
                swipeStart.current = null;
                if (Math.abs(dx) > SWIPE_PX) go(dx < 0 ? 1 : -1);
              }}
              className="group relative aspect-[4/3] md:aspect-video bg-dark-light overflow-hidden touch-pan-y select-none outline-none focus-visible:ring-1 focus-visible:ring-sand"
            >
              {photos.map(
                (src, i) =>
                  mounted.has(i) && (
                    // Incoming slide fades in on top; the outgoing one waits underneath until it is covered
                    <div
                      key={src}
                      aria-hidden={i !== index}
                      className={`absolute inset-0 bg-dark-light transition-opacity duration-300 ease-out motion-reduce:transition-none ${
                        i === index ? "z-10 opacity-100" : "opacity-0 delay-300"
                      }`}
                    >
                      <Image
                        src={src}
                        alt={t("photoAlt", { n: i + 1 })}
                        fill
                        draggable={false}
                        className="object-contain"
                        sizes="(max-width: 896px) 100vw, 896px"
                      />
                    </div>
                  ),
              )}

              <button type="button" onClick={() => go(-1)} aria-label={t("prev")} className={`${arrowClass} left-3`}>
                ‹
              </button>
              <button type="button" onClick={() => go(1)} aria-label={t("next")} className={`${arrowClass} right-3`}>
                ›
              </button>
            </div>

            <p
              aria-live={stopped ? "polite" : "off"}
              className="mt-4 text-center text-bone/40 text-xs tracking-[0.3em] tabular-nums"
            >
              {index + 1} / {count}
            </p>
          </>
        )}

        <div className="mt-16">
          <Video />
        </div>
      </div>
    </section>
  );
}
