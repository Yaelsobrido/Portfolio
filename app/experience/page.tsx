import type { Metadata } from "next";
import Experience from "@/components/sections/Experience";

export const metadata: Metadata = {
  title: "Expérience",
  description: "Découvrez le parcours professionnel de Yael Sobrido : développeur back-end, intégrateur web et réalisations professionnelles chez UN-IT.",
};

export default function ExperiencePage() {
  return <Experience />;
}
