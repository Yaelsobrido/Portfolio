"use client";

import { usePathname } from "next/navigation";
import NetworkCanvas from "./NetworkCanvas";
import { useIsNarrow } from "@/hooks/useIsNarrow";

/**
 * A faint, page-wide echo of the hero island. Mounted once in the root
 * layout so it survives route changes, and skipped on `/about`, which
 * already owns the full-strength scene — the two never coexist.
 */
export default function AmbientBackdrop() {
  const pathname = usePathname();
  const narrow = useIsNarrow();

  if (pathname === "/about" || pathname === "/") return null;

  return (
    <NetworkCanvas
      variant={narrow ? "ambientCompact" : "ambient"}
      className="pointer-events-none fixed inset-0 -z-10 opacity-35 mask-radial"
    />
  );
}
