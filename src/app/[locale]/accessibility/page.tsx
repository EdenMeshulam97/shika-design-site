import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { accessibilityConfig } from "@/config/accessibility";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return { title: `${dict.accessibility.pageTitle} | Shika` };
}

const headingStyle = {
  fontFamily: "var(--font-heading)",
  fontSize: "clamp(1.4rem, 2.2vw, 1.75rem)",
  color: "var(--color-text)",
  fontWeight: 400,
} as const;

export default async function AccessibilityPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.accessibility;
  const { coordinatorName, phone, email, statementUpdated } = accessibilityConfig;

  const updated = new Intl.DateTimeFormat(locale === "he" ? "he-IL" : locale === "ar" ? "ar" : "en-GB", {
    dateStyle: "long",
  }).format(new Date(`${statementUpdated}T12:00:00`));

  return (
    <article className="pt-32 pb-24 bg-[var(--color-background)]">
      <div className="container-custom max-w-3xl">
        <div className="separator mb-8" />
        <h1
          className="mb-8"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            color: "var(--color-text)",
            fontWeight: 300,
          }}
        >
          {t.pageTitle}
        </h1>

        <div className="space-y-12 leading-relaxed" style={{ color: "var(--color-text-light)" }}>
          <p className="text-lg">{t.intro}</p>

          <section aria-labelledby="a11y-standard">
            <h2 id="a11y-standard" className="mb-4" style={headingStyle}>
              {t.standardTitle}
            </h2>
            <p>{t.standard}</p>
          </section>

          <section aria-labelledby="a11y-measures">
            <h2 id="a11y-measures" className="mb-4" style={headingStyle}>
              {t.measuresTitle}
            </h2>
            <ul className="list-disc ps-6 space-y-2">
              {t.measures.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="a11y-menu">
            <h2 id="a11y-menu" className="mb-4" style={headingStyle}>
              {t.menuTitle}
            </h2>
            <p className="mb-4">{t.menuIntro}</p>
            <ul className="list-disc ps-6 space-y-2">
              {t.menu.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="a11y-compat">
            <h2 id="a11y-compat" className="mb-4" style={headingStyle}>
              {t.compatTitle}
            </h2>
            <p>{t.compat}</p>
          </section>

          <section aria-labelledby="a11y-limitations">
            <h2 id="a11y-limitations" className="mb-4" style={headingStyle}>
              {t.limitationsTitle}
            </h2>
            <p>{t.limitations}</p>
          </section>

          <section aria-labelledby="a11y-meetings">
            <h2 id="a11y-meetings" className="mb-4" style={headingStyle}>
              {t.meetingsTitle}
            </h2>
            <p>{t.meetings}</p>
          </section>

          <section
            aria-labelledby="a11y-contact"
            className="p-6 md:p-8 bg-[var(--color-background-alt)] border border-[var(--color-border)]"
          >
            <h2 id="a11y-contact" className="mb-4" style={headingStyle}>
              {t.contactTitle}
            </h2>
            <p className="mb-6">{t.contactIntro}</p>
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2" style={{ color: "var(--color-text)" }}>
              {coordinatorName && (
                <>
                  <dt className="font-medium">{t.coordinator}</dt>
                  <dd>{coordinatorName}</dd>
                </>
              )}
              <dt className="font-medium">{t.phone}</dt>
              <dd>
                <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="underline underline-offset-2 hover:text-[var(--color-accent-text)]">
                  <span dir="ltr">{phone}</span>
                </a>
              </dd>
              <dt className="font-medium">{t.email}</dt>
              <dd>
                <a href={`mailto:${email}`} className="underline underline-offset-2 hover:text-[var(--color-accent-text)]">
                  {email}
                </a>
              </dd>
            </dl>
          </section>

          <p className="text-sm">
            {t.updated} <time dateTime={statementUpdated}>{updated}</time>
          </p>
        </div>
      </div>
    </article>
  );
}
