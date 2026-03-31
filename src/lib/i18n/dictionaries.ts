import type { Locale } from "./config";

const dictionaries = {
  en: () => import("@/messages/en.json").then((m) => m.default),
  he: () => import("@/messages/he.json").then((m) => m.default),
  ar: () => import("@/messages/ar.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
