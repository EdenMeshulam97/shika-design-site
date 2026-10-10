"use client";

import { useState, useRef, useEffect, useId } from "react";
import { usePathname, useRouter } from "next/navigation";
import { locales, localeNames, type Locale } from "@/lib/i18n/config";

interface LanguageSwitcherProps {
  locale: Locale;
  /** Accessible name for the toggle, e.g. "Choose language" */
  label: string;
}

export default function LanguageSwitcher({ locale, label }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listId = useId();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && ref.current?.contains(document.activeElement)) {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    // Close when keyboard focus moves out of the switcher
    const handleFocus = (e: FocusEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    document.addEventListener("focusin", handleFocus);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("focusin", handleFocus);
    };
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
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-sm tracking-wider uppercase text-white/65 hover:text-white transition-colors"
        aria-label={`${label} (${locale.toUpperCase()})`}
        aria-expanded={open}
        aria-controls={listId}
      >
        <svg aria-hidden="true" focusable="false" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9 9 0 100-18 9 9 0 000 18zM3.6 9h16.8M3.6 15h16.8M12 3c2.21 2.5 3.46 5.6 3.46 9s-1.25 6.5-3.46 9c-2.21-2.5-3.46-5.6-3.46-9s1.25-6.5 3.46-9z" />
        </svg>
        {locale.toUpperCase()}
      </button>

      {open && (
        <ul
          id={listId}
          aria-label={label}
          className="absolute top-full mt-2 end-0 bg-[var(--color-surface)] border border-[var(--color-border)] rounded shadow-lg min-w-[140px] overflow-hidden"
        >
          {locales.map((l) => (
            <li key={l}>
              <button
                type="button"
                lang={l}
                aria-current={l === locale ? "true" : undefined}
                onClick={() => switchLocale(l)}
                className={`block w-full text-start px-4 py-2.5 text-sm transition-colors ${
                  l === locale
                    ? "bg-[var(--color-background-alt)] text-[var(--color-text)] font-medium"
                    : "text-[var(--color-text-light)] hover:bg-[var(--color-background-alt)] hover:text-[var(--color-text)]"
                }`}
              >
                {localeNames[l]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
