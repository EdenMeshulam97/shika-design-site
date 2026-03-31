"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { defaultTheme } from "@/config/theme";
import FadeIn from "@/components/animations/FadeIn";

import en from "@/messages/en.json";
import he from "@/messages/he.json";
import ar from "@/messages/ar.json";

const dicts = { en, he, ar };

export default function ContactPage() {
  const { locale } = useParams<{ locale: string }>();
  const dict = dicts[locale as keyof typeof dicts] || en;
  const contact = defaultTheme.contact;
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSending(false);
    setSubmitted(true);
    setFormState({ name: "", email: "", phone: "", projectType: "", message: "" });
  };

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
              {dict.contact.pageTitle}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p
              className="max-w-2xl mx-auto"
              style={{ color: "var(--color-text-light)", fontSize: "1.1rem" }}
            >
              {dict.contact.subtitle}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-[var(--color-background)]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 lg:gap-24">
            {/* Form */}
            <FadeIn>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      className="block text-xs tracking-[0.15em] uppercase mb-2"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {dict.contact.form.name}
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-0 py-3 bg-transparent border-b border-[var(--color-border)] focus:border-[var(--color-accent)] outline-none transition-colors text-[var(--color-text)]"
                      style={{ fontFamily: "var(--font-body)" }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs tracking-[0.15em] uppercase mb-2"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {dict.contact.form.email}
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-0 py-3 bg-transparent border-b border-[var(--color-border)] focus:border-[var(--color-accent)] outline-none transition-colors text-[var(--color-text)]"
                      style={{ fontFamily: "var(--font-body)" }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      className="block text-xs tracking-[0.15em] uppercase mb-2"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {dict.contact.form.phone}
                    </label>
                    <input
                      type="tel"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full px-0 py-3 bg-transparent border-b border-[var(--color-border)] focus:border-[var(--color-accent)] outline-none transition-colors text-[var(--color-text)]"
                      style={{ fontFamily: "var(--font-body)" }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs tracking-[0.15em] uppercase mb-2"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {dict.contact.form.projectType}
                    </label>
                    <select
                      value={formState.projectType}
                      onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                      className="w-full px-0 py-3 bg-transparent border-b border-[var(--color-border)] focus:border-[var(--color-accent)] outline-none transition-colors text-[var(--color-text)] appearance-none cursor-pointer"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      <option value="">{dict.contact.form.selectType}</option>
                      <option value="residential">{dict.contact.form.types.residential}</option>
                      <option value="commercial">{dict.contact.form.types.commercial}</option>
                      <option value="hospitality">{dict.contact.form.types.hospitality}</option>
                      <option value="consultation">{dict.contact.form.types.consultation}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    className="block text-xs tracking-[0.15em] uppercase mb-2"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {dict.contact.form.message}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-0 py-3 bg-transparent border-b border-[var(--color-border)] focus:border-[var(--color-accent)] outline-none transition-colors text-[var(--color-text)] resize-none"
                    style={{ fontFamily: "var(--font-body)" }}
                  />
                </div>

                {submitted && (
                  <p
                    className="text-sm"
                    style={{ color: "var(--color-accent)" }}
                  >
                    {dict.contact.form.success}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="px-10 py-3.5 bg-[var(--color-text)] text-white text-sm tracking-[0.15em] uppercase hover:bg-[var(--color-primary-light)] transition-colors disabled:opacity-50"
                >
                  {sending ? dict.contact.form.sending : dict.contact.form.submit}
                </button>
              </form>
            </FadeIn>

            {/* Contact Info Sidebar */}
            <div>
              <FadeIn delay={0.2}>
                <div className="space-y-10">
                  <div>
                    <h3
                      className="text-xs tracking-[0.2em] uppercase mb-4"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {dict.contact.info.title}
                    </h3>
                    <div className="space-y-3">
                      <p style={{ color: "var(--color-text)" }}>{contact.email}</p>
                      <p style={{ color: "var(--color-text)" }}>{contact.phone}</p>
                    </div>
                  </div>

                  <div>
                    <h3
                      className="text-xs tracking-[0.2em] uppercase mb-4"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {dict.contact.info.visitTitle}
                    </h3>
                    <p style={{ color: "var(--color-text)" }}>{contact.address}</p>
                  </div>

                  <div>
                    <h3
                      className="text-xs tracking-[0.2em] uppercase mb-4"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {dict.contact.info.followTitle}
                    </h3>
                    <div className="flex gap-6">
                      {contact.instagram && (
                        <a
                          href={contact.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--color-text-light)] hover:text-[var(--color-text)] transition-colors"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          </svg>
                        </a>
                      )}
                      {contact.facebook && (
                        <a
                          href={contact.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--color-text-light)] hover:text-[var(--color-text)] transition-colors"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                        </a>
                      )}
                      {contact.pinterest && (
                        <a
                          href={contact.pinterest}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--color-text-light)] hover:text-[var(--color-text)] transition-colors"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
