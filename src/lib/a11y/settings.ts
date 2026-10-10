// Visitor-controlled accessibility adjustments (the "accessibility menu").
// Each boolean setting maps to an `a11y-<name>` class on <html>; the styles live in globals.css.

export const A11Y_STORAGE_KEY = "shika-a11y";

export const A11Y_TOGGLES = [
  "contrast",
  "grayscale",
  "links",
  "readableFont",
  "spacing",
  "stopMotion",
  "bigCursor",
  "focus",
] as const;

export type A11yToggle = (typeof A11Y_TOGGLES)[number];

export interface A11ySettings extends Record<A11yToggle, boolean> {
  /** Root font size as a percentage of the browser default */
  textScale: number;
}

export const TEXT_SCALE_MIN = 100;
export const TEXT_SCALE_MAX = 200;
export const TEXT_SCALE_STEP = 10;

export const defaultA11ySettings: A11ySettings = {
  textScale: 100,
  contrast: false,
  grayscale: false,
  links: false,
  readableFont: false,
  spacing: false,
  stopMotion: false,
  bigCursor: false,
  focus: false,
};

const toClass = (key: A11yToggle) => `a11y-${key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}`;

export function loadA11ySettings(): A11ySettings {
  try {
    const stored = localStorage.getItem(A11Y_STORAGE_KEY);
    if (stored) return { ...defaultA11ySettings, ...JSON.parse(stored) };
  } catch {
    // Storage blocked or corrupt: fall back to defaults
  }
  return defaultA11ySettings;
}

export function saveA11ySettings(settings: A11ySettings): void {
  try {
    localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Settings still apply for this page view
  }
}

export function applyA11ySettings(settings: A11ySettings): void {
  const root = document.documentElement;
  for (const key of A11Y_TOGGLES) root.classList.toggle(toClass(key), settings[key]);
  root.style.fontSize = settings.textScale === 100 ? "" : `${settings.textScale}%`;
}

// A tiny external store so every component reads the same settings (via useSyncExternalStore)
let current: A11ySettings | null = null;
const listeners = new Set<() => void>();

export function subscribeA11y(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getA11ySnapshot(): A11ySettings {
  if (!current) current = loadA11ySettings();
  return current;
}

export function getA11yServerSnapshot(): A11ySettings {
  return defaultA11ySettings;
}

export function setA11ySettings(next: A11ySettings): void {
  current = next;
  applyA11ySettings(next);
  saveA11ySettings(next);
  listeners.forEach((listener) => listener());
}

export function isDefaultA11y(settings: A11ySettings): boolean {
  return (Object.keys(defaultA11ySettings) as (keyof A11ySettings)[]).every(
    (k) => settings[k] === defaultA11ySettings[k]
  );
}

/** Runs in <head> before first paint so saved adjustments apply without a flash */
export const a11yBootScript = `(function(){try{var s=JSON.parse(localStorage.getItem(${JSON.stringify(
  A11Y_STORAGE_KEY
)})||"{}"),r=document.documentElement,m=${JSON.stringify(
  Object.fromEntries(A11Y_TOGGLES.map((k) => [k, toClass(k)]))
)};for(var k in m)if(s[k])r.classList.add(m[k]);if(s.textScale&&s.textScale!==100)r.style.fontSize=s.textScale+"%";}catch(e){}})();`;
