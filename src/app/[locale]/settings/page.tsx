"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { defaultTheme, type ThemeConfig, getTheme, saveTheme } from "@/config/theme";
import FontPicker from "@/components/ui/FontPicker";

import en from "@/messages/en.json";
import he from "@/messages/he.json";
import ar from "@/messages/ar.json";

const dicts = { en, he, ar };

type TabKey = "brand" | "colors" | "typography" | "layout" | "contact" | "animation";

interface ColorField {
  key: keyof ThemeConfig["colors"];
  label: string;
}

/* ─── Select options for predefined fields ─── */

const DURATION_OPTIONS = [
  "0.2s", "0.3s", "0.4s", "0.5s", "0.6s", "0.7s", "0.8s", "1s", "1.2s", "1.5s",
];

const EASING_OPTIONS = [
  { label: "Ease", value: "ease" },
  { label: "Ease In", value: "ease-in" },
  { label: "Ease Out", value: "ease-out" },
  { label: "Ease In-Out", value: "ease-in-out" },
  { label: "Linear", value: "linear" },
  { label: "Smooth (default)", value: "cubic-bezier(0.25, 0.1, 0.25, 1)" },
  { label: "Snap", value: "cubic-bezier(0.5, 0, 0.1, 1)" },
  { label: "Bounce In", value: "cubic-bezier(0.6, -0.28, 0.74, 0.05)" },
  { label: "Bounce Out", value: "cubic-bezier(0.18, 0.89, 0.32, 1.28)" },
  { label: "Swift", value: "cubic-bezier(0.4, 0, 0.2, 1)" },
];

const STAGGER_OPTIONS = [
  "0.05s", "0.08s", "0.1s", "0.12s", "0.15s", "0.2s", "0.25s", "0.3s",
];

const MAX_WIDTH_OPTIONS = [
  "1000px", "1100px", "1200px", "1300px", "1400px", "1500px", "1600px",
];

const HEADER_HEIGHT_OPTIONS = [
  "60px", "64px", "70px", "72px", "80px", "90px", "100px",
];

const BORDER_RADIUS_OPTIONS = [
  "0px", "2px", "4px", "6px", "8px", "10px", "12px", "16px",
];

const SECTION_PADDING_OPTIONS = [
  "clamp(2rem, 4vw, 4rem)",
  "clamp(3rem, 6vw, 6rem)",
  "clamp(4rem, 8vw, 8rem)",
  "clamp(5rem, 10vw, 10rem)",
  "clamp(6rem, 12vw, 12rem)",
];

const FONT_SIZE_OPTIONS: Record<string, string[]> = {
  hero: [
    "clamp(2rem, 5vw, 4rem)",
    "clamp(2.5rem, 6vw, 5rem)",
    "clamp(3rem, 7vw, 6rem)",
    "clamp(3.5rem, 8vw, 7rem)",
  ],
  h1: [
    "clamp(1.75rem, 3.5vw, 3rem)",
    "clamp(2rem, 4vw, 3.5rem)",
    "clamp(2.25rem, 4.5vw, 4rem)",
  ],
  h2: [
    "clamp(1.5rem, 2.5vw, 2rem)",
    "clamp(1.75rem, 3vw, 2.5rem)",
    "clamp(2rem, 3.5vw, 3rem)",
  ],
  h3: [
    "clamp(1.125rem, 1.75vw, 1.5rem)",
    "clamp(1.25rem, 2vw, 1.75rem)",
    "clamp(1.5rem, 2.25vw, 2rem)",
  ],
  h4: [
    "clamp(0.875rem, 1.25vw, 1rem)",
    "clamp(1rem, 1.5vw, 1.25rem)",
    "clamp(1.125rem, 1.75vw, 1.5rem)",
  ],
  body: ["0.875rem", "0.9375rem", "1rem", "1.0625rem", "1.125rem"],
  small: ["0.75rem", "0.8125rem", "0.875rem", "0.9375rem"],
  xs: ["0.625rem", "0.6875rem", "0.75rem", "0.8125rem"],
};

