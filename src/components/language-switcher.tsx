"use client";

import { Fragment } from "react";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { locales } from "@/i18n/config";

// Switches language while staying on the same page
export function LanguageSwitcher({ onSelect }: { onSelect?: () => void }) {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-2 text-sm">
      {locales.map((l, i) => (
        <Fragment key={l}>
          {i > 0 && <span className="text-bone/30">|</span>}
          <Link
            href={pathname}
            locale={l}
            onClick={onSelect}
            className={`transition-colors ${
              locale === l ? "text-sand font-semibold" : "text-bone/60 hover:text-bone"
            }`}
          >
            {l.toUpperCase()}
          </Link>
        </Fragment>
      ))}
    </div>
  );
}
