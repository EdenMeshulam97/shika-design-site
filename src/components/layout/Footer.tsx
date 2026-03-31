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
  };
}

export default function Footer({ locale, dict }: FooterProps) {
  const year = new Date().getFullYear();
  const contact = defaultTheme.contact;

  return (
    <footer className="bg-[var(--color-primary)] text-white/80">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {/* Brand */}
          <div>
            <h3
              className="text-2xl tracking-[0.15em] uppercase text-white mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Shika
            </h3>
            <p className="text-sm leading-relaxed text-white/60 max-w-xs">
              {dict.footer.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-white/40 mb-6">
              {dict.footer.quickLinks}
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { href: `/${locale}/about`, label: dict.nav.about },
                { href: `/${locale}/process`, label: dict.nav.process },
                { href: `/${locale}/projects`, label: dict.nav.projects },
                { href: `/${locale}/contact`, label: dict.nav.contact },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-white/40 mb-6">
              {dict.footer.followUs}
            </h4>
            <div className="flex flex-col gap-3">
              {contact.instagram && (
                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {dict.footer.instagram}
                </a>
              )}
              {contact.facebook && (
                <a
                  href={contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {dict.footer.facebook}
                </a>
              )}
              {contact.pinterest && (
                <a
                  href={contact.pinterest}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {dict.footer.pinterest}
                </a>
              )}
            </div>
            <div className="mt-6 text-sm text-white/40">
              <p>{contact.email}</p>
              <p className="mt-1">{contact.phone}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            &copy; {year} Shika Design. {dict.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
