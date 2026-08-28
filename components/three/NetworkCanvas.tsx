"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useIsDark } from "@/hooks/useIsDark";
import type { NetworkVariant } from "./NetworkScene";

// WebGL is client-only and code-split so three.js never blocks first paint.
const NetworkScene = dynamic(() => import("./NetworkScene"), { ssr: false });

interface NetworkCanvasProps {
  variant?: NetworkVariant;
  className?: string;
  /** Render the static accent glow behind the graph (hero only). */
  bloom?: boolean;
}

/**
 * Mounts the network graph after first paint, skips WebGL entirely under
 * `prefers-reduced-motion`, and re-mounts on theme change so the scene
 * repaints with the light/dark palette.
 */
export default function NetworkCanvas({
  variant = "hero",
  className,
  bloom = false,
}: NetworkCanvasProps) {
  const reduced = usePrefersReducedMotion();
  const isDark = useIsDark();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className={className} aria-hidden>
      {bloom && <div className="absolute inset-0 bloom" />}
      {mounted && !reduced && (
        <NetworkScene
          key={isDark ? "dark" : "light"}
          variant={variant}
          theme={isDark ? "dark" : "light"}
        />
      )}
    </div>
  );
}
