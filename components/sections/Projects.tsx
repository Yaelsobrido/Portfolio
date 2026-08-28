"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ExternalLink, Lock } from "lucide-react";
import { 
  FaReact, FaLaravel, 
} from "react-icons/fa";
import { 
  SiMysql, SiTailwindcss, SiNextdotjs, 
  SiBootstrap , SiThreedotjs
} from "react-icons/si";
import { useLanguage } from "@/contexts/LanguageContext";
import Reveal from "@/components/effects/Reveal";
import TiltCard from "@/components/effects/TiltCard";
import ScrollCard from "@/components/effects/ScrollCard";

const techIcons: Record<string, React.ReactElement> = {
  "React.js": <FaReact className="mr-1" />,
  "Next.js": <SiNextdotjs className="mr-1" />,
   "Three.js":    <SiThreedotjs className="mr-1" />,
  "TailwindCSS": <SiTailwindcss className="mr-1" />,
  "Laravel": <FaLaravel className="mr-1" />,
  "MySQL": <SiMysql className="mr-1" />,
  "Bootstrap": <SiBootstrap className="mr-1" />,
};

const projects = [
	{
		title: "ExamenPro",
		description: {
      fr: "Application de gestion d'examens en ligne pour les établissements éducatifs : création dynamique de questions via extraction de texte, gestion des résultats, interface d'administration complète et contrôle précis des rôles.",
      en: "Online exam management application for educational institutions: dynamic question creation via text extraction, results management, comprehensive administration dashboard, and precise role control."
    },
		tech: ["Laravel", "TailwindCSS", "MySQL"],
		status: {
      fr: "En cours",
      en: "In Progress"
    },
		link: "#",
		image: "/images/projects/examenpro.jpg",
	},
	{
		title: "UnitCRM",
		description: {
      fr: "Solution CRM complète et modulaire conçue avec Laravel : gestion des clients, projets, tâches, facturation, module de paie, API REST intégrée et système de paiement et notifications.",
      en: "Comprehensive and modular CRM solution built with Laravel: client, project, and task management, billing, payroll module, integrated REST API, and payment/notification systems."
    },
		tech: ["Laravel", "TailwindCSS", "MySQL"],
		status: {
      fr: "Dépôt privé",
      en: "Private Repo"
    },
		link: "#",
		image: "/images/projects/unitcrm.jpg",
	},
	{
		title: "MARCIA",
		description: {
      fr: "Plateforme e-commerce dédiée à la vente de sacs artisanaux malgaches, avec gestion complète des commandes, paiements et notifications en temps réel.",
      en: "E-commerce platform dedicated to Malagasy artisanal bags, with complete order management, payments and real-time notifications."
    },
		tech: ["React.js", "TailwindCSS", "Laravel", "MySQL"],
		status: {
      fr: "En cours",
      en: "In Progress"
    },
		link: "#",
		image: "/images/projects/ecommerce.jpeg",
	},
	{
		title: "Gestion d'établissements scolaires",
		description: {
      fr: "Application de gestion centralisée pour les établissements scolaires : inscriptions, suivi des élèves, emplois du temps, notes, absences, paiements et rôles utilisateurs personnalisés.",
      en: "Centralized school management application: registrations, student tracking, schedules, grades, absences, payments and custom user roles."
    },
		tech: ["Next.js", "TailwindCSS", "Laravel", "MySQL"],
		status: {
      fr: "En cours",
      en: "In Progress"
    },
		link: "#",
		image: "/images/projects/document.jpeg",
	},
	{
		title: "EBAX",
		description: {
      fr: "Marketplace web dédiée à la vente de modèles 3D de mobilier (tables, chaises, etc.), optimisés pour l'architecture et la modélisation. Gestion des fichiers 3D, prévisualisation interactive et système complet de commande.",
      en: "Web marketplace dedicated to selling 3D furniture models (tables, chairs, etc.), optimized for architecture and modeling. 3D file management, interactive preview and complete ordering system."
    },
		tech: ["Next.js","Three.js", "TailwindCSS", "Laravel", "MySQL"],
		status: {
      fr: "Terminé",
      en: "Completed"
    },
		link: "https://cn.ebax.ca/fr",
		image: "/images/projects/cicd.jpeg",
	},
	{
		title: "BRINE University",
		description: {
      fr: "Plateforme de gestion universitaire complète : inscription des étudiants, suivi académique, gestion des filières, niveaux, cours, emplois du temps, examens, notes et accès multi-rôles.",
      en: "Complete university management platform: student registration, academic tracking, program management, levels, courses, schedules, exams, grades and multi-role access."
    },
		tech: ["React.js", "Bootstrap", "Laravel", "MySQL"],
		status: {
      fr: "Terminé",
      en: "Completed"
    },
		link: "https://www.brine.pro",
		image: "/images/projects/portfolio.jpg",
	},
];

