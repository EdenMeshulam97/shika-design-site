"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/a11y/useReducedMotion";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  once?: boolean;
  /** For content at the top of the page: fade in with CSS at first paint instead of waiting for JavaScript */
  immediate?: boolean;
}

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  direction = "up",
  className = "",
  once = true,
  immediate = false,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (immediate) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) observer.unobserve(ref.current);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [once, immediate]);

  const directionStyles = {
    up: "translate3d(0, 30px, 0)",
    down: "translate3d(0, -30px, 0)",
    left: "translate3d(30px, 0, 0)",
    right: "translate3d(-30px, 0, 0)",
    none: "translate3d(0, 0, 0)",
  };

  if (immediate) {
    // Pure CSS animation (globals.css .fade-in-immediate); reduced motion and "Stop animations" turn it off there
    return (
      <div
        className={`fade-in-immediate ${className}`}
        style={
          {
            "--fade-from": directionStyles[direction],
            "--fade-delay": `${delay}s`,
            "--fade-duration": `${duration}s`,
          } as CSSProperties
        }
      >
        {children}
      </div>
    );
  }

  // With reduced motion, content is shown in place with no fade or slide
  if (reducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate3d(0, 0, 0)" : directionStyles[direction],
        transition: `opacity ${duration}s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}s, transform ${duration}s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
