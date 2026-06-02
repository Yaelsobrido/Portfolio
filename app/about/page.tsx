import type { Metadata } from "next";
import About from "@/components/sections/About";

export const metadata: Metadata = {
  title: "À propos",
  description: "En savoir plus sur Yael Sobrido, Développeur Back-end passionné basé à Madagascar. Spécialisé en Laravel, Next.js, API REST et architectures robustes.",
};

export default function AboutPage() {
  return <About />;
}
