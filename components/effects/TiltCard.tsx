"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees at the corners. */
  max?: number;
}

/**
 * Pointer-driven 3D tilt. Writes `--rx` / `--ry` custom properties that the
 * `.tilt` utility consumes. Pure CSS transform, no layout thrash, and it
 * flattens itself when the pointer is coarse or motion is reduced.
 */
export default function TiltCard({ children, className, max = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--ry", `${px * max * 2}deg`);
    el.style.setProperty("--rx", `${-py * max * 2}deg`);
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={cn("tilt", className)}
    >
      {children}
    </div>
  );
}
