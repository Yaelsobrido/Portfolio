import type { Metadata } from "next";
import Skills from "@/components/sections/Skills";

export const metadata: Metadata = {
  title: "Compétences",
  description: "Découvrez les compétences techniques de Yael Sobrido : PHP, Laravel, Node.js, Next.js, React.js, bases de données relationnelles et non relationnelles.",
};

export default function CompetencesPage() {
  return <Skills />;
}
