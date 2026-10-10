"use client";

import { useEffect, useState } from "react";

/** True when the OS asks for reduced motion or the visitor chose "Stop animations" in the accessibility menu */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const root = document.documentElement;
    const check = () => setReduced(media.matches || root.classList.contains("a11y-stop-motion"));

    check();
    media.addEventListener("change", check);
    const observer = new MutationObserver(check);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => {
      media.removeEventListener("change", check);
      observer.disconnect();
    };
  }, []);

  return reduced;
}
