"use client";

import { useEffect, useState } from "react";

/**
 * Reads the active theme from the `dark` class on <html> and keeps it in
 * sync when `ThemeToggle` flips it. Canvas-based visuals need this because
 * they cannot pick up CSS custom properties on their own.
 */
export function useIsDark(): boolean {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const read = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => mo.disconnect();
  }, []);

  return isDark;
}
