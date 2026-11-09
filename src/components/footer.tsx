"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-dark border-t border-bone/5 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <Image
              src="/images/logo-white.png"
              alt="Viesulai logo"
              width={334}
              height={441}
              className="h-12 w-auto mb-1"
            />
            <span className="font-display text-bone text-xl tracking-[0.15em] uppercase">
              Viesulai
            </span>
            <span className="text-bone/30 text-xs tracking-wide">
              {t("lss")}
            </span>
          </div>
          <address className="not-italic text-center md:text-left text-bone/50 text-sm space-y-1">
            <p className="text-bone/80">Trečiasis būrys, VšĮ</p>
            <p>{t("code")}</p>
            <p>{t("status")}</p>
            <p>{t("address")}</p>
            <p>
              <a href="mailto:tevyneslabui@treciasisburys.lt" className="hover:text-sand transition-colors">
                tevyneslabui@treciasisburys.lt
              </a>
            </p>
          </address>
          <p className="text-bone/30 text-sm">
            &copy; {new Date().getFullYear()} Trečiasis būrys, VšĮ. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
