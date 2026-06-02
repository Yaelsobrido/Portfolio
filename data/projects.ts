export interface Project {
  title: string;
  description: string;
  tech: string[];
  status: "Production" | "En cours" | "Terminé" | "Dépôt privé";
  link: string;
}

export const projects: Project[] = [
  {
    title: "ExamenPro",
    description:
      "Application de gestion d'examens en ligne pour les établissements éducatifs : création dynamique de questions via extraction de texte, gestion des résultats, interface d'administration complète et contrôle précis des rôles.",
    tech: ["Laravel", "TailwindCSS", "MySQL"],
    status: "En cours",
    link: "#",
  },
  {
    title: "UnitCRM",
    description:
      "Solution CRM complète et modulaire conçue avec Laravel : gestion des clients, projets, tâches, facturation, module de paie, API REST intégrée et système de paiement et notifications.",
    tech: ["Laravel", "TailwindCSS", "MySQL"],
    status: "Dépôt privé",
    link: "#",
  },
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