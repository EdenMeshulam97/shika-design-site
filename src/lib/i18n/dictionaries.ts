import { notFound } from "next/navigation";
import { locales, type Locale } from "./config";

const dictionaries = {
  en: () => import("@/messages/en.json").then((m) => m.default),
  he: () => import("@/messages/he.json").then((m) => m.default),
  ar: () => import("@/messages/ar.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale) {
  // Unknown segments (e.g. a stray /favicon.ico request) reach [locale] pages; 404 instead of crashing
  if (!locales.includes(locale)) notFound();
  return dictionaries[locale]();
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