export default function SettingsPage() {
  const { locale } = useParams<{ locale: string }>();
  const dict = dicts[locale as keyof typeof dicts] || en;
  const [theme, setTheme] = useState<ThemeConfig>(defaultTheme);
  const [activeTab, setActiveTab] = useState<TabKey>("brand");
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const initialTheme = useRef<string>("");

  useEffect(() => {
    const loaded = getTheme();
    setTheme(loaded);
    initialTheme.current = JSON.stringify(loaded);
  }, []);

  useEffect(() => {
    setHasChanges(JSON.stringify(theme) !== initialTheme.current);
  }, [theme]);

  const tabs: { key: TabKey; label: string; icon: string }[] = [
    { key: "brand", label: dict.settings.tabs?.brand ?? "Brand", icon: "M12 2L2 7v10l10 5 10-5V7L12 2z" },
    { key: "colors", label: dict.settings.tabs?.colors ?? "Colors", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" },
    { key: "typography", label: dict.settings.tabs?.typography ?? "Typography", icon: "M4 7V4h16v3M9 20h6M12 4v16" },
    { key: "layout", label: dict.settings.tabs?.layout ?? "Layout", icon: "M3 3h18v18H3zM3 9h18M9 21V9" },
    { key: "contact", label: dict.settings.tabs?.contact ?? "Contact", icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6" },
    { key: "animation", label: dict.settings.tabs?.animation ?? "Animation", icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8z" },
  ];

  const allColorFields: ColorField[] = [
    { key: "primary", label: dict.settings.primary },
    { key: "primaryLight", label: dict.settings.primaryLight ?? "Primary Light" },
    { key: "primaryDark", label: dict.settings.primaryDark ?? "Primary Dark" },
    { key: "secondary", label: dict.settings.secondary },
    { key: "accent", label: dict.settings.accent },
    { key: "background", label: dict.settings.background },
    { key: "backgroundAlt", label: dict.settings.backgroundAlt },
    { key: "surface", label: dict.settings.surface ?? "Surface" },
    { key: "text", label: dict.settings.text },
    { key: "textLight", label: dict.settings.textLight },
    { key: "textMuted", label: dict.settings.textMuted ?? "Text Muted" },
    { key: "border", label: dict.settings.border ?? "Border" },
    { key: "borderLight", label: dict.settings.borderLight ?? "Border Light" },
  ];

  const updateColor = useCallback((key: keyof ThemeConfig["colors"], value: string) => {
    setTheme((prev) => ({ ...prev, colors: { ...prev.colors, [key]: value } }));
  }, []);

  const handleSave = () => {
    saveTheme(theme);
    initialTheme.current = JSON.stringify(theme);
    setHasChanges(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    localStorage.removeItem("shika-theme");
    setTheme(defaultTheme);
    initialTheme.current = JSON.stringify(defaultTheme);
    setHasChanges(false);
    window.dispatchEvent(new CustomEvent("theme-change", { detail: defaultTheme }));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleImageUpload = async (field: "logo" | "heroImage" | "aboutImage", file: File) => {
    setUploading(field);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) {
        setTheme((p) => ({ ...p, brand: { ...p.brand, [field]: data.url } }));
      }
    } catch {
      // Upload failed silently
    } finally {
      setUploading(null);
    }
  };

  return (
    <section className="pt-28 pb-32 min-h-screen" style={{ background: "var(--color-background)" }}>
      <div className="container-custom max-w-[1100px]">
        {/* Header */}
        <div className="mb-10">
          <div className="separator mb-6" />
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "var(--color-text)",
              fontWeight: 300,
              marginBottom: "0.5rem",
            }}
          >
            {dict.settings.pageTitle}
          </h1>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            {dict.settings.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
          {/* Sidebar Tabs */}
          <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 -mx-2 px-2 lg:mx-0 lg:px-0">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="flex items-center gap-3 px-4 py-3 text-start rounded-sm whitespace-nowrap transition-all duration-200"
                style={{
                  background: activeTab === tab.key ? "var(--color-background-alt)" : "transparent",
                  color: activeTab === tab.key ? "var(--color-text)" : "var(--color-text-muted)",
                  borderInlineStart: activeTab === tab.key ? "2px solid var(--color-accent)" : "2px solid transparent",
                }}
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
                </svg>
                <span className="text-sm tracking-wide">{tab.label}</span>
              </button>
            ))}
          </nav>

          {/* Content Area */}
          <div className="min-w-0">
            {/* Brand Tab */}
            {activeTab === "brand" && (
              <SettingsCard title={dict.settings.brand ?? "Brand Identity"}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
                  <InputField
                    label={dict.settings.brandName}
                    value={theme.brand.name}
                    onChange={(v) => setTheme((p) => ({ ...p, brand: { ...p.brand, name: v } }))}
                  />
                  <InputField
                    label={dict.settings.brandTagline}
                    value={theme.brand.tagline}
                    onChange={(v) => setTheme((p) => ({ ...p, brand: { ...p.brand, tagline: v } }))}
                  />
                </div>

                {/* Image Uploads */}
                <div className="border-t pt-8 mb-10" style={{ borderColor: "var(--color-border-light)" }}>
                  <h3 className="text-xs tracking-[0.2em] uppercase mb-6" style={{ color: "var(--color-text-muted)" }}>
                    Brand Images
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <ImageUploadField
                      label="Logo"
                      value={theme.brand.logo}
                      uploading={uploading === "logo"}
                      onUpload={(f) => handleImageUpload("logo", f)}
                      onRemove={() => setTheme((p) => ({ ...p, brand: { ...p.brand, logo: undefined } }))}
                    />
                    <ImageUploadField
                      label="Hero Image"
                      value={theme.brand.heroImage}
                      uploading={uploading === "heroImage"}
                      onUpload={(f) => handleImageUpload("heroImage", f)}
                      onRemove={() => setTheme((p) => ({ ...p, brand: { ...p.brand, heroImage: undefined } }))}
                    />
                    <ImageUploadField
                      label="About Image"
                      value={theme.brand.aboutImage}
                      uploading={uploading === "aboutImage"}
                      onUpload={(f) => handleImageUpload("aboutImage", f)}
                      onRemove={() => setTheme((p) => ({ ...p, brand: { ...p.brand, aboutImage: undefined } }))}
                    />
                  </div>
                </div>

                {/* Brand Font */}
                <div className="border-t pt-8 mb-10" style={{ borderColor: "var(--color-border-light)" }}>
                  <h3 className="text-xs tracking-[0.2em] uppercase mb-6" style={{ color: "var(--color-text-muted)" }}>
                    Brand Typography
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <FontPicker
                      label={dict.settings.headingFont}
                      value={theme.typography.fontFamily.heading}
                      onChange={(v) =>
                        setTheme((p) => ({
                          ...p,
                          typography: { ...p.typography, fontFamily: { ...p.typography.fontFamily, heading: v } },
                        }))
                      }
                    />
                    <FontPicker
                      label={dict.settings.bodyFont}
                      value={theme.typography.fontFamily.body}
                      onChange={(v) =>
                        setTheme((p) => ({
                          ...p,
                          typography: { ...p.typography, fontFamily: { ...p.typography.fontFamily, body: v } },
                        }))
                      }
                    />
                  </div>
                </div>

                {/* Brand Preview */}
                <div className="p-8 rounded-sm" style={{ background: "var(--color-background-alt)", border: "1px solid var(--color-border-light)" }}>
                  <p className="text-[10px] tracking-[0.25em] uppercase mb-5" style={{ color: "var(--color-text-muted)" }}>
                    {dict.settings.previewTitle ?? "Live Preview"}
                  </p>
                  <div className="flex items-center gap-6 mb-6">
                    {theme.brand.logo ? (
                      <div className="w-14 h-14 rounded-sm overflow-hidden flex-shrink-0">
                        <Image src={theme.brand.logo} alt="Logo" width={56} height={56} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div
                        className="w-14 h-14 rounded-sm flex items-center justify-center text-white text-xl font-light flex-shrink-0"
                        style={{ background: theme.colors.primary, fontFamily: theme.typography.fontFamily.heading }}
                      >
                        {theme.brand.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h3
                        className="text-xl tracking-[0.1em]"
                        style={{ fontFamily: theme.typography.fontFamily.heading, color: theme.colors.text }}
                      >
                        {theme.brand.name}
                      </h3>
                      <p className="text-xs mt-0.5" style={{ color: theme.colors.textLight, fontFamily: theme.typography.fontFamily.body }}>
                        {theme.brand.tagline}
                      </p>
                    </div>
                  </div>
                  <div className="w-[50px] h-[1px] mb-4" style={{ background: theme.colors.accent }} />
                  <div className="flex gap-3">
                    <span
                      className="inline-block px-5 py-2 text-[10px] tracking-[0.15em] uppercase text-white transition-opacity hover:opacity-90"
                      style={{ background: theme.colors.primary }}
                    >
                      Primary
                    </span>
                    <span
                      className="inline-block px-5 py-2 text-[10px] tracking-[0.15em] uppercase border"
                      style={{ borderColor: theme.colors.primary, color: theme.colors.primary }}
                    >
                      Secondary
                    </span>
                    <span
                      className="inline-block px-5 py-2 text-[10px] tracking-[0.15em] uppercase text-white"
                      style={{ background: theme.colors.accent }}
                    >
                      Accent
                    </span>
                  </div>
                </div>
              </SettingsCard>
            )}

            {/* Colors Tab */}
            {activeTab === "colors" && (
              <SettingsCard
                title={dict.settings.colors}
                description={dict.settings.colorsDesc ?? "Define the color palette that shapes your brand's visual identity."}
              >
                {/* Color Palette Overview */}
                <div className="flex gap-1 mb-10 rounded-sm overflow-hidden h-16">
                  {allColorFields.map((f) => (
                    <div
                      key={f.key}
                      className="flex-1 cursor-pointer transition-all duration-200 hover:flex-[2] group relative"
                      style={{ background: theme.colors[f.key] }}
                      title={f.label}
                    >
                      <div className="absolute inset-x-0 bottom-0 bg-black/60 text-white text-[8px] tracking-wider text-center py-0.5 opacity-0 group-hover:opacity-100 transition-opacity uppercase">
                        {f.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Color Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                  {allColorFields.map((field) => (
                    <ColorPickerField
                      key={field.key}
                      label={field.label}
                      value={theme.colors[field.key]}
                      onChange={(v) => updateColor(field.key, v)}
                    />
                  ))}
                </div>
              </SettingsCard>
            )}

            {/* Typography Tab */}
            {activeTab === "typography" && (
              <SettingsCard
                title={dict.settings.typography}
                description={dict.settings.typographyDesc ?? "Choose the typefaces that express your brand voice."}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
                  <div>
                    <FontPicker
                      label={dict.settings.headingFont}
                      value={theme.typography.fontFamily.heading}
                      onChange={(v) =>
                        setTheme((p) => ({
                          ...p,
                          typography: { ...p.typography, fontFamily: { ...p.typography.fontFamily, heading: v } },
                        }))
                      }
                    />
                    <div className="mt-4 p-5 rounded-sm" style={{ background: "var(--color-background-alt)" }}>
                      <p className="text-[10px] tracking-[0.2em] uppercase mb-3" style={{ color: "var(--color-text-muted)" }}>Preview</p>
                      <p style={{ fontFamily: theme.typography.fontFamily.heading, fontSize: "1.75rem", color: "var(--color-text)", lineHeight: 1.2 }}>
                        The Art of Interior Design
                      </p>
                      <p className="mt-2" style={{ fontFamily: theme.typography.fontFamily.heading, fontSize: "1.1rem", color: "var(--color-text-light)" }}>
                        Creating spaces that inspire
                      </p>
                    </div>
                  </div>
                  <div>
                    <FontPicker
                      label={dict.settings.bodyFont}
                      value={theme.typography.fontFamily.body}
                      onChange={(v) =>
                        setTheme((p) => ({
                          ...p,
                          typography: { ...p.typography, fontFamily: { ...p.typography.fontFamily, body: v } },
                        }))
                      }
                    />
                    <div className="mt-4 p-5 rounded-sm" style={{ background: "var(--color-background-alt)" }}>
                      <p className="text-[10px] tracking-[0.2em] uppercase mb-3" style={{ color: "var(--color-text-muted)" }}>Preview</p>
                      <p style={{ fontFamily: theme.typography.fontFamily.body, fontSize: "0.95rem", color: "var(--color-text)", lineHeight: 1.7 }}>
                        We believe that great design goes beyond aesthetics. It&apos;s about creating spaces that enhance daily life and stand the test of time.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Font Sizes */}
                <div className="border-t pt-8" style={{ borderColor: "var(--color-border-light)" }}>
                  <h3 className="text-xs tracking-[0.2em] uppercase mb-6" style={{ color: "var(--color-text-muted)" }}>
                    {dict.settings.fontSizes ?? "Font Sizes"}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {([
                      ["hero", dict.settings.heroSize ?? "Hero"],
                      ["h1", dict.settings.h1Size ?? "H1"],
                      ["h2", dict.settings.h2Size ?? "H2"],
                      ["h3", dict.settings.h3Size ?? "H3"],
                      ["h4", dict.settings.h4Size ?? "H4"],
                      ["body", dict.settings.bodySize ?? "Body"],
                      ["small", dict.settings.smallSize ?? "Small"],
                      ["xs", dict.settings.xsSize ?? "XS"],
                    ] as [keyof ThemeConfig["typography"]["fontSize"], string][]).map(([key, label]) => (
                      <SelectField
                        key={key}
                        label={label}
                        value={theme.typography.fontSize[key]}
                        options={FONT_SIZE_OPTIONS[key]}
                        onChange={(v) =>
                          setTheme((p) => ({
                            ...p,
                            typography: { ...p.typography, fontSize: { ...p.typography.fontSize, [key]: v } },
                          }))
                        }
                        mono
                      />
                    ))}
                  </div>
                </div>
              </SettingsCard>
            )}

            {/* Layout Tab */}
            {activeTab === "layout" && (
              <SettingsCard
                title={dict.settings.layout ?? "Layout & Spacing"}
                description={dict.settings.layoutDesc ?? "Control the structural dimensions of the site."}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <SelectField
                    label={dict.settings.maxWidth ?? "Max Content Width"}
                    value={theme.layout.maxWidth}
                    options={MAX_WIDTH_OPTIONS}
                    onChange={(v) => setTheme((p) => ({ ...p, layout: { ...p.layout, maxWidth: v } }))}
                    mono
                  />
                  <SelectField
                    label={dict.settings.headerHeight ?? "Header Height"}
                    value={theme.layout.headerHeight}
                    options={HEADER_HEIGHT_OPTIONS}
                    onChange={(v) => setTheme((p) => ({ ...p, layout: { ...p.layout, headerHeight: v } }))}
                    mono
                  />
                  <SelectField
                    label={dict.settings.borderRadius ?? "Border Radius"}
                    value={theme.layout.borderRadius}
                    options={BORDER_RADIUS_OPTIONS}
                    onChange={(v) => setTheme((p) => ({ ...p, layout: { ...p.layout, borderRadius: v } }))}
                    mono
                  />
                  <SelectField
                    label={dict.settings.sectionPadding ?? "Section Padding"}
                    value={theme.layout.sectionPadding}
                    options={SECTION_PADDING_OPTIONS}
                    onChange={(v) => setTheme((p) => ({ ...p, layout: { ...p.layout, sectionPadding: v } }))}
                    mono
                  />
                </div>

                {/* Layout Visual */}
                <div className="mt-10 p-6 rounded-sm" style={{ background: "var(--color-background-alt)", border: "1px solid var(--color-border-light)" }}>
                  <p className="text-[10px] tracking-[0.25em] uppercase mb-4" style={{ color: "var(--color-text-muted)" }}>
                    {dict.settings.previewTitle ?? "Live Preview"}
                  </p>
                  <div className="relative border-2 border-dashed rounded-sm p-4" style={{ borderColor: "var(--color-border)", maxWidth: "100%" }}>
                    <div
                      className="rounded-sm mb-3 flex items-center justify-between px-4"
                      style={{ background: "var(--color-surface)", height: "32px", border: "1px solid var(--color-border-light)" }}
                    >
                      <div className="w-10 h-2 rounded-full" style={{ background: "var(--color-text)" }} />
                      <div className="flex gap-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="w-6 h-1.5 rounded-full" style={{ background: "var(--color-border)" }} />
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-20 rounded-sm" style={{ background: "var(--color-secondary)", opacity: 0.3 }} />
                      <div className="grid grid-cols-3 gap-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="h-12 rounded-sm" style={{ background: "var(--color-border)" }} />
                        ))}
                      </div>
                    </div>
                    <div className="absolute -top-5 left-0 right-0 flex justify-center">
                      <span className="text-[9px] px-2 py-0.5 rounded-full" style={{ background: "var(--color-accent)", color: "white" }}>
                        {theme.layout.maxWidth}
                      </span>
                    </div>
                  </div>
                </div>
              </SettingsCard>
            )}

            {/* Contact Tab */}
            {activeTab === "contact" && (
              <SettingsCard
                title={dict.settings.contact ?? "Contact Information"}
                description={dict.settings.contactDesc ?? "Update your studio's contact details and social links."}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
                  <InputField
                    label={dict.settings.email ?? "Email"}
                    value={theme.contact.email}
                    onChange={(v) => setTheme((p) => ({ ...p, contact: { ...p.contact, email: v } }))}
                    icon="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6"
                  />
                  <InputField
                    label={dict.settings.phone ?? "Phone"}
                    value={theme.contact.phone}
                    onChange={(v) => setTheme((p) => ({ ...p, contact: { ...p.contact, phone: v } }))}
                    icon="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z"
                  />
                  <InputField
                    label={dict.settings.address ?? "Address"}
                    value={theme.contact.address}
                    onChange={(v) => setTheme((p) => ({ ...p, contact: { ...p.contact, address: v } }))}
                    icon="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0zM12 13a3 3 0 100-6 3 3 0 000 6z"
                  />
                </div>

                {/* Social Links */}
                <div className="border-t pt-8" style={{ borderColor: "var(--color-border-light)" }}>
                  <h3 className="text-xs tracking-[0.2em] uppercase mb-6" style={{ color: "var(--color-text-muted)" }}>
                    Social Links
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <InputField
                      label={dict.settings.instagram ?? "Instagram"}
                      value={theme.contact.instagram ?? ""}
                      onChange={(v) => setTheme((p) => ({ ...p, contact: { ...p.contact, instagram: v } }))}
                      placeholder="https://instagram.com/..."
                    />
                    <InputField
                      label={dict.settings.facebook ?? "Facebook"}
                      value={theme.contact.facebook ?? ""}
                      onChange={(v) => setTheme((p) => ({ ...p, contact: { ...p.contact, facebook: v } }))}
                      placeholder="https://facebook.com/..."
                    />
                    <InputField
                      label={dict.settings.pinterest ?? "Pinterest"}
                      value={theme.contact.pinterest ?? ""}
                      onChange={(v) => setTheme((p) => ({ ...p, contact: { ...p.contact, pinterest: v } }))}
                      placeholder="https://pinterest.com/..."
                    />
                    <InputField
                      label={dict.settings.linkedin ?? "LinkedIn"}
                      value={theme.contact.linkedin ?? ""}
                      onChange={(v) => setTheme((p) => ({ ...p, contact: { ...p.contact, linkedin: v } }))}
                      placeholder="https://linkedin.com/..."
                    />
                  </div>
                </div>
              </SettingsCard>
            )}

            {/* Animation Tab */}
            {activeTab === "animation" && (
              <SettingsCard
                title={dict.settings.animation ?? "Animation"}
                description={dict.settings.animationDesc ?? "Fine-tune the motion and transitions."}
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
                  <SelectField
                    label={dict.settings.animDuration ?? "Duration"}
                    value={theme.animation.duration}
                    options={DURATION_OPTIONS}
                    onChange={(v) => setTheme((p) => ({ ...p, animation: { ...p.animation, duration: v } }))}
                    mono
                  />
                  <SelectField
                    label={dict.settings.animEasing ?? "Easing"}
                    value={theme.animation.easing}
                    options={EASING_OPTIONS.map((e) => e.value)}
                    optionLabels={EASING_OPTIONS.map((e) => e.label)}
                    onChange={(v) => setTheme((p) => ({ ...p, animation: { ...p.animation, easing: v } }))}
                  />
                  <SelectField
                    label={dict.settings.animStagger ?? "Stagger Delay"}
                    value={theme.animation.staggerDelay}
                    options={STAGGER_OPTIONS}
                    onChange={(v) => setTheme((p) => ({ ...p, animation: { ...p.animation, staggerDelay: v } }))}
                    mono
                  />
                </div>

                {/* Animation Preview */}
                <div className="p-6 rounded-sm" style={{ background: "var(--color-background-alt)", border: "1px solid var(--color-border-light)" }}>
                  <p className="text-[10px] tracking-[0.25em] uppercase mb-5" style={{ color: "var(--color-text-muted)" }}>
                    {dict.settings.previewTitle ?? "Live Preview"}
                  </p>
                  <AnimationPreview duration={theme.animation.duration} easing={theme.animation.easing} stagger={theme.animation.staggerDelay} />
                </div>
              </SettingsCard>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Save Bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 transition-all duration-300"
        style={{
          transform: hasChanges || saved ? "translateY(0)" : "translateY(100%)",
          background: "var(--color-surface)",
          borderTop: "1px solid var(--color-border)",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.06)",
        }}
      >
        <div className="container-custom max-w-[1100px] py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {hasChanges && !saved && (
              <>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--color-accent)" }} />
                <span className="text-sm" style={{ color: "var(--color-text-light)" }}>
                  {dict.settings.unsavedChanges ?? "You have unsaved changes"}
                </span>
              </>
            )}
            {saved && (
              <>
                <svg className="w-4 h-4" fill="none" stroke="var(--color-accent)" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm" style={{ color: "var(--color-accent)" }}>
                  {dict.settings.saved}
                </span>
              </>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="px-6 py-2.5 text-xs tracking-[0.15em] uppercase border transition-colors duration-200 hover:border-[var(--color-text)]"
              style={{ borderColor: "var(--color-border)", color: "var(--color-text-light)" }}
            >
              {dict.settings.reset}
            </button>
            <button
              onClick={handleSave}
              disabled={!hasChanges}
              className="px-6 py-2.5 text-xs tracking-[0.15em] uppercase text-white transition-all duration-200 disabled:opacity-40"
              style={{ background: hasChanges ? "var(--color-text)" : "var(--color-text-muted)" }}
            >
              {dict.settings.save}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Sub-components ─── */

function SettingsCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="p-8 md:p-10 rounded-sm"
      style={{ background: "var(--color-surface)", border: "1px solid var(--color-border-light)" }}
    >
      <div className="mb-8">
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.5rem",
            color: "var(--color-text)",
            fontWeight: 400,
            marginBottom: description ? "0.5rem" : 0,
          }}
        >
          {title}
        </h2>
        {description && (
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  mono,
  icon,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  mono?: boolean;
  icon?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: "var(--color-text-muted)" }}>
        {label}
      </label>
      <div className="relative">
        {icon && (
          <svg
            className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4"
            fill="none"
            stroke="var(--color-text-muted)"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
          </svg>
        )}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full py-3 border transition-colors duration-200 outline-none ${
            mono ? "font-mono text-xs" : "text-sm"
          }`}
          style={{
            background: "var(--color-background)",
            borderColor: "var(--color-border)",
            color: "var(--color-text)",
            paddingInlineStart: icon ? "2.25rem" : "0.875rem",
            paddingInlineEnd: "0.875rem",
          }}
        />
      </div>
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  optionLabels,
  onChange,
  mono,
}: {
  label: string;
  value: string;
  options: string[];
  optionLabels?: string[];
  onChange: (v: string) => void;
  mono?: boolean;
}) {
  const isInList = options.includes(value);
  const allOptions = isInList ? options : [value, ...options];
  const allLabels = isInList
    ? optionLabels
    : optionLabels
      ? [`${value} (current)`, ...optionLabels]
      : undefined;

  return (
    <div>
      <label className="block text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: "var(--color-text-muted)" }}>
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full py-3 border transition-colors duration-200 outline-none appearance-none cursor-pointer ${
            mono ? "font-mono text-xs" : "text-sm"
          }`}
          style={{
            background: "var(--color-background)",
            borderColor: "var(--color-border)",
            color: "var(--color-text)",
            paddingInlineStart: "0.875rem",
            paddingInlineEnd: "2.25rem",
          }}
        >
          {allOptions.map((opt, i) => (
            <option key={opt} value={opt}>
              {allLabels ? allLabels[i] : opt}
            </option>
          ))}
        </select>
        <svg
          className="absolute end-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
          fill="none"
          stroke="var(--color-text-muted)"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

function ColorPickerField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="group">
      <label className="block text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: "var(--color-text-muted)" }}>
        {label}
      </label>
      <div
        className="flex items-center gap-3 p-2 border transition-colors duration-200"
        style={{ borderColor: "var(--color-border)", background: "var(--color-background)" }}
      >
        <div className="relative">
          <div
            className="w-9 h-9 rounded-sm border cursor-pointer"
            style={{ background: value, borderColor: "var(--color-border-light)" }}
          />
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-xs font-mono uppercase"
          style={{ color: "var(--color-text)" }}
        />
      </div>
    </div>
  );
}

