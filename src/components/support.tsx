"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const methods = ["gpm", "transfer", "business"] as const;
const details = ["recipient", "code", "iban", "type", "purpose"] as const;

export function Support() {
  const t = useTranslations("support");

  return (
    <section id="support" className="py-24 md:py-32 bg-dark">
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
          <p className="text-bone/50 text-lg">{t("subtitle")}</p>
          <div className="w-16 h-0.5 bg-sand mx-auto mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {methods.map((method, i) => (
            <motion.div
              key={method}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="border border-bone/10 p-8 hover:border-sand/30 transition-colors"
            >
              <h3 className="font-display text-xl text-bone mb-4 uppercase tracking-wide">
                {t(`${method}.title`)}
              </h3>
              <p className="text-bone/60 leading-relaxed">
                {t(`${method}.description`)}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 max-w-2xl mx-auto">
          <h3 className="font-display text-xl text-bone mb-3 uppercase tracking-wide">
            {t("usage.title")}
          </h3>
          <p className="text-bone/60 leading-relaxed">{t("usage.description")}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mt-12 border border-sand/30 p-8 max-w-2xl mx-auto"
        >
          <h3 className="font-display text-xl text-bone mb-6 uppercase tracking-wide">
            {t("details.title")}
          </h3>
          <dl className="space-y-2 text-lg">
            {details.map((key) => (
              <div key={key} className="flex flex-col sm:flex-row sm:gap-2">
                <dt className="text-bone/50 sm:w-56 shrink-0">{t(`details.${key}.label`)}:</dt>
                <dd className="text-bone font-semibold break-all select-all">
                  {t(`details.${key}.value`)}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
