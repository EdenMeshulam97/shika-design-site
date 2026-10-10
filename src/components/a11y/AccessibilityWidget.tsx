"use client";

import { useState, useEffect, useRef, useId, useCallback, useSyncExternalStore } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import {
  type A11ySettings,
  type A11yToggle,
  A11Y_TOGGLES,
  TEXT_SCALE_MIN,
  TEXT_SCALE_MAX,
  TEXT_SCALE_STEP,
  defaultA11ySettings,
  subscribeA11y,
  getA11ySnapshot,
  getA11yServerSnapshot,
  setA11ySettings,
  isDefaultA11y,
} from "@/lib/a11y/settings";

interface AccessibilityWidgetProps {
  locale: Locale;
  dict: {
    openMenu: string;
    title: string;
    close: string;
    textSize: string;
    decreaseText: string;
    increaseText: string;
    reset: string;
    statement: string;
    shortcutHint: string;
    toggles: Record<A11yToggle, string>;
  };
}

export default function AccessibilityWidget({ locale, dict }: AccessibilityWidgetProps) {
  const [open, setOpen] = useState(false);
  // The boot script in <head> already applied the saved settings; this reads the same values
  const settings = useSyncExternalStore(subscribeA11y, getA11ySnapshot, getA11yServerSnapshot);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const panelId = useId();

  const update = (next: A11ySettings) => setA11ySettings(next);

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  }, []);

  // Alt+A opens/closes the menu from anywhere on the page
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey && !e.ctrlKey && !e.metaKey && e.code === "KeyA") {
        e.preventDefault();
        setOpen((o) => {
          if (o) triggerRef.current?.focus();
          return !o;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!panelRef.current?.contains(target) && !triggerRef.current?.contains(target)) close(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, close]);

  const changeScale = (delta: number) => {
    const textScale = Math.min(TEXT_SCALE_MAX, Math.max(TEXT_SCALE_MIN, settings.textScale + delta));
    update({ ...settings, textScale });
  };

  const active = !isDefaultA11y(settings);

  return (
    <div className="a11y-widget">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={dict.openMenu}
        title={`${dict.openMenu} (Alt+A)`}
        className="fixed bottom-5 start-5 z-[60] w-14 h-14 rounded-full bg-[#1F4E9C] text-white shadow-lg flex items-center justify-center hover:bg-[#173B78] transition-colors focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#1F4E9C]"
      >
        {/* International symbol of accessibility (decorative; the button is labelled) */}
        <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
          <circle cx="12" cy="3.5" r="2" />
          <path d="M19.5 7.3c-2.4.6-5 .9-7.5.9s-5.1-.3-7.5-.9l-.5 1.9c1.9.5 3.9.8 5.9.9v3.1L8.6 21l1.9.6 1.5-5.4 1.5 5.4 1.9-.6-1.3-7.8v-3.1c2-.1 4-.4 5.9-.9l-.5-1.9z" />
        </svg>
        {active && (
          <span aria-hidden="true" className="absolute top-0.5 end-0.5 w-3.5 h-3.5 rounded-full bg-[#FFD60A] border-2 border-[#1F4E9C]" />
        )}
      </button>

      <div
        ref={panelRef}
        id={panelId}
        role="dialog"
        aria-modal="false"
        aria-labelledby={titleId}
        tabIndex={-1}
        hidden={!open}
        className="fixed bottom-24 start-5 z-[60] w-[min(22rem,calc(100vw-2.5rem))] max-h-[calc(100vh-8rem)] overflow-y-auto rounded-lg bg-white text-[#1A1A1A] shadow-2xl border border-[#1A1A1A]/20 outline-none"
        style={{ fontFamily: "Arial, 'Helvetica Neue', sans-serif", fontWeight: 400, lineHeight: 1.5 }}
      >
        <div className="flex items-center justify-between gap-4 px-5 py-4 bg-[#1F4E9C] text-white rounded-t-lg">
          <h2 id={titleId} className="text-lg font-semibold" style={{ fontFamily: "inherit" }}>
            {dict.title}
          </h2>
          <button
            type="button"
            onClick={() => close()}
            aria-label={dict.close}
            className="w-9 h-9 flex items-center justify-center rounded hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-white"
          >
            <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Text size */}
          <div className="rounded-md border border-[#1A1A1A]/15 p-3">
            <p className="text-sm font-semibold mb-2" id={`${panelId}-size`}>
              {dict.textSize}
            </p>
            <div className="flex items-center justify-between gap-3" role="group" aria-labelledby={`${panelId}-size`}>
              <button
                type="button"
                onClick={() => changeScale(-TEXT_SCALE_STEP)}
                disabled={settings.textScale <= TEXT_SCALE_MIN}
                aria-label={dict.decreaseText}
                className="a11y-widget-btn w-11 h-11 text-xl font-bold"
              >
                A−
              </button>
              <output aria-live="polite" className="text-base font-semibold tabular-nums">
                {settings.textScale}%
              </output>
              <button
                type="button"
                onClick={() => changeScale(TEXT_SCALE_STEP)}
                disabled={settings.textScale >= TEXT_SCALE_MAX}
                aria-label={dict.increaseText}
                className="a11y-widget-btn w-11 h-11 text-xl font-bold"
              >
                A+
              </button>
            </div>
          </div>

          {/* On/off adjustments */}
          <ul className="grid grid-cols-2 gap-2">
            {A11Y_TOGGLES.map((key) => (
              <li key={key}>
                <button
                  type="button"
                  aria-pressed={settings[key]}
                  onClick={() => update({ ...settings, [key]: !settings[key] })}
                  className="a11y-widget-btn w-full min-h-[3.25rem] px-2 py-2 text-sm text-start flex items-center gap-2"
                >
                  <span
                    aria-hidden="true"
                    className={`shrink-0 w-4 h-4 rounded-sm border-2 flex items-center justify-center ${
                      settings[key] ? "bg-[#1F4E9C] border-[#1F4E9C]" : "border-[#1A1A1A]/60"
                    }`}
                  >
                    {settings[key] && (
                      <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none" stroke="white" strokeWidth={2}>
                        <path d="M2 6l3 3 5-6" />
                      </svg>
                    )}
                  </span>
                  {dict.toggles[key]}
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => update(defaultA11ySettings)}
            disabled={!active}
            className="a11y-widget-btn w-full py-2.5 text-sm font-semibold"
          >
            {dict.reset}
          </button>

          <div className="flex flex-col gap-1 pt-1 text-sm">
            <Link
              href={`/${locale}/accessibility`}
              onClick={() => close(false)}
              className="text-[#1F4E9C] underline underline-offset-2 hover:text-[#173B78]"
            >
              {dict.statement}
            </Link>
            <p className="text-[#4A4A4A] text-xs">{dict.shortcutHint}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
