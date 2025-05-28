"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Mail, Github } from "lucide-react";

export default function About() {
  return (
    <section className="min-h-[calc(100vh-73px)] flex items-center justify-center px-4 py-10 md:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Texte */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            {/* Titre & intro */}
            <div className="space-y-3 md:space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                ANDRIANTSIALO
                <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Sobrido Yaël
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300">Développeur Back-end Passionné</p>
              <p className="text-base md:text-lg text-slate-400 leading-relaxed">
                Spécialisé dans la création d'architectures robustes et scalables.
                Expert en APIs REST, microservices et optimisation de performances.
              </p>
            </div>

            {/* Localisation & dispo */}
            <div className="flex items-center justify-center lg:justify-start space-x-4 text-slate-400">
              <MapPin className="w-5 h-5" />
              <span>Madagascar</span>
              <Calendar className="w-5 h-5 ml-4" />
              <span>Disponible</span>
            </div>

            {/* Boutons */}
            <div className="flex justify-center lg:justify-start space-x-4">
              <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                <Mail className="w-4 h-4 mr-2" />
                Me contacter
              </Button>
              <Button
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800 w-full sm:w-auto"
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
            </div>
          </div>

          {/* Image arrondie avec Next.js Image */}
          <div className="relative order-first lg:order-last z-[1]">
            <div className="relative z-[2] w-64 h-64 md:w-80 md:h-80 mx-auto overflow-hidden rounded-full border-4 border-blue-400/20">
              <Image
                src="/images/yael.jpg"
                alt="Photo de ANDRIANTSIALO Sobrido Yaël"
                fill
                sizes="(max-width: 768px) 200px, 320px"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>

            {/* Cercle flou en arrière-plan */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
