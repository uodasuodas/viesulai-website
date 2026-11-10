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
  // Transparent only over the home hero
  const solid = scrolled || menuOpen || pathname !== "";
  const closeMenu = () => setMenuOpen(false);
  const linkClass = (href: string) =>
    stripSlash(href) === pathname ? "text-sand" : "text-bone/80 hover:text-sand";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    // Page can load already scrolled (refresh, back navigation)
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 ${
        solid ? "bg-dark/95 border-bone/10" : "bg-transparent border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          onClick={closeMenu}
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
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span
              className={`block h-0.5 bg-bone transition-transform duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 bg-bone transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 bg-bone transition-transform duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      <div
        id="mobile-menu"
        inert={!menuOpen}
        className={`md:hidden grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
          menuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 py-6 flex flex-col gap-5 border-t border-bone/10">
            {links.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={`${linkClass(link.href)} text-lg uppercase transition-colors`}
                onClick={closeMenu}
              >
                {t(link.key)}
              </Link>
            ))}
            <LanguageSwitcher onSelect={closeMenu} />
          </div>
        </div>
      </div>
    </header>
  );
}