const getStatusColor = (statusFr: string) => {
  switch (statusFr) {
    case "En cours":
      return "bg-amber-400/15 text-amber-300 border-amber-400/40";
    case "Terminé":
      return "bg-accent/15 text-accent border-accent/40";
    case "Dépôt privé":
    case "Privé":
      return "bg-surface-2 text-ink-dim border-hairline";
    default:
      return "bg-accent-2/15 text-[oklch(0.78_0.16_350)] border-accent-2/40";
  }
};

export default function Projects() {
  const { language, t } = useLanguage();

	return (
		<section className="min-h-[calc(100vh-73px)] flex px-4 py-16 md:px-6 bg-surface/40 pt-28">
			<div className="container mx-auto max-w-6xl">
				<Reveal className="mb-12">
					<p className="font-mono text-sm text-accent tracking-widest">02 — WORK</p>
					<h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight mt-2">
						{t("projects.title")}
					</h2>
				</Reveal>
				<div className="scroll-stage grid grid-cols-1 lg:grid-cols-2 gap-8">
					{projects.map((project, i) => (
						<Reveal key={i} delay={(i % 2) * 90}>
						<ScrollCard>
						<TiltCard max={5}>
						<Card
							className="group h-full bg-void/60 border-hairline hover:border-accent/50 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:shadow-accent/10 flex flex-col relative overflow-hidden backdrop-blur-sm"
						>
							<CardHeader className="p-0">
								<div className="sweep relative w-full aspect-video rounded-t-lg overflow-hidden">
									<Image
										src={project.image}
										alt={project.title}
										fill
										className="object-cover transform group-hover:scale-110 transition-transform duration-500 ease-out"
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-void via-void/60 to-transparent opacity-85 group-hover:opacity-100 transition-opacity duration-500" />
									<Badge 
										variant="outline" 
										className={`absolute top-4 right-4 backdrop-blur-md shadow-lg font-medium ${getStatusColor(project.status.fr)}`}
									>
										{project.status[language]}
									</Badge>
								</div>
							</CardHeader>
							<CardContent className="flex-1 flex flex-col p-6 z-10">
								<div className="flex-1">
									<CardTitle className="text-2xl font-bold text-ink group-hover:text-accent transition-colors duration-300">
										{project.title}
									</CardTitle>
									<CardDescription className="text-ink-dim text-sm mt-3 leading-relaxed line-clamp-3">
										{project.description[language]}
									</CardDescription>
									<div className="flex flex-wrap gap-2 mt-6">
										{project.tech.map((t, j) => (
											<Badge 
												key={j} 
												variant="outline" 
												className="bg-surface/80 border-hairline text-ink-dim hover:border-accent/50 transition-colors duration-300 flex items-center backdrop-blur-sm font-mono"
											>
												{techIcons[t]}
												{t}
											</Badge>
										))}
									</div>
								</div>
								<div className="mt-6 pt-4 border-t border-hairline">
									{project.status.fr === "En cours" ? (
										<Button
											variant="ghost"
											className="w-full justify-center text-ink-faint cursor-not-allowed opacity-70"
											disabled
										>
											<ExternalLink className="w-4 h-4 mr-2" />
											{t("projects.comingSoon")}
										</Button>
									) : project.status.fr === "Dépôt privé" || project.status.fr === "Privé" ? (
										<Button
											variant="ghost"
											className="w-full justify-center text-ink-faint cursor-not-allowed opacity-70"
											disabled
										>
											<Lock className="w-4 h-4 mr-2" />
											{t("projects.privateCode")}
										</Button>
									) : (
										<a href={project.link} target="_blank" rel="noopener noreferrer">
											<Button
												variant="ghost"
												className="w-full justify-center text-accent hover:bg-accent/15 hover:text-accent group/btn"
											>
												<ExternalLink className="w-4 h-4 mr-2 transition-transform duration-300 group-hover/btn:rotate-45" />
												{t("projects.viewProject")}
											</Button>
										</a>
									)}
								</div>
							</CardContent>
						</Card>
						</TiltCard>
						</ScrollCard>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}
