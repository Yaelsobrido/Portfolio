"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
	Code2,
	Database,
	Server,
	Braces,
	Globe,
	GitBranch,
	Layout,
	Library,
} from "lucide-react";

export default function Skills() {
	const { t } = useLanguage();

	const skills = [
		// Langages de programmation
		{ name: "JavaScript", level: 80, icon: <Braces className="w-5 h-5" /> },
		{ name: "Python", level: 70 , icon: <Code2 className="w-5 h-5" /> },
		{ name: "PHP", level: 85, icon: <Code2 className="w-5 h-5" /> },

		// Frontend
		{ name: "HTML/CSS", level: 90, icon: <Globe className="w-5 h-5" /> },
		{ name: "React.js", level: 85, icon: <Code2 className="w-5 h-5" /> },
		{ name: "Next.js", level: 80, icon: <Server className="w-5 h-5" /> },

		// Backend & Framework
		{ name: "Node.js", level: 88, icon: <Server className="w-5 h-5" /> },
		{ name: "Laravel", level: 90, icon: <Library className="w-5 h-5" /> },

		// Bases de données
		{ name: "MySQL", level: 85, icon: <Database className="w-5 h-5" /> },
		{ name: "PostgreSQL", level: 85, icon: <Database className="w-5 h-5" /> },
		{ name: "MongoDB", level: 80, icon: <Database className="w-5 h-5" /> },

		// Outils & Méthodologies
		{ name: "Github/Gitlab", level: 88, icon: <GitBranch className="w-5 h-5" /> },
		{ name: "UML/Merise", level: 85, icon: <Layout className="w-5 h-5" /> },
	];

	return (
		<section className="min-h-[calc(100vh-73px)] flex px-4 py-10 md:px-6 bg-slate-800/50 pt-28">
			<div className="container mx-auto max-w-6xl">
				<h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
					{t("skills.title")}
				</h2>
				<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
					{skills.map((skill, i) => (
						<Card
							key={i}
							className="bg-slate-900/50 border-slate-700 hover:border-blue-400/50 transition-colors"
						>
							<CardContent className="p-4 md:p-6">
								<div className="flex space-x-3 mb-4">
									<div className="text-blue-400">{skill.icon}</div>
									<h3 className="font-semibold text-white text-sm md:text-base">
										{skill.name}
									</h3>
								</div>
								<div className="space-y-2">
									<div className="flex justify-between text-xs md:text-sm">
										<span className="text-slate-400">{t("skills.level")}</span>
										<span className="text-blue-400">
											{skill.level}%
										</span>
									</div>
									<div className="w-full bg-slate-700 rounded-full h-1.5 md:h-2">
										<div
											className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 md:h-2 rounded-full transition-all duration-1000"
											style={{ width: `${skill.level}%` }}
										/>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
