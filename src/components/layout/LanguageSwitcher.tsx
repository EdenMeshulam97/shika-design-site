"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { locales, localeNames, type Locale } from "@/lib/i18n/config";

interface LanguageSwitcherProps {
  locale: Locale;
}

export default function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const switchLocale = (newLocale: Locale) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-sm tracking-wider uppercase text-[var(--color-text-light)] hover:text-[var(--color-text)] transition-colors"
        aria-label="Change language"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9 9 0 100-18 9 9 0 000 18zM3.6 9h16.8M3.6 15h16.8M12 3c2.21 2.5 3.46 5.6 3.46 9s-1.25 6.5-3.46 9c-2.21-2.5-3.46-5.6-3.46-9s1.25-6.5 3.46-9z" />
        </svg>
        {locale.toUpperCase()}
      </button>

      {open && (
        <div className="absolute top-full mt-2 end-0 bg-[var(--color-surface)] border border-[var(--color-border)] rounded shadow-lg min-w-[140px] overflow-hidden">
          {locales.map((l) => (
            <button
              key={l}
              onClick={() => switchLocale(l)}
              className={`block w-full text-start px-4 py-2.5 text-sm transition-colors ${
                l === locale
                  ? "bg-[var(--color-background-alt)] text-[var(--color-text)] font-medium"
                  : "text-[var(--color-text-light)] hover:bg-[var(--color-background-alt)] hover:text-[var(--color-text)]"
              }`}
            >
              {localeNames[l]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
