"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "API E-commerce Microservices",
    description:
      "Architecture microservices complète avec authentification JWT, gestion des paiements et système de notifications en temps réel.",
    tech: ["Node.js", "Express", "PostgreSQL", "Redis", "Docker"],
    status: "Production",
    link: "#",
  },
  {
    title: "Système de Gestion Documentaire",
    description:
      "API REST pour la gestion de documents avec versioning, recherche full-text et système de permissions granulaires.",
    tech: ["Python", "FastAPI", "MongoDB", "Elasticsearch"],
    status: "En cours",
    link: "#",
  },
  {
    title: "Pipeline CI/CD Automatisé",
    description:
      "Infrastructure as Code avec déploiement automatisé, monitoring et alertes pour applications containerisées.",
    tech: ["AWS", "Terraform", "Jenkins", "Kubernetes"],
    status: "Terminé",
    link: "#",
  },
];

export default function Projects() {
  return (
    <section className="min-h-[calc(100vh-73px)] flex px-4 py-10 md:px-6 bg-slate-800/50 pt-28">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
          Projets Récents
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {projects.map((project, i) => (
            <Card key={i} className="bg-slate-900/50 border-slate-700 hover:border-blue-400/50">
              <CardHeader className="space-y-4">
                <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-start sm:justify-between">
                  <CardTitle className="text-lg md:text-xl text-white">{project.title}</CardTitle>
                  <Badge variant={
                    project.status === "Production" ? "default"
                      : project.status === "En cours" ? "secondary"
                        : "outline"
                  } className="w-fit">
                    {project.status}
                  </Badge>
                </div>
                <CardDescription className="text-slate-400 text-sm md:text-base">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, j) => (
                      <Badge key={j} variant="outline" className="border-slate-600 text-slate-300">
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="ghost" className="w-full text-blue-400 hover:bg-blue-400/10">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Voir le projet
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
