"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
      className="px-3 py-1.5 rounded-md font-mono
        text-ink-dim bg-surface/60
        hover:bg-surface-2 hover:text-accent
        transition-all duration-300
        border border-hairline hover:border-accent/50"
    >
      {language.toUpperCase()}
    </Button>
  );
}
