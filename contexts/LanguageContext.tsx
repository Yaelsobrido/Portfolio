"use client";

import React, { createContext, useContext, useState } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    // Navigation
    "nav.about": "À propos",
    "nav.skills": "Compétences",
    "nav.projects": "Projets",
    "nav.experience": "Expérience",
    "nav.contact": "Contact",
    
    // About section
    "about.role": "Développeur Back-end Passionné",
    "about.specialization": "Spécialisé dans la création d'architectures robustes et scalables. Expert en APIs REST, microservices et optimisation de performances.",
    "about.location": "Madagascar",
    "about.status": "Disponible",
    "about.contact": "Me contacter",
    
    // Skills section
    "skills.title": "Compétences Techniques",
    "skills.level": "Niveau",
    
    // Experience section
    "experience.title": "Expérience Professionnelle",
    "experience.dev.title": "Développeur Back-end",
    "experience.dev.company": "UN-IT",
    "experience.dev.period": "2023 - Présent",
    "experience.dev.description": "Développement et maintenance d'applications web, conception d'APIs RESTful, intégration de services tiers et optimisation des performances des bases de données.",
    
    "experience.integrator.title": "Intégrateur Web",
    "experience.integrator.company": "UN-IT",
    "experience.integrator.period": "2022 - 2023",
    "experience.integrator.description": "Intégration de maquettes, développement frontend responsive, collaboration avec les designers et optimisation de l'expérience utilisateur.",
    
    "experience.intern.title": "Stagiaire Développeur",
    "experience.intern.company": "UN-IT",
    "experience.intern.period": "2022",
    "experience.intern.description": "Stage en développement web, participation aux projets d'équipe, apprentissage des bonnes pratiques et des méthodologies de développement.",

    // Contact section
    "contact.title": "Travaillons Ensemble",
    "contact.heading": "Me Contacter",
    "contact.description": "Vous avez un projet back-end ambitieux ? Discutons de la façon dont je peux vous aider à le concrétiser.",
    "contact.email.button": "Me contacter par email",
    "contact.github.button": "Voir mon GitHub",
    "contact.linkedin.button": "Me suivre sur LinkedIn",
    "contact.terminal.title": "Terminal d'informations",
    "contact.cpu.title": "Statut actuel",
    "contact.available.status": "Disponible pour de nouvelles opportunités",
    "contact.shield.title": "Sécurité des données",
    "contact.features.clean": "Code propre",
    "contact.features.performance": "Performance",
    "contact.features.security": "Sécurité",

    // Projects section
    "projects.title": "Mes Projets",
    "projects.subtitle": "Une sélection de mes réalisations récentes",
    "projects.viewProject": "Voir le projet",
    "projects.viewCode": "Voir le code",
    "projects.technologies": "Technologies utilisées",
    "projects.inProgress": "En cours",
    "projects.completed": "Terminé",
  },
  en: {
    // Navigation
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.experience": "Experience",
    "nav.contact": "Contact",
    
    // About section
    "about.role": "Passionate Back-end Developer",
    "about.specialization": "Specialized in creating robust and scalable architectures. Expert in REST APIs, microservices and performance optimization.",
    "about.location": "Madagascar",
    "about.status": "Available",
    "about.contact": "Contact me",
    
    // Skills section
    "skills.title": "Technical Skills",
    "skills.level": "Level",
    
    // Experience section
    "experience.title": "Professional Experience",
    "experience.dev.title": "Back-end Developer",
    "experience.dev.company": "UN-IT",
    "experience.dev.period": "2023 - Present",
    "experience.dev.description": "Development and maintenance of web applications, REST APIs design, third-party services integration and database performance optimization.",
    
    "experience.integrator.title": "Web Integrator",
    "experience.integrator.company": "UN-IT",
    "experience.integrator.period": "2022 - 2023",
    "experience.integrator.description": "UI integration, responsive frontend development, collaboration with designers and user experience optimization.",
    
    "experience.intern.title": "Developer Intern",
    "experience.intern.company": "UN-IT",
    "experience.intern.period": "2022",
    "experience.intern.description": "Web development internship, team project participation, learning best practices and development methodologies.",

    // Contact section
    "contact.title": "Let's Work Together",
    "contact.heading": "Contact Me",
    "contact.description": "Have an ambitious back-end project? Let's discuss how I can help you bring it to life.",
    "contact.email.button": "Contact me by email",
    "contact.github.button": "View my GitHub",
    "contact.linkedin.button": "Follow me on LinkedIn",
    "contact.terminal.title": "Information Terminal",
    "contact.cpu.title": "Current Status",
    "contact.available.status": "Available for new opportunities",
    "contact.shield.title": "Data Security",
    "contact.features.clean": "Clean Code",
    "contact.features.performance": "Performance",
    "contact.features.security": "Security",

    // Projects section
    "projects.title": "My Projects",
    "projects.subtitle": "A selection of my recent work",
    "projects.viewProject": "View Project",
    "projects.viewCode": "View Code",
    "projects.technologies": "Technologies used",
    "projects.inProgress": "In Progress",
    "projects.completed": "Completed",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations.fr] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
