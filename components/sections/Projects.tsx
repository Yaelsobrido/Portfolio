"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { 
  FaReact, FaLaravel, 
} from "react-icons/fa";
import { 
  SiMysql, SiTailwindcss, SiNextdotjs, 
  SiBootstrap 
} from "react-icons/si";

const techIcons: { [key: string]: JSX.Element } = {
  "React.js": <FaReact className="mr-1" />,
  "Next.js": <SiNextdotjs className="mr-1" />,
  "TailwindCSS": <SiTailwindcss className="mr-1" />,
  "Laravel": <FaLaravel className="mr-1" />,
  "MySQL": <SiMysql className="mr-1" />,
  "Bootstrap": <SiBootstrap className="mr-1" />,
};

const projects = [
	{
		title: "MARCIA",
		description:
			"Plateforme e-commerce dédiée à la vente de sacs artisanaux malgaches, avec gestion complète des commandes, paiements et notifications en temps réel.",
		tech: ["React.js", "TailwindCSS", "Laravel", "MySQL"],
		status: "En cours",
		link: "#",
		image: "/images/projects/ecommerce.jpeg",
	},
	{
		title: "Gestion d'établissements scolaires",
		description:
			"Application de gestion centralisée pour les établissements scolaires : inscriptions, suivi des élèves, emplois du temps, notes, absences, paiements et rôles utilisateurs personnalisés.",
		tech: ["Next.js", "TailwindCSS", "Laravel", "MySQL"],
		status: "En cours",
		link: "#",
		image: "/images/projects/document.jpeg",
	},
	{
		title: "EBAX",
		description:
			"Marketplace web dédiée à la vente de modèles 3D de mobilier (tables, chaises, etc.), optimisés pour l’architecture et la modélisation. Gestion des fichiers 3D, prévisualisation interactive et système complet de commande.",
		tech: ["Next.js", "TailwindCSS", "Laravel", "MySQL"],
		status: "Terminé",
		link: "#",
		image: "/images/projects/cicd.jpeg",
	},
	{
		title: "BRINE University",
		description:
			"Site web personnel développé avec React et Bootstrap, incluant un système de traduction et une interface responsive moderne.",
		tech: ["React.js", "Bootstrap", "Laravel", "MySQL"],
		status: "Production",
		link: "https://www.brine.pro",
		image: "/images/projects/portfolio.jpg",
	},
];

export default function Projects() {
	return (
		<section className="min-h-[calc(100vh-73px)] flex px-4 py-10 md:px-6 bg-slate-800/50 pt-28">
			<div className="container mx-auto max-w-6xl">
				<h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
					Projets Récents
				</h2>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{projects.map((project, i) => (
						<Card 
							key={i} 
							className="group bg-gradient-to-br from-slate-900/50 to-slate-800/30 border-slate-700 hover:border-blue-400/50 transition-all duration-500 ease-out hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-400/20 flex flex-col relative overflow-hidden"
						>
							<CardHeader className="p-0">
								<div className="relative w-full aspect-video rounded-t-lg overflow-hidden">
									<Image
										src={project.image}
										alt={project.title}
										fill
										className="object-cover transform group-hover:scale-110 transition-transform duration-500 ease-out"
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
									<Badge variant={
                    project.status === "Production" ? "default"
                      : project.status === "En cours" ? "secondary"
                        : "outline"
                  } className="absolute top-4 right-4 backdrop-blur-md shadow-lg bg-blue-500/80 text-white border-blue-400 font-medium">
										{project.status}
									</Badge>
								</div>
							</CardHeader>
							<CardContent className="flex-1 flex flex-col p-6 z-10">
								<div className="flex-1">
									<CardTitle className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
										{project.title}
									</CardTitle>
									<CardDescription className="text-slate-300 text-sm mt-3 leading-relaxed line-clamp-3">
										{project.description}
									</CardDescription>
									<div className="flex flex-wrap gap-2 mt-6">
										{project.tech.map((t, j) => (
											<Badge 
												key={j} 
												variant="outline" 
												className="bg-slate-800/80 border-slate-600/80 text-slate-300 hover:bg-slate-700 hover:border-blue-400/50 transition-colors duration-300 flex items-center backdrop-blur-sm"
											>
												{techIcons[t]}
												{t}
											</Badge>
										))}
									</div>
								</div>
								<div className="mt-6 pt-4 border-t border-slate-700/50">
									{project.status === "En cours" ? (
										<Button
											variant="ghost"
											className="w-full justify-center text-slate-500 cursor-not-allowed opacity-70"
											disabled
										>
											<ExternalLink className="w-4 h-4 mr-2" />
											Bientôt disponible
										</Button>
									) : (
										<a href={project.link} target="_blank" rel="noopener noreferrer">
											<Button
												variant="ghost"
												className="w-full justify-center text-blue-400 hover:bg-blue-400/20 hover:text-blue-300 group/btn"
											>
												<ExternalLink className="w-4 h-4 mr-2 transition-transform duration-300 group-hover/btn:rotate-45" />
												Voir le projet
											</Button>
										</a>
									)}
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
