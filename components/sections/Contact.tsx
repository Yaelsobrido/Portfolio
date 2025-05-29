"use client";

import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Terminal, Cpu, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section className="min-h-[calc(100vh-73px)] flex px-4 py-10 md:px-6 pt-28">
      <div className="container mx-auto max-w-6xl">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            {t("contact.title")}
          </h2>
          <p className="text-base md:text-lg text-slate-400 mb-8">
            {t("contact.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4  mb-12">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
              asChild
            >
              <a href="mailto:yaelsobrido23@gmail.com">
                <Mail className="w-5 h-5 mr-2" />
                yaelsobrido23@gmail.com
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
              asChild
            >
              <a
                href="https://www.linkedin.com/in/ya%C3%ABl-sobrido-andriantsialo-0b8a05263/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-5 h-5 mr-2" />
                LinkedIn
              </a>
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 text-slate-400">
            <div className="flex items-center space-x-2">
              <Terminal className="w-5 h-5" />
              <span>{t("contact.features.clean")}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Cpu className="w-5 h-5" />
              <span>{t("contact.features.performance")}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>{t("contact.features.security")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
