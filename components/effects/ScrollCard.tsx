"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { subscribeScroll } from "@/lib/scrollBus";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface ScrollCardProps {
  children: ReactNode;
  className?: string;
}

const clamp = (v: number, min: number, max: number) =>
  v < min ? min : v > max ? max : v;

/**
 * Bends a card in 3D according to where it sits in the viewport: upright at
 * the centre, pitched back and pushed away toward the edges, with a shear
 * that tracks scroll velocity. Writes CSS custom properties consumed by the
 * `.scroll-card` utility so the browser only ever animates a transform.
 */
export default function ScrollCard({ children, className }: ScrollCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    return subscribeScroll(({ velocity }) => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // -1 well above the fold, 0 dead centre, +1 well below.
      const p = clamp((r.top + r.height / 2 - vh / 2) / vh, -1, 1);
      const away = Math.abs(p);

      el.style.setProperty("--sc-rx", `${(-p * 11).toFixed(2)}deg`);
      el.style.setProperty("--sc-tz", `${(-away * 110).toFixed(1)}px`);
      el.style.setProperty("--sc-scale", (1 - away * 0.07).toFixed(3));
      el.style.setProperty("--sc-opacity", (1 - away * 0.45).toFixed(3));
      el.style.setProperty(
        "--sc-skew",
        `${clamp(velocity * 0.06, -4, 4).toFixed(2)}deg`
      );
    });
  }, [reduced]);

  return (
    <div ref={ref} className={cn("scroll-card", className)}>
      {children}
    </div>
  );
}
