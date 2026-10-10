import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { defaultTheme } from "@/config/theme";

interface FooterProps {
  locale: Locale;
  dict: {
    nav: { home: string; about: string; process: string; projects: string; contact: string };
    footer: {
      description: string;
      quickLinks: string;
      followUs: string;
      rights: string;
      instagram: string;
      facebook: string;
      pinterest: string;
    };
    a11y: { statement: string; opensNewTab: string };
  };
}

export default function Footer({ locale, dict }: FooterProps) {
  const year = new Date().getFullYear();
  const contact = defaultTheme.contact;

  return (
    <footer id="site-footer" className="bg-[var(--color-primary)] text-white/80">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-16 md:pt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {/* Brand */}
          <div>
            <p
              className="text-2xl tracking-[0.15em] uppercase text-white mb-4 font-normal leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Shika
            </p>
            <p className="text-sm leading-relaxed text-white/70 max-w-xs">
              {dict.footer.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 id="footer-quick-links" className="text-xs tracking-[0.2em] uppercase text-[var(--color-accent)] mb-6">
              {dict.footer.quickLinks}
            </h2>
            <nav aria-labelledby="footer-quick-links" className="flex flex-col gap-3">
              {[
                { href: `/${locale}/about`, label: dict.nav.about },
                { href: `/${locale}/process`, label: dict.nav.process },
                { href: `/${locale}/projects`, label: dict.nav.projects },
                { href: `/${locale}/contact`, label: dict.nav.contact },
                { href: `/${locale}/accessibility`, label: dict.a11y.statement },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social & Contact */}
          <div>
            <h2 className="text-xs tracking-[0.2em] uppercase text-[var(--color-accent)] mb-6">
              {dict.footer.followUs}
            </h2>
            <div className="flex flex-col gap-3">
              {contact.instagram && (
                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  {dict.footer.instagram}
                  <span className="sr-only"> {dict.a11y.opensNewTab}</span>
                </a>
              )}
              {contact.facebook && (
                <a
                  href={contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  {dict.footer.facebook}
                  <span className="sr-only"> {dict.a11y.opensNewTab}</span>
                </a>
              )}
              {contact.pinterest && (
                <a
                  href={contact.pinterest}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  {dict.footer.pinterest}
                  <span className="sr-only"> {dict.a11y.opensNewTab}</span>
                </a>
              )}
            </div>
            <div className="mt-6 text-sm text-white/60">
              <a href={`mailto:${contact.email}`} className="block hover:text-white transition-colors">
                {contact.email}
              </a>
              <a href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`} className="block mt-1 hover:text-white transition-colors">
                <span dir="ltr">{contact.phone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 py-3 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/60">
            &copy; {year} Shika Design. {dict.footer.rights}
          </p>
          <Link href={`/${locale}/accessibility`} className="text-xs text-white/60 hover:text-white underline underline-offset-2 transition-colors">
            {dict.a11y.statement}
          </Link>
        </div>
      </div>
    </footer>
  );
}
