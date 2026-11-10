"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";

const programs = ["training", "medical", "drones", "education", "community"] as const;
const projects = ["project1", "project2", "project3"] as const;

// Home page summary: program titles only, details on /veikla/
export function ProgramsTeaser() {
  const t = useTranslations("programs");

  return (
    <section className="py-24 md:py-32 bg-olive">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl text-bone mb-4 uppercase tracking-wide">
            {t("title")}
          </h2>
          <p className="text-bone/50 text-lg">{t("subtitle")}</p>
          <div className="w-16 h-0.5 bg-sand mx-auto mt-6" />
        </motion.div>

        {/* Flex wrap keeps an incomplete last row centered */}
        <ul className="flex flex-wrap justify-center gap-4">
          {programs.map((key) => (
            <li
              key={key}
              className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)] border border-bone/10 px-6 py-5 font-display text-bone uppercase tracking-wide"
            >
              {t(`items.${key}.title`)}
            </li>
          ))}
        </ul>

        <Link
          href="/veikla/"
          className="inline-block mt-12 border-2 border-sand text-sand hover:bg-sand hover:text-dark px-8 py-4 text-lg font-semibold tracking-wide uppercase transition-colors"
        >
          {t("more")}
        </Link>
      </div>
    </section>
  );
}

// photos: program key -> image path, collected from public/images/programs at build time (see page.tsx)
export function Programs({ photos }: { photos: Record<string, string> }) {
  const t = useTranslations("programs");

  return (
    <section id="programs" className="py-24 md:py-32 bg-olive">
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

        <div className="flex flex-wrap justify-center gap-8">
          {programs.map((key, i) => (
            <motion.article
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.15 }}
              className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)] border border-bone/10 hover:border-sand/30 transition-colors"
            >
              {photos[key] && (
                <div className="relative aspect-[4/3]">
                  <Image
                    src={photos[key]}
                    alt={t(`items.${key}.title`)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              )}
              <div className="p-8">
                <h3 className="font-display text-xl text-bone mb-3 uppercase tracking-wide">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="text-bone/60 leading-relaxed">{t(`items.${key}.description`)}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <h3 className="font-display text-3xl text-bone mt-24 mb-10 uppercase tracking-wide text-center">
          {t("projectsTitle")}
        </h3>
        <div className="space-y-6 max-w-4xl mx-auto">
          {projects.map((key, i) => (
            <motion.article
              key={key}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border-l-2 border-sand/60 pl-6"
            >
              <p className="text-sand text-xs uppercase tracking-[0.3em] mb-2">
                {t(`projects.${key}.period`)} · {t(`projects.${key}.status`)}
              </p>
              <h4 className="font-display text-xl text-bone mb-2 uppercase tracking-wide">
                {t(`projects.${key}.title`)}
              </h4>
              <p className="text-bone/60 leading-relaxed">{t(`projects.${key}.description`)}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
