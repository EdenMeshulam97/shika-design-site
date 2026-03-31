"use client";

import { useState, useEffect, useCallback } from "react";
import { type ThemeConfig, getTheme, saveTheme, defaultTheme } from "@/config/theme";

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeConfig>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setThemeState(getTheme());
    setMounted(true);

    const handleThemeChange = (e: CustomEvent<ThemeConfig>) => {
      setThemeState(e.detail);
    };

    window.addEventListener("theme-change", handleThemeChange as EventListener);
    return () => window.removeEventListener("theme-change", handleThemeChange as EventListener);
  }, []);

  const updateTheme = useCallback((updates: Partial<ThemeConfig>) => {
    saveTheme(updates);
    setThemeState(getTheme());
  }, []);

  const resetTheme = useCallback(() => {
    localStorage.removeItem("shika-theme");
    setThemeState(defaultTheme);
    window.dispatchEvent(new CustomEvent("theme-change", { detail: defaultTheme }));
  }, []);

  return { theme, updateTheme, resetTheme, mounted };
}
