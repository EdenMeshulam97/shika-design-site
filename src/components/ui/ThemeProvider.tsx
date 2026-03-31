"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useTheme } from "@/lib/hooks/useTheme";
import { type ThemeConfig, defaultTheme } from "@/config/theme";

interface ThemeContextType {
  theme: ThemeConfig;
  updateTheme: (updates: Partial<ThemeConfig>) => void;
  resetTheme: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  updateTheme: () => {},
  resetTheme: () => {},
  mounted: false,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const themeData = useTheme();

  return (
    <ThemeContext.Provider value={themeData}>
      <style jsx global>{`
        :root {
          --color-primary: ${themeData.theme.colors.primary};
          --color-primary-light: ${themeData.theme.colors.primaryLight};
          --color-primary-dark: ${themeData.theme.colors.primaryDark};
          --color-secondary: ${themeData.theme.colors.secondary};
          --color-accent: ${themeData.theme.colors.accent};
          --color-background: ${themeData.theme.colors.background};
          --color-background-alt: ${themeData.theme.colors.backgroundAlt};
          --color-surface: ${themeData.theme.colors.surface};
          --color-text: ${themeData.theme.colors.text};
          --color-text-light: ${themeData.theme.colors.textLight};
          --color-text-muted: ${themeData.theme.colors.textMuted};
          --color-border: ${themeData.theme.colors.border};
          --color-border-light: ${themeData.theme.colors.borderLight};
          --font-heading: ${themeData.theme.typography.fontFamily.heading};
          --font-body: ${themeData.theme.typography.fontFamily.body};
        }
      `}</style>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
