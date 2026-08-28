"use client";

import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Terminal, Cpu, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Reveal from "@/components/effects/Reveal";

export default function Contact() {
  const { t } = useLanguage();

  const features = [
    { icon: Terminal, label: t("contact.features.clean") },
    { icon: Cpu, label: t("contact.features.performance") },
    { icon: Shield, label: t("contact.features.security") },
  ];

  return (
    <section className="relative min-h-[calc(100vh-73px)] flex items-center px-4 py-16 md:px-6 pt-28 overflow-hidden">
      <div className="absolute inset-0 bloom opacity-60" />
      <div className="container mx-auto max-w-3xl relative z-10">
        <Reveal>
          <p className="font-mono text-sm text-accent tracking-widest">04 — CONTACT</p>
          <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight mt-2 mb-6">
            {t("contact.title")}
          </h2>
          <p className="text-base md:text-lg text-ink-faint mb-8 max-w-xl">
            {t("contact.description")}
          </p>
        </Reveal>

        <Reveal delay={120} className="flex flex-col sm:flex-row gap-4 mb-14">
          <Button
            size="lg"
            className="bg-accent text-on-accent hover:bg-accent/85"
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
            className="border-hairline text-ink-dim hover:bg-surface hover:text-ink"
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
        </Reveal>

        <Reveal delay={200} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {features.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-lg border border-hairline bg-void/60 px-4 py-3 font-mono text-sm text-ink-dim backdrop-blur-sm"
            >
              <Icon className="w-5 h-5 text-accent" />
              <span>{label}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
