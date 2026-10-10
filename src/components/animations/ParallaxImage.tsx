"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "@/lib/a11y/useReducedMotion";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  /** Load this image first (for the hero photo at the top of the page) */
  preload?: boolean;
  objectPosition?: string;
}

export default function ParallaxImage({
  src,
  alt,
  className = "",
  speed = 0.15,
  preload = false,
  objectPosition = "center",
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const reducedMotion = useReducedMotion();

  // Move the photo directly, at most once per frame, instead of re-rendering on every scroll event
  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;
    if (reducedMotion) {
      image.style.transform = "";
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!ref.current) return;
      const scrollProgress = ref.current.getBoundingClientRect().top / window.innerHeight;
      image.style.transform = `translateY(${scrollProgress * speed * 100}px) scale(1.1)`;
    };
    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(frame);
    };
  }, [speed, reducedMotion]);

  return (
    <div ref={ref} className={`relative w-full h-full overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover pan-x-mobile"
        ref={imageRef}
        style={{ objectPosition }}
        sizes="100vw"
        preload={preload}
      />
    </div>
  );
}
