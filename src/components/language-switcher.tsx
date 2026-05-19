"use client";

import { useLocale } from "next-intl";

export function LanguageSwitcher() {
  const locale = useLocale();

  return (
    <div className="flex items-center gap-2 text-sm">
      <a
        href="/lt/"
        className={`transition-colors ${
          locale === "lt"
            ? "text-sand font-semibold"
            : "text-bone/60 hover:text-bone"
        }`}
      >
        LT
      </a>
      <span className="text-bone/30">|</span>
      <a
        href="/en/"
        className={`transition-colors ${
          locale === "en"
            ? "text-sand font-semibold"
            : "text-bone/60 hover:text-bone"
        }`}
      >
        EN
      </a>
    </div>
  );
}
