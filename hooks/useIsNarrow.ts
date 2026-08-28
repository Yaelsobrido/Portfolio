"use client";

import { useEffect, useState } from "react";

/**
 * True below the Tailwind `md` breakpoint. Canvas scenes need this in JS —
 * they cannot be tuned with responsive utility classes the way DOM is.
 */
export function useIsNarrow(): boolean {
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const read = () => setNarrow(mq.matches);
    read();
    mq.addEventListener("change", read);
    return () => mq.removeEventListener("change", read);
  }, []);

  return narrow;
}
