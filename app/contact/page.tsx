import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Entrez en contact avec Yael Sobrido pour vos projets de développement web back-end, Laravel et React. Disponible pour de nouvelles opportunités.",
};

export default function ContactPage() {
  return <Contact />;
}
