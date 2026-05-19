"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const goals = ["goal1", "goal2", "goal3"] as const;

export function Mission() {
  const t = useTranslations("mission");

  return (
    <section id="mission" className="py-24 md:py-32 bg-dark">
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
          {goals.map((goal, i) => (
            <motion.div
              key={goal}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="border border-bone/10 p-8 hover:border-sand/30 transition-colors"
            >
              <div className="text-sand font-display text-5xl mb-4 opacity-30">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-display text-xl text-bone mb-3 uppercase tracking-wide">
                {t(`${goal}.title`)}
              </h3>
              <p className="text-bone/60 leading-relaxed">
                {t(`${goal}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
