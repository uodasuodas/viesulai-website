"use client";

import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-dark border-t border-bone/5 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-display text-bone text-xl tracking-[0.15em] uppercase">
              Viesulai
            </span>
            <span className="text-bone/30 text-xs tracking-wide">
              {t("lss")}
            </span>
          </div>
          <p className="text-bone/30 text-sm">
            &copy; {new Date().getFullYear()} Trečiasis būrys, VšĮ. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
