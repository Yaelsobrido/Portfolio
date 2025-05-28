export interface Project {
  title: string;
  description: string;
  tech: string[];
  status: "Production" | "En cours" | "Terminé";
  link: string;
}

export const projects: Project[] = [
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