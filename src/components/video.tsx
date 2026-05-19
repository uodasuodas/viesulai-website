"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function Video() {
  const t = useTranslations("video");

  return (
    <section className="py-24 md:py-32 bg-olive">
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative w-full aspect-video"
        >
          <iframe
            src="https://www.youtube.com/embed/eFhR6Xz3n2w"
            title="Viesulai"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border border-bone/10"
          />
        </motion.div>
      </div>
    </section>
  );
}
