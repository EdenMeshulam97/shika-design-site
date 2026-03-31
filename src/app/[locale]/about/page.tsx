import Image from "next/image";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import FadeIn from "@/components/animations/FadeIn";
import ParallaxImage from "@/components/animations/ParallaxImage";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const values = [
    { key: "craftsmanship" as const, icon: "M12 2L2 7v10l10 5 10-5V7L12 2z" },
    { key: "sustainability" as const, icon: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" },
    { key: "collaboration" as const, icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" },
    { key: "innovation" as const, icon: "M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1800&q=80"
            alt="About Shika"
            priority
            speed={0.1}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center">
          <FadeIn>
            <h1
              className="text-white"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 300,
                letterSpacing: "0.05em",
              }}
            >
              {dict.about.pageTitle}
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* Studio Section */}
      <section className="section-padding bg-[var(--color-background)]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn direction="left">
              <div className="relative aspect-[4/5] img-zoom">
                <Image
                  src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=800&q=80"
                  alt="Our Studio"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </FadeIn>

            <div>
              <FadeIn>
                <div className="separator mb-8" />
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2
                  className="mb-6"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                    color: "var(--color-text)",
                  }}
                >
                  {dict.about.studioTitle}
                </h2>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p
                  className="mb-6 leading-relaxed"
                  style={{ color: "var(--color-text-light)", fontSize: "1.05rem" }}
                >
                  {dict.about.studioDescription}
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p
                  className="leading-relaxed"
                  style={{ color: "var(--color-text-light)", fontSize: "1.05rem" }}
                >
                  {dict.about.studioDescription2}
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding bg-[var(--color-background-alt)]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <div className="separator mx-auto mb-8" />
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2
                className="mb-6"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  color: "var(--color-text)",
                }}
              >
                {dict.about.philosophyTitle}
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p
                className="leading-relaxed"
                style={{
                  color: "var(--color-text-light)",
                  fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
                }}
              >
                {dict.about.philosophyDescription}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="section-padding bg-[var(--color-background)]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <FadeIn>
                <div className="separator mb-8" />
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2
                  className="mb-2"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                    color: "var(--color-text)",
                  }}
                >
                  {dict.about.founderTitle}
                </h2>
              </FadeIn>
              <FadeIn delay={0.15}>
                <p
                  className="mb-1"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.25rem",
                    color: "var(--color-accent)",
                  }}
                >
                  {dict.about.founderName}
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p
                  className="mb-6 text-sm tracking-[0.1em] uppercase"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {dict.about.founderRole}
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p
                  className="leading-relaxed"
                  style={{ color: "var(--color-text-light)", fontSize: "1.05rem" }}
                >
                  {dict.about.founderBio}
                </p>
              </FadeIn>
            </div>

            <FadeIn direction="right" className="order-1 lg:order-2">
              <div className="relative aspect-[3/4] img-zoom">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
                  alt={dict.about.founderName}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-[var(--color-background-alt)]">
        <div className="container-custom">
          <FadeIn>
            <div className="text-center mb-16">
              <div className="separator mx-auto mb-8" />
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  color: "var(--color-text)",
                }}
              >
                {dict.about.values.title}
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {values.map((v, i) => (
              <FadeIn key={v.key} delay={i * 0.1}>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-5 flex items-center justify-center">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="var(--color-accent)"
                      viewBox="0 0 24 24"
                      strokeWidth={1}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={v.icon} />
                    </svg>
                  </div>
                  <h3
                    className="mb-3"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.25rem",
                      color: "var(--color-text)",
                    }}
                  >
                    {dict.about.values[v.key]}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--color-text-light)" }}
                  >
                    {dict.about.values[`${v.key}Desc`]}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
