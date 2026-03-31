"use client";

import { useState, useRef, useEffect } from "react";

// Popular Google Fonts + system fonts - curated list
const FONT_OPTIONS = [
  // Serif
  { name: "Cormorant Garamond", category: "serif", value: "'Cormorant Garamond', Georgia, serif" },
  { name: "Playfair Display", category: "serif", value: "'Playfair Display', Georgia, serif" },
  { name: "Lora", category: "serif", value: "'Lora', Georgia, serif" },
  { name: "Merriweather", category: "serif", value: "'Merriweather', Georgia, serif" },
  { name: "Libre Baskerville", category: "serif", value: "'Libre Baskerville', Georgia, serif" },
  { name: "EB Garamond", category: "serif", value: "'EB Garamond', Georgia, serif" },
  { name: "Crimson Text", category: "serif", value: "'Crimson Text', Georgia, serif" },
  { name: "Source Serif 4", category: "serif", value: "'Source Serif 4', Georgia, serif" },
  { name: "DM Serif Display", category: "serif", value: "'DM Serif Display', Georgia, serif" },
  { name: "Noto Serif", category: "serif", value: "'Noto Serif', Georgia, serif" },
  { name: "PT Serif", category: "serif", value: "'PT Serif', Georgia, serif" },
  { name: "Bitter", category: "serif", value: "'Bitter', Georgia, serif" },
  { name: "Spectral", category: "serif", value: "'Spectral', Georgia, serif" },
  { name: "Josefin Slab", category: "serif", value: "'Josefin Slab', Georgia, serif" },
  { name: "Bodoni Moda", category: "serif", value: "'Bodoni Moda', Georgia, serif" },
  { name: "Cormorant", category: "serif", value: "'Cormorant', Georgia, serif" },
  { name: "Abril Fatface", category: "serif", value: "'Abril Fatface', Georgia, serif" },
  { name: "Old Standard TT", category: "serif", value: "'Old Standard TT', Georgia, serif" },
  { name: "Cardo", category: "serif", value: "'Cardo', Georgia, serif" },
  { name: "Vollkorn", category: "serif", value: "'Vollkorn', Georgia, serif" },
  // Sans-Serif
  { name: "Inter", category: "sans-serif", value: "'Inter', 'Helvetica Neue', sans-serif" },
  { name: "Poppins", category: "sans-serif", value: "'Poppins', 'Helvetica Neue', sans-serif" },
  { name: "Montserrat", category: "sans-serif", value: "'Montserrat', 'Helvetica Neue', sans-serif" },
  { name: "Open Sans", category: "sans-serif", value: "'Open Sans', 'Helvetica Neue', sans-serif" },
  { name: "Roboto", category: "sans-serif", value: "'Roboto', 'Helvetica Neue', sans-serif" },
  { name: "Lato", category: "sans-serif", value: "'Lato', 'Helvetica Neue', sans-serif" },
  { name: "Raleway", category: "sans-serif", value: "'Raleway', 'Helvetica Neue', sans-serif" },
  { name: "Nunito", category: "sans-serif", value: "'Nunito', 'Helvetica Neue', sans-serif" },
  { name: "Work Sans", category: "sans-serif", value: "'Work Sans', 'Helvetica Neue', sans-serif" },
  { name: "DM Sans", category: "sans-serif", value: "'DM Sans', 'Helvetica Neue', sans-serif" },
  { name: "Manrope", category: "sans-serif", value: "'Manrope', 'Helvetica Neue', sans-serif" },
  { name: "Plus Jakarta Sans", category: "sans-serif", value: "'Plus Jakarta Sans', 'Helvetica Neue', sans-serif" },
  { name: "Source Sans 3", category: "sans-serif", value: "'Source Sans 3', 'Helvetica Neue', sans-serif" },
  { name: "Outfit", category: "sans-serif", value: "'Outfit', 'Helvetica Neue', sans-serif" },
  { name: "Mulish", category: "sans-serif", value: "'Mulish', 'Helvetica Neue', sans-serif" },
  { name: "Sora", category: "sans-serif", value: "'Sora', 'Helvetica Neue', sans-serif" },
  { name: "Space Grotesk", category: "sans-serif", value: "'Space Grotesk', 'Helvetica Neue', sans-serif" },
  { name: "Cabin", category: "sans-serif", value: "'Cabin', 'Helvetica Neue', sans-serif" },
  { name: "Quicksand", category: "sans-serif", value: "'Quicksand', 'Helvetica Neue', sans-serif" },
  { name: "Barlow", category: "sans-serif", value: "'Barlow', 'Helvetica Neue', sans-serif" },
  { name: "Josefin Sans", category: "sans-serif", value: "'Josefin Sans', 'Helvetica Neue', sans-serif" },
  { name: "Figtree", category: "sans-serif", value: "'Figtree', 'Helvetica Neue', sans-serif" },
  { name: "Albert Sans", category: "sans-serif", value: "'Albert Sans', 'Helvetica Neue', sans-serif" },
  { name: "Rubik", category: "sans-serif", value: "'Rubik', 'Helvetica Neue', sans-serif" },
  { name: "Karla", category: "sans-serif", value: "'Karla', 'Helvetica Neue', sans-serif" },
  // Display / Handwriting
  { name: "Playfair Display SC", category: "display", value: "'Playfair Display SC', Georgia, serif" },
  { name: "Tenor Sans", category: "display", value: "'Tenor Sans', sans-serif" },
  { name: "Poiret One", category: "display", value: "'Poiret One', sans-serif" },
  { name: "Italiana", category: "display", value: "'Italiana', serif" },
  { name: "Forum", category: "display", value: "'Forum', serif" },
  { name: "Cinzel", category: "display", value: "'Cinzel', Georgia, serif" },
  // System fonts
  { name: "Georgia", category: "system", value: "Georgia, serif" },
  { name: "Times New Roman", category: "system", value: "'Times New Roman', serif" },
  { name: "Helvetica Neue", category: "system", value: "'Helvetica Neue', Helvetica, sans-serif" },
  { name: "Arial", category: "system", value: "Arial, sans-serif" },
  { name: "System UI", category: "system", value: "system-ui, sans-serif" },
];

