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
      className="px-3 py-1.5 rounded-md
        text-slate-300 bg-slate-800/50
        hover:bg-slate-700/50 hover:text-blue-400
        transition-all duration-300
        border border-slate-700 hover:border-blue-400/50"
    >
      {language.toUpperCase()}
    </Button>
  );
}
