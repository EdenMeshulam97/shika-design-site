import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import FadeIn from "@/components/animations/FadeIn";
import ParallaxImage from "@/components/animations/ParallaxImage";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function ProcessPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const steps = ["consultation", "concept", "design", "execution"] as const;

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1618219740975-d40978bb7378?w=1800&q=80"
            alt="Our Process"
            priority
            speed={0.1}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center px-6">
          <FadeIn>
            <h1
              className="text-white mb-4"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 300,
                letterSpacing: "0.05em",
              }}
            >
              {dict.process.pageTitle}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-white/80 max-w-2xl mx-auto" style={{ fontSize: "1.1rem" }}>
              {dict.process.subtitle}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Steps */}
      <section className="section-padding bg-[var(--color-background)]">
        <div className="container-custom max-w-5xl">
          {steps.map((step, i) => (
            <div
              key={step}
              className={`grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-8 lg:gap-16 ${
                i < steps.length - 1 ? "mb-20 lg:mb-28 pb-20 lg:pb-28 border-b border-[var(--color-border-light)]" : ""
              }`}
            >
              {/* Step Number */}
              <FadeIn>
                <span
                  className="block"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "4rem",
                    color: "var(--color-accent)",
                    fontWeight: 300,
                    lineHeight: 1,
                  }}
                >
                  {dict.process.steps[step].number}
                </span>
              </FadeIn>

              {/* Content */}
              <div>
                <FadeIn delay={0.1}>
                  <h2
                    className="mb-6"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                      color: "var(--color-text)",
                    }}
                  >
                    {dict.process.steps[step].title}
                  </h2>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <p
                    className="mb-8 leading-relaxed"
                    style={{
                      color: "var(--color-text-light)",
                      fontSize: "1.05rem",
                      maxWidth: "600px",
                    }}
                  >
                    {dict.process.steps[step].description}
                  </p>
                </FadeIn>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {dict.process.steps[step].details.map((detail: string, j: number) => (
                    <FadeIn key={j} delay={0.3 + j * 0.05}>
                      <div className="flex items-start gap-3">
                        <span
                          className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: "var(--color-accent)" }}
                        />
                        <span
                          className="text-sm"
                          style={{ color: "var(--color-text-light)" }}
                        >
                          {detail}
                        </span>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
