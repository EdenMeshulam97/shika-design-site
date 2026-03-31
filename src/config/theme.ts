export interface ThemeConfig {
  // Brand
  brand: {
    name: string;
    tagline: string;
    logo?: string;
    heroImage?: string;
    aboutImage?: string;
  };

  // Colors
  colors: {
    primary: string;
    primaryLight: string;
    primaryDark: string;
    secondary: string;
    accent: string;
    background: string;
    backgroundAlt: string;
    surface: string;
    text: string;
    textLight: string;
    textMuted: string;
    border: string;
    borderLight: string;
  };

  // Typography
  typography: {
    fontFamily: {
      heading: string;
      body: string;
    };
    fontSize: {
      hero: string;
      h1: string;
      h2: string;
      h3: string;
      h4: string;
      body: string;
      small: string;
      xs: string;
    };
  };

  // Layout
  layout: {
    maxWidth: string;
    headerHeight: string;
    borderRadius: string;
    sectionPadding: string;
  };

  // Animation
  animation: {
    duration: string;
    easing: string;
    staggerDelay: string;
  };

  // Contact Info
  contact: {
    email: string;
    phone: string;
    address: string;
    instagram?: string;
    facebook?: string;
    pinterest?: string;
    linkedin?: string;
  };
}

export const defaultTheme: ThemeConfig = {
  brand: {
    name: "Shika",
    tagline: "Crafting Spaces That Tell Your Story",
  },

  colors: {
    primary: "#2C2C2C",
    primaryLight: "#4A4A4A",
    primaryDark: "#1A1A1A",
    secondary: "#B8A898",
    accent: "#C4A882",
    background: "#FAFAF8",
    backgroundAlt: "#F3F1EE",
    surface: "#FFFFFF",
    text: "#2C2C2C",
    textLight: "#6B6B6B",
    textMuted: "#9B9B9B",
    border: "#E5E2DD",
    borderLight: "#F0EDE8",
  },

  typography: {
    fontFamily: {
      heading: "'Cormorant Garamond', 'Georgia', serif",
      body: "'Inter', 'Helvetica Neue', sans-serif",
    },
    fontSize: {
      hero: "clamp(2.5rem, 6vw, 5rem)",
      h1: "clamp(2rem, 4vw, 3.5rem)",
      h2: "clamp(1.75rem, 3vw, 2.5rem)",
      h3: "clamp(1.25rem, 2vw, 1.75rem)",
      h4: "clamp(1rem, 1.5vw, 1.25rem)",
      body: "1rem",
      small: "0.875rem",
      xs: "0.75rem",
    },
  },

  layout: {
    maxWidth: "1400px",
    headerHeight: "80px",
    borderRadius: "4px",
    sectionPadding: "clamp(4rem, 8vw, 8rem)",
  },

  animation: {
    duration: "0.6s",
    easing: "cubic-bezier(0.25, 0.1, 0.25, 1)",
    staggerDelay: "0.1s",
  },

  contact: {
    email: "hello@shika-design.com",
    phone: "+972-50-123-4567",
    address: "Tel Aviv, Israel",
    instagram: "https://instagram.com/shika.design",
    facebook: "https://facebook.com/shika.design",
    pinterest: "https://pinterest.com/shika.design",
  },
};

export function getTheme(): ThemeConfig {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("shika-theme");
    if (stored) {
      try {
        return { ...defaultTheme, ...JSON.parse(stored) };
      } catch {
        return defaultTheme;
      }
    }
  }
  return defaultTheme;
}

export function saveTheme(theme: Partial<ThemeConfig>): void {
  if (typeof window !== "undefined") {
    const current = getTheme();
    const merged = deepMerge(current, theme);
    localStorage.setItem("shika-theme", JSON.stringify(merged));
    window.dispatchEvent(new CustomEvent("theme-change", { detail: merged }));
  }
}

function deepMerge<T extends Record<string, unknown>>(target: T, source: Partial<T>): T {
  const result = { ...target };
  for (const key in source) {
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key])
    ) {
      result[key] = deepMerge(
        (target[key] as Record<string, unknown>) || {},
        source[key] as Record<string, unknown>
      ) as T[Extract<keyof T, string>];
    } else if (source[key] !== undefined) {
      result[key] = source[key] as T[Extract<keyof T, string>];
    }
  }
  return result;
}
