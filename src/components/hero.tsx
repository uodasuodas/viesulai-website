"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-dark overflow-hidden">
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        className="object-cover opacity-35"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-dark/40" />

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sand tracking-[0.4em] text-sm mb-6 uppercase"
        >
          Lietuvos šaulių sąjunga
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-bone text-6xl md:text-8xl lg:text-9xl leading-tight mb-6 tracking-[0.08em] uppercase"
        >
          {t("headline")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-bone/60 text-xl md:text-2xl mb-14 tracking-wide"
        >
          {t("subheadline")}
        </motion.p>

        <motion.a
          href="#join"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="inline-block border-2 border-sand text-sand hover:bg-sand hover:text-dark px-8 py-4 text-lg font-semibold tracking-wide uppercase transition-colors"
        >
          {t("cta")}
        </motion.a>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-px h-16 bg-gradient-to-b from-bone/30 to-transparent" />
      </motion.div>
    </section>
  );
}
