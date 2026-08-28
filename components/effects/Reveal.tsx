"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  /** Extra delay in ms, for staggered reveals. */
  delay?: number;
  className?: string;
}

/**
 * Wraps content in a scroll-triggered fade/slide reveal. The animation
 * lives in the `.reveal` / `.is-visible` utilities in globals.css and is
 * neutralised under `prefers-reduced-motion`.
 */
export default function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    // Safety net: never leave content stuck hidden if IO misbehaves.
    const fallback = setTimeout(() => setVisible(true), 1200);
    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
