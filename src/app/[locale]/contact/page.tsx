import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import ContactContent from "./ContactContent";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return <ContactContent dict={{ contact: dict.contact, footer: dict.footer, a11y: dict.a11y }} />;
}
