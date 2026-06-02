import type { Metadata } from "next";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Yael Sobrido | Développeur Back-end Laravel & React",
    template: "%s | Yael Sobrido"
  },
  description: "Portfolio de Yael Sobrido, Développeur Back-end passionné spécialisé dans l'écosystème Laravel, Next.js, les APIs REST, les microservices et les bases de données robustes.",
  keywords: [
    "Yael Sobrido",
    "Andriantsialo Sobrido Yaël",
    "Développeur Back-end",
    "Laravel",
    "Next.js",
    "React",
    "PHP",
    "MySQL",
    "Développeur Madagascar",
    "Portfolio Développeur",
    "REST API",
    "Microservices"
  ],
  authors: [{ name: "Andriantsialo Sobrido Yaël" }],
  creator: "Andriantsialo Sobrido Yaël",
  metadataBase: new URL("https://portfolio-yaelsobrido.vercel.app"), // Fallback base URL for metadata
  openGraph: {
    title: "Yael Sobrido | Développeur Back-end Laravel & React",
    description: "Découvrez mon portfolio et mes projets récents : applications web Laravel, solutions e-commerce, CRM et architectures robustes.",
    url: "/",
    siteName: "Yael Sobrido Portfolio",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yael Sobrido | Développeur Back-end",
    description: "Découvrez mes réalisations et compétences en développement back-end Laravel & React.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}>
        <LanguageProvider>
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Navbar />
            <main className="overflow-x-hidden">
              {children}
            </main>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
