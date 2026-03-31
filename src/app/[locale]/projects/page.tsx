"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { projects } from "@/lib/data/projects";
import type { Locale } from "@/lib/i18n/config";
import FadeIn from "@/components/animations/FadeIn";

// We'll use a client-side approach for filtering
import en from "@/messages/en.json";
import he from "@/messages/he.json";
import ar from "@/messages/ar.json";

const dicts = { en, he, ar };

export default function ProjectsPage() {
  const { locale } = useParams<{ locale: string }>();
  const dict = dicts[locale as keyof typeof dicts] || en;
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = ["all", "residential", "commercial", "hospitality"] as const;

  const filtered = activeCategory === "all"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[var(--color-background)]">
        <div className="container-custom text-center">
          <FadeIn>
            <div className="separator mx-auto mb-8" />
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                color: "var(--color-text)",
                fontWeight: 300,
                marginBottom: "1rem",
              }}
            >
              {dict.projects.pageTitle}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p
              className="max-w-2xl mx-auto"
              style={{ color: "var(--color-text-light)", fontSize: "1.1rem" }}
            >
              {dict.projects.subtitle}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Filter */}
      <section className="pb-8 bg-[var(--color-background)]">
        <div className="container-custom">
          <FadeIn delay={0.3}>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-sm tracking-[0.15em] uppercase pb-1 transition-all duration-300 ${
                    activeCategory === cat
                      ? "text-[var(--color-text)] border-b border-[var(--color-accent)]"
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                  }`}
                >
                  {dict.projects.categories[cat]}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-[var(--color-background)]">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filtered.map((project, i) => (
              <FadeIn key={project.slug} delay={i * 0.08} direction="up">
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
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                    <div className="absolute bottom-4 start-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="inline-block px-4 py-2 bg-white/90 text-[var(--color-text)] text-xs tracking-[0.15em] uppercase">
                        {dict.projects.viewProject}
                      </span>
                    </div>
                  </div>
                  <h3
                    className="mb-1 group-hover:text-[var(--color-accent)] transition-colors"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.25rem",
                      color: "var(--color-text)",
                    }}
                  >
                    {project.title[locale as Locale]}
                  </h3>
                  <p
                    className="text-xs tracking-[0.1em] uppercase"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {project.category} &mdash; {project.location[locale as Locale]}
                  </p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
