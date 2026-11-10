"use client";

import { MotionConfig, motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";

const container: Variants = { show: { transition: { staggerChildren: 0.08 } } };
const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  const t = useTranslations("hero");

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative min-h-svh flex items-center justify-center bg-dark overflow-hidden">
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          className="object-cover opacity-35"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-dark/40" />

        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="relative z-10 text-center px-6 max-w-4xl"
        >
          <motion.div variants={item} className="flex justify-center mb-8">
            <Image
              src="/images/logo-white.png"
              alt="Viesulai logo"
              width={334}
              height={441}
              priority
              className="h-32 md:h-40 w-auto"
            />
          </motion.div>

          <motion.p variants={item} className="text-sand tracking-[0.4em] text-sm mb-6 uppercase">
            Lietuvos šaulių sąjunga
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display text-bone text-6xl md:text-8xl lg:text-9xl leading-tight mb-6 tracking-[0.08em] uppercase"
          >
            {t("headline")}
          </motion.h1>

          <motion.p variants={item} className="text-bone/60 text-xl md:text-2xl mb-14 tracking-wide">
            {t("subheadline")}
          </motion.p>

          <motion.div variants={item}>
            <Link
              href="/tapk-nariu/"
              className="inline-block border-2 border-sand text-sand hover:bg-sand hover:text-dark px-8 py-4 text-lg font-semibold tracking-wide uppercase transition-colors"
            >
              {t("cta")}
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-bone/30 to-transparent"
        />
      </section>
    </MotionConfig>
  );
}
