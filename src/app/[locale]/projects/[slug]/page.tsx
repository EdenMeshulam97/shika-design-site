import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { projects, getProjectBySlug } from "@/lib/data/projects";
import FadeIn from "@/components/animations/FadeIn";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return projects.flatMap((project) =>
    ["en", "he", "ar"].map((locale) => ({
      locale,
      slug: project.slug,
    }))
  );
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale as Locale);
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <>
      {/* Hero Image */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <Image
          src={project.images[0]}
          alt={project.title[locale as Locale]}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="container-custom">
            <FadeIn>
              <p
                className="text-white/60 text-xs tracking-[0.2em] uppercase mb-3"
              >
                {project.category}
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1
                className="text-white mb-2"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  fontWeight: 300,
                }}
              >
                {project.title[locale as Locale]}
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-white/70 text-sm">
                {project.location[locale as Locale]} &mdash; {project.year}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Project Info */}
      <section className="section-padding bg-[var(--color-background)]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 lg:gap-20">
            {/* Description */}
            <div>
              <FadeIn>
                <div className="separator mb-8" />
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2
                  className="mb-6"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                    color: "var(--color-text)",
                  }}
                >
                  {dict.projectDetail.overview}
                </h2>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p
                  className="leading-relaxed"
                  style={{ color: "var(--color-text-light)", fontSize: "1.05rem" }}
                >
                  {project.description[locale as Locale]}
                </p>
              </FadeIn>
            </div>

            {/* Details Sidebar */}
            <div>
              <FadeIn delay={0.3}>
                <div className="space-y-6 lg:sticky lg:top-28">
                  {[
                    { label: dict.projectDetail.scope, value: project.scope[locale as Locale] },
                    { label: dict.projectDetail.location, value: project.location[locale as Locale] },
                    { label: dict.projectDetail.area, value: project.area },
                    { label: dict.projectDetail.year, value: project.year },
                    { label: dict.projectDetail.duration, value: project.duration[locale as Locale] },
                  ].map((item) => (
                    <div key={item.label} className="pb-4 border-b border-[var(--color-border-light)]">
                      <p
                        className="text-xs tracking-[0.15em] uppercase mb-1"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {item.label}
                      </p>
                      <p className="text-sm" style={{ color: "var(--color-text)" }}>
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding bg-[var(--color-background-alt)]">
        <div className="container-custom">
          <FadeIn>
            <div className="separator mx-auto mb-8" />
            <h2
              className="text-center mb-12"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                color: "var(--color-text)",
              }}
            >
              {dict.projectDetail.gallery}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {project.images.map((img, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="img-zoom relative aspect-[3/2]">
                  <Image
                    src={img}
                    alt={`${project.title[locale as Locale]} - ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Next Project */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <Link href={`/${locale}/projects/${nextProject.slug}`} className="group block h-full">
          <Image
            src={nextProject.thumbnail}
            alt={nextProject.title[locale as Locale]}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500" />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <p className="text-white/60 text-xs tracking-[0.2em] uppercase mb-3">
              {dict.projectDetail.nextProject}
            </p>
            <h3
              className="text-white"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                fontWeight: 300,
              }}
            >
              {nextProject.title[locale as Locale]}
            </h3>
          </div>
        </Link>
      </section>

      {/* Back to Projects */}
      <section className="py-12 bg-[var(--color-background)]">
        <div className="container-custom text-center">
          <Link
            href={`/${locale}/projects`}
            className="inline-block text-sm tracking-[0.15em] uppercase border-b border-[var(--color-accent)] pb-1 text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
          >
            &larr; {dict.projectDetail.backToProjects}
          </Link>
        </div>
      </section>
    </>
  );
}
