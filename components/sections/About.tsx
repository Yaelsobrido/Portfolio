"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Mail, Github } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import NetworkCanvas from "@/components/three/NetworkCanvas";
import Reveal from "@/components/effects/Reveal";
import TiltCard from "@/components/effects/TiltCard";
import { useIsNarrow } from "@/hooks/useIsNarrow";

export default function About() {
  const { t } = useLanguage();
  const narrow = useIsNarrow();

  return (
    <section className="relative min-h-[calc(100vh-73px)] flex items-center justify-center px-4 py-10 md:px-6 pt-28 overflow-hidden">
      {/* WebGL island, behind everything. On phones the portrait shrinks and
          the island grows past it on all sides, so the coastline reads around
          the photo; `.mask-hero` fades it out before it reaches the text. */}
      <NetworkCanvas
        bloom
        variant={narrow ? "heroCompact" : "hero"}
        className="pointer-events-none absolute inset-0 -z-0 opacity-50 md:opacity-90 mask-hero"
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Texte */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            <Reveal className="space-y-3 md:space-y-4">
              <p className="font-mono text-sm text-accent tracking-widest uppercase">
                &gt; back-end engineer
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink leading-[1.05] tracking-tight">
                ANDRIANTSIALO
                <span className="block text-accent-glow">Sobrido Yaël</span>
              </h1>
              <p className="text-lg md:text-xl text-ink-dim">{t("about.role")}</p>
              <p className="text-base md:text-lg text-ink-faint leading-relaxed max-w-xl mx-auto lg:mx-0">
                {t("about.specialization")}
              </p>
            </Reveal>

            <Reveal
              delay={120}
              className="flex items-center justify-center lg:justify-start gap-4 font-mono text-sm text-ink-faint"
            >
              <span className="inline-flex items-center gap-2 rounded-md border border-hairline bg-surface/50 px-3 py-1.5 backdrop-blur-sm">
                <MapPin className="w-4 h-4 text-accent" />
                {t("about.location")}
              </span>
              <span className="inline-flex items-center gap-2 rounded-md border border-hairline bg-surface/50 px-3 py-1.5 backdrop-blur-sm">
                <Calendar className="w-4 h-4 text-accent" />
                {t("about.status")}
              </span>
            </Reveal>

            <Reveal
              delay={200}
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
            >
              <Button
                className="bg-accent text-on-accent hover:bg-accent/85 w-full sm:w-auto"
                asChild
              >
                <a href="mailto:yaelsobrido23@gmail.com">
                  <Mail className="w-4 h-4 mr-2" />
                  {t("about.contact")}
                </a>
              </Button>
              <Button
                variant="outline"
                className="border-hairline text-ink-dim hover:bg-surface hover:text-ink w-full sm:w-auto"
                asChild
              >
                <a
                  href="https://github.com/Yaelsobrido"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </a>
              </Button>
            </Reveal>
          </div>

          {/* Portrait cadré, tilt à la souris */}
          <Reveal delay={150} className="order-first lg:order-last">
            <TiltCard className="relative mx-auto w-40 h-40 md:w-80 md:h-80">
              <div className="absolute inset-0 bloom scale-125" />
              <div className="relative h-full w-full overflow-hidden rounded-xl border border-hairline">
                <Image
                  src="/images/yael.jpg"
                  alt="Photo de ANDRIANTSIALO Sobrido Yaël"
                  fill
                  sizes="(max-width: 768px) 160px, 320px"
                  style={{ objectFit: "cover" }}
                  priority
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-accent/20 rounded-xl" />
              </div>
              {/* repères d'angle */}
              <span className="absolute -top-1 -left-1 h-4 w-4 border-t-2 border-l-2 border-accent" />
              <span className="absolute -bottom-1 -right-1 h-4 w-4 border-b-2 border-r-2 border-accent-2" />
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