// Track loaded fonts to avoid duplicate <link> tags
const loadedFonts = new Set<string>();

function loadGoogleFont(fontName: string) {
  if (typeof window === "undefined") return;
  if (loadedFonts.has(fontName)) return;
  const systemFonts = ["Georgia", "Times New Roman", "Helvetica Neue", "Arial", "System UI"];
  if (systemFonts.includes(fontName)) return;
  loadedFonts.add(fontName);
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontName)}:wght@300;400;500;600;700&display=swap`;
  document.head.appendChild(link);
}

interface FontPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function FontPicker({ label, value, onChange }: FontPickerProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Find current font name from value
  const currentFont = FONT_OPTIONS.find((f) => f.value === value);
  const displayName = currentFont?.name || value.split(",")[0].replace(/'/g, "").trim();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (open && searchRef.current) {
      searchRef.current.focus();
    }
  }, [open]);

  // Load fonts for visible items when dropdown opens
  useEffect(() => {
    if (open) {
      const filtered = getFilteredFonts();
      filtered.slice(0, 15).forEach((f) => loadGoogleFont(f.name));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, search, category]);

  const getFilteredFonts = () => {
    return FONT_OPTIONS.filter((f) => {
      const matchSearch = f.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "all" || f.category === category;
      return matchSearch && matchCategory;
    });
  };

  const filtered = getFilteredFonts();
  const categories = [
    { key: "all", label: "All" },
    { key: "serif", label: "Serif" },
    { key: "sans-serif", label: "Sans" },
    { key: "display", label: "Display" },
    { key: "system", label: "System" },
  ];

  return (
    <div ref={containerRef} className="relative">
      <label
        className="block text-[10px] tracking-[0.2em] uppercase mb-2"
        style={{ color: "var(--color-text-muted)" }}
      >
        {label}
      </label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 px-3.5 border text-sm text-start transition-colors duration-200"
        style={{
          background: "var(--color-background)",
          borderColor: open ? "var(--color-accent)" : "var(--color-border)",
          color: "var(--color-text)",
        }}
      >
        <span style={{ fontFamily: value }} className="truncate">
          {displayName}
        </span>
        <svg
          className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          style={{ color: "var(--color-text-muted)" }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute z-50 mt-1 w-full shadow-lg border overflow-hidden"
          style={{
            background: "var(--color-surface)",
            borderColor: "var(--color-border)",
            maxHeight: "340px",
          }}
        >
          {/* Search */}
          <div className="p-2 border-b" style={{ borderColor: "var(--color-border-light)" }}>
            <div className="relative">
              <svg
                className="absolute start-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
                fill="none"
                stroke="var(--color-text-muted)"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search fonts..."
                className="w-full py-2 text-xs bg-transparent border-none outline-none"
                style={{
                  color: "var(--color-text)",
                  paddingInlineStart: "2rem",
                }}
              />
            </div>
          </div>

          {/* Category pills */}
          <div className="flex gap-1 px-2 py-1.5 border-b" style={{ borderColor: "var(--color-border-light)" }}>
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setCategory(cat.key)}
                className="px-2 py-0.5 text-[9px] tracking-wider uppercase transition-colors"
                style={{
                  background: category === cat.key ? "var(--color-accent)" : "transparent",
                  color: category === cat.key ? "white" : "var(--color-text-muted)",
                  borderRadius: "2px",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Font list */}
          <div className="overflow-y-auto" style={{ maxHeight: "240px" }}>
            {filtered.length === 0 ? (
              <div className="px-3 py-4 text-center text-xs" style={{ color: "var(--color-text-muted)" }}>
                No fonts found
              </div>
            ) : (
              filtered.map((font) => (
                <button
                  key={font.name}
                  onClick={() => {
                    loadGoogleFont(font.name);
                    onChange(font.value);
                    setOpen(false);
                    setSearch("");
                  }}
                  onMouseEnter={() => loadGoogleFont(font.name)}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-start transition-colors hover:bg-[var(--color-background-alt)]"
                  style={{
                    background: value === font.value ? "var(--color-background-alt)" : "transparent",
                  }}
                >
                  <span
                    className="text-sm truncate"
                    style={{ fontFamily: font.value, color: "var(--color-text)" }}
                  >
                    {font.name}
                  </span>
                  <span className="text-[9px] tracking-wider uppercase flex-shrink-0 ms-2" style={{ color: "var(--color-text-muted)" }}>
                    {font.category}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
