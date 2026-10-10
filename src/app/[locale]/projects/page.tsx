import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { projects } from "@/lib/data/projects";
import placeholders from "@/lib/data/image-placeholders.json";
import ProjectsContent, { type ProjectCard } from "./ProjectsContent";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function ProjectsPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  // Send the browser only what the cards need, in the current language
  const cards: ProjectCard[] = projects.map((p) => ({
    slug: p.slug,
    category: p.category,
    title: p.title[locale as Locale],
    location: p.location?.[locale as Locale],
    thumbnail: p.thumbnail,
    blurDataURL: placeholders[p.thumbnail as keyof typeof placeholders],
  }));

  return <ProjectsContent locale={locale} dict={{ projects: dict.projects }} projects={cards} />;
}
