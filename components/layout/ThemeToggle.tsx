"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

type Theme = "light" | "dark";

/**
 * Light/dark switch. The initial class is set before paint by the inline
 * script in `app/layout.tsx`; this only reads it back and lets the user
 * flip it, persisting the choice to localStorage.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable — the choice just won't persist */
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggle}
      aria-label={theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}
      className="px-3 py-1.5 rounded-md
        text-ink-dim bg-surface/60
        hover:bg-surface-2 hover:text-accent
        transition-all duration-300
        border border-hairline hover:border-accent/50"
    >
      {mounted && theme === "dark" ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </Button>
  );
}
