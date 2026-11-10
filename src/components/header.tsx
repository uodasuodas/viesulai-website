"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/routing";
import { LanguageSwitcher } from "./language-switcher";

const links = [
  { href: "/apie/", key: "about" },
  { href: "/veikla/", key: "programs" },
  { href: "/tapk-nariu/", key: "join" },
  { href: "/parama/", key: "support" },
  { href: "/kontaktai/", key: "contact" },
] as const;

const stripSlash = (path: string) => path.replace(/\/$/, "");

export function Header() {
  const t = useTranslations("nav");
  const pathname = stripSlash(usePathname());
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const linkClass = (href: string) =>
    stripSlash(href) === pathname ? "text-sand" : "text-bone/80 hover:text-sand";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-dark/95 backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 font-display text-bone text-2xl tracking-[0.15em] uppercase"
        >
          <Image
            src="/images/logo-white.png"
            alt="Viesulai logo"
            width={334}
            height={441}
            className="h-10 w-auto"
          />
          Viesulai
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={`${linkClass(link.href)} text-sm tracking-wide uppercase transition-colors`}
            >
              {t(link.key)}
            </Link>
          ))}
          <LanguageSwitcher />
        </div>

        <button
          className="md:hidden text-bone p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span
              className={`block h-0.5 bg-bone transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 bg-bone transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 bg-bone transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-dark/95 backdrop-blur-sm border-t border-bone/10">
          <div className="px-6 py-6 flex flex-col gap-5">
            {links.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={`${linkClass(link.href)} text-lg uppercase transition-colors`}
                onClick={() => setMenuOpen(false)}
              >
                {t(link.key)}
              </Link>
            ))}
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  );
}
