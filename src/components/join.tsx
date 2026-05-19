"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const steps = ["step1", "step2", "step3", "step4"] as const;

export function Join() {
  const t = useTranslations("join");

  return (
    <section id="join" className="py-24 md:py-32 bg-olive">
      <div className="max-w-4xl mx-auto px-6">
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
          <p className="text-bone/50 text-lg">{t("subtitle")}</p>
          <div className="w-16 h-0.5 bg-sand mx-auto mt-6" />
        </motion.div>

        <div className="space-y-8">
          {steps.map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-6 items-start"
            >
              <div className="flex-shrink-0 w-14 h-14 border border-sand/40 flex items-center justify-center">
                <span className="font-display text-sand text-lg">
                  {t(`${step}.number`)}
                </span>
              </div>
              <div>
                <h3 className="font-display text-xl text-bone mb-2 uppercase tracking-wide">
                  {t(`${step}.title`)}
                </h3>
                <p className="text-bone/60 leading-relaxed">
                  {t(`${step}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href={t("ctaUrl")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-2 border-sand text-sand hover:bg-sand hover:text-dark px-8 py-4 text-lg font-semibold tracking-wide uppercase transition-colors"
          >
            {t("cta")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
