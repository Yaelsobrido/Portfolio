import type { Metadata } from "next";
import Projects from "@/components/sections/Projects";

export const metadata: Metadata = {
  title: "Projets",
  description: "Parcourez les réalisations récentes de Yael Sobrido, incluant des solutions CRM, des applications d'examens en ligne, des plateformes e-commerce et des systèmes scolaires.",
};

export default function ProjetsPage() {
  return <Projects />;
}