function ImageUploadField({
  label,
  value,
  uploading,
  onUpload,
  onRemove,
}: {
  label: string;
  value?: string;
  uploading: boolean;
  onUpload: (file: File) => void;
  onRemove: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <label className="block text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: "var(--color-text-muted)" }}>
        {label}
      </label>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onUpload(file);
          e.target.value = "";
        }}
      />

      {value ? (
        <div className="relative group">
          <div
            className="aspect-[4/3] rounded-sm overflow-hidden border"
            style={{ borderColor: "var(--color-border-light)" }}
          >
            <Image src={value} alt={label} width={300} height={225} className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              onClick={() => inputRef.current?.click()}
              className="px-3 py-1.5 text-[9px] tracking-wider uppercase text-white border border-white/60 hover:border-white transition-colors"
            >
              Replace
            </button>
            <button
              onClick={onRemove}
              className="px-3 py-1.5 text-[9px] tracking-wider uppercase text-white border border-white/60 hover:border-red-400 hover:text-red-400 transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full aspect-[4/3] border-2 border-dashed rounded-sm flex flex-col items-center justify-center gap-2 transition-colors hover:border-[var(--color-accent)]"
          style={{ borderColor: "var(--color-border)", background: "var(--color-background)" }}
        >
          {uploading ? (
            <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "var(--color-accent)", borderTopColor: "transparent" }} />
          ) : (
            <>
              <svg className="w-6 h-6" fill="none" stroke="var(--color-text-muted)" viewBox="0 0 24 24" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-[9px] tracking-wider uppercase" style={{ color: "var(--color-text-muted)" }}>
                Upload
              </span>
            </>
          )}
        </button>
      )}
    </div>
  );
}

function AnimationPreview({ duration, easing, stagger }: { duration: string; easing: string; stagger: string }) {
  const [playing, setPlaying] = useState(false);
  const [key, setKey] = useState(0);

  const play = () => {
    setPlaying(false);
    setKey((k) => k + 1);
    requestAnimationFrame(() => setPlaying(true));
  };

  return (
    <div>
      <div className="flex gap-3 mb-5" key={key}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-14 flex-1 rounded-sm"
            style={{
              background: "var(--color-accent)",
              opacity: playing ? 1 : 0.15,
              transform: playing ? "translateY(0)" : "translateY(12px)",
              transition: `opacity ${duration} ${easing} ${parseFloat(stagger) * i}s, transform ${duration} ${easing} ${parseFloat(stagger) * i}s`,
            }}
          />
        ))}
      </div>
      <button
        onClick={play}
        className="flex items-center gap-2 px-4 py-2 text-[10px] tracking-[0.15em] uppercase border transition-colors hover:border-[var(--color-text)]"
        style={{ borderColor: "var(--color-border)", color: "var(--color-text-light)" }}
      >
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
        Play Animation
      </button>
    </div>
  );
}
