import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { locales, type Locale, getDirection } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import AccessibilityWidget from "@/components/a11y/AccessibilityWidget";
import { a11yBootScript } from "@/lib/a11y/settings";
import ContextMenuGuard from "@/components/ui/ContextMenuGuard";

// Fonts are downloaded at build time and served from this site (no request to Google, no render-blocking stylesheet).
// The variables are wired into --font-heading/--font-body in globals.css and ThemeProvider.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-cormorant",
});
const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Shika | Interior Design Studio",
  description: "Boutique interior design studio creating timeless, functional spaces that reflect your unique vision.",
};

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const dict = await getDictionary(locale as Locale);
  const dir = getDirection(locale as Locale);

  return (
    // suppressHydrationWarning: the boot script adds the visitor's saved a11y-* classes before React hydrates
    <html lang={locale} dir={dir} className={`${cormorant.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: a11yBootScript }} />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-[100] focus:px-5 focus:py-3 focus:bg-white focus:text-black focus:text-sm focus:font-medium focus:shadow-lg"
        >
          {dict.a11y.skipToContent}
        </a>
        <ThemeProvider>
          <Header locale={locale as Locale} dict={dict} />
          <main id="main-content" tabIndex={-1} className="min-h-screen">
            {children}
          </main>
          <Footer locale={locale as Locale} dict={dict} />
          <AccessibilityWidget locale={locale as Locale} dict={dict.a11y} />
        </ThemeProvider>
        <ContextMenuGuard />
      </body>
    </html>
  );
}
