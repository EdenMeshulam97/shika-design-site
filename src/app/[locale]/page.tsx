import Link from "next/link";
import Image from "next/image";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { getFeaturedProjects } from "@/lib/data/projects";
import FadeIn from "@/components/animations/FadeIn";
import ParallaxImage from "@/components/animations/ParallaxImage";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const featured = getFeaturedProjects();

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1800&q=80"
            alt="Interior Design"
            priority
            speed={0.1}
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <FadeIn delay={0.2} direction="none">
            <h1
              className="text-white mb-6"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                fontWeight: 300,
                letterSpacing: "0.02em",
                lineHeight: 1.1,
              }}
            >
              {dict.hero.title}
            </h1>
          </FadeIn>

          <FadeIn delay={0.4} direction="none">
            <p
              className="text-white/80 max-w-2xl mx-auto mb-10"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
                fontWeight: 300,
                lineHeight: 1.8,
              }}
            >
              {dict.hero.subtitle}
            </p>
          </FadeIn>

          <FadeIn delay={0.6} direction="none">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/projects`}
                className="inline-block px-8 py-3.5 bg-white text-[var(--color-text)] text-sm tracking-[0.15em] uppercase hover:bg-white/90 transition-colors"
              >
                {dict.hero.cta}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="inline-block px-8 py-3.5 border border-white text-white text-sm tracking-[0.15em] uppercase hover:bg-white/10 transition-colors"
              >
                {dict.hero.ctaSecondary}
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="w-[1px] h-12 bg-white/40 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-white animate-pulse" />
          </div>
        </div>
      </section>

      {/* About Intro */}
      <section className="section-padding bg-[var(--color-background)]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <div className="separator mx-auto mb-8" />
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  color: "var(--color-text)",
                  marginBottom: "1.5rem",
                }}
              >
                {dict.about.studioTitle}
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p
                className="leading-relaxed"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-text-light)",
                  fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
                }}
              >
                {dict.about.studioDescription}
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <Link
                href={`/${locale}/about`}
                className="inline-block mt-8 text-sm tracking-[0.15em] uppercase border-b border-[var(--color-accent)] pb-1 text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
              >
                {dict.common.learnMore}
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
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
                {dict.projects.pageTitle}
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {featured.slice(0, 4).map((project, i) => (
              <FadeIn key={project.slug} delay={i * 0.1} direction="up">
                <Link
                  href={`/${locale}/projects/${project.slug}`}
                  className="group block"
                >
                  <div className="img-zoom relative aspect-[4/3] mb-4">
                    <Image
                      src={project.thumbnail}
                      alt={project.title[locale as Locale]}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                  </div>
                  <h3
                    className="mb-1 group-hover:text-[var(--color-accent)] transition-colors"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
                      color: "var(--color-text)",
                    }}
                  >
                    {project.title[locale as Locale]}
                  </h3>
                  <p
                    className="text-sm tracking-[0.1em] uppercase"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {project.location[locale as Locale]} &mdash; {project.year}
                  </p>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4}>
            <div className="text-center mt-12">
              <Link
                href={`/${locale}/projects`}
                className="inline-block px-8 py-3.5 border border-[var(--color-text)] text-[var(--color-text)] text-sm tracking-[0.15em] uppercase hover:bg-[var(--color-text)] hover:text-white transition-all duration-300"
              >
                {dict.common.viewAll}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-padding bg-[var(--color-background)]">
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
                {dict.process.pageTitle}
              </h2>
              <p
                className="mt-4 max-w-2xl mx-auto"
                style={{
                  color: "var(--color-text-light)",
                  fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
                }}
              >
                {dict.process.subtitle}
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {(["consultation", "concept", "design", "execution"] as const).map((step, i) => (
              <FadeIn key={step} delay={i * 0.1}>
                <div className="text-center">
                  <span
                    className="block mb-4"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "2.5rem",
                      color: "var(--color-accent)",
                      fontWeight: 300,
                    }}
                  >
                    {dict.process.steps[step].number}
                  </span>
                  <h3
                    className="mb-3"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.25rem",
                      color: "var(--color-text)",
                    }}
                  >
                    {dict.process.steps[step].title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--color-text-light)" }}
                  >
                    {dict.process.steps[step].description.slice(0, 120)}...
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4}>
            <div className="text-center mt-12">
              <Link
                href={`/${locale}/process`}
                className="inline-block text-sm tracking-[0.15em] uppercase border-b border-[var(--color-accent)] pb-1 text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
              >
                {dict.common.learnMore}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1800&q=80"
            alt="Contact us"
            speed={0.1}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 text-center px-6">
          <FadeIn>
            <h2
              className="text-white mb-6"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                fontWeight: 300,
              }}
            >
              {dict.contact.subtitle}
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Link
              href={`/${locale}/contact`}
              className="inline-block px-8 py-3.5 bg-white text-[var(--color-text)] text-sm tracking-[0.15em] uppercase hover:bg-white/90 transition-colors"
            >
              {dict.contact.pageTitle}
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
