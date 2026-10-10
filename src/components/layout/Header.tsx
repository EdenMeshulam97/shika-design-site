"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import type { Locale } from "@/lib/i18n/config";

interface HeaderProps {
  locale: Locale;
  dict: {
    nav: {
      home: string;
      about: string;
      process: string;
      projects: string;
      contact: string;
    };
  };
}

export default function Header({ locale, dict }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLinks = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/process`, label: dict.nav.process },
    { href: `/${locale}/projects`, label: dict.nav.projects },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}`) return pathname === `/${locale}`;
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[var(--color-primary)]/95 backdrop-blur-md shadow-md"
            : "bg-[var(--color-primary)]"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between h-20">
            {/* Start: logo + name, with the tabs right next to them */}
            <div className="flex items-center gap-10 xl:gap-12">
              {/* Logo */}
              <Link
                href={`/${locale}`}
                className="flex items-center gap-3 font-heading text-2xl tracking-[0.15em] uppercase text-white hover:opacity-70 transition-opacity"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                <Image
                  src="/images/brand/logo-white.png"
                  alt=""
                  width={230}
                  height={256}
                  className="h-9 md:h-11 w-auto"
                  priority
                />
                Shika
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-sm tracking-[0.1em] uppercase transition-colors duration-300 ${
                      isActive(link.href)
                        ? "text-white"
                        : "text-white/65 hover:text-white"
                    }`}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {link.label}
                    {isActive(link.href) && (
                      <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[var(--color-accent)]" />
                    )}
                  </Link>
                ))}
              </nav>
            </div>

            {/* End: language selector on its own at the far side */}
            <div className="hidden lg:block">
              <LanguageSwitcher locale={locale} />
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 lg:hidden">
              <LanguageSwitcher locale={locale} />
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="relative w-8 h-8 flex items-center justify-center z-50"
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
              >
                <span className={`block absolute w-6 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? "rotate-45" : "-translate-y-2"}`} />
                <span className={`block absolute w-6 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`block absolute w-6 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? "-rotate-45" : "translate-y-2"}`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[var(--color-surface)] transition-all duration-500 lg:hidden ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-2xl tracking-[0.15em] uppercase transition-all duration-500 ${
                isActive(link.href) ? "text-[var(--color-text)]" : "text-[var(--color-text-light)]"
              }`}
              style={{
                fontFamily: "var(--font-heading)",
                transitionDelay: menuOpen ? `${i * 0.08}s` : "0s",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
