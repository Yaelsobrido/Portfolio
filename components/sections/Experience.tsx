"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

const experience = [
	{
		title: "Développeur Back-end Senior",
		company: "TechCorp Solutions",
		period: "2022 - Présent",
		description:
			"Conception et développement d'APIs scalables, optimisation des performances et mentoring d'équipe.",
	},
	{
		title: "Développeur Full-Stack",
		company: "StartupInnovante",
		period: "2020 - 2022",
		description:
			"Développement d'applications web complètes, architecture système et intégration de services tiers.",
	},
	{
		title: "Développeur Junior",
		company: "WebAgency Pro",
		period: "2019 - 2020",
		description:
			"Développement d'APIs REST, maintenance de bases de données et support technique.",
	},
];

export default function Experience() {
	return (
		<section className="min-h-[calc(100vh-73px)] flex px-4 py-10 md:px-6 bg-slate-800/50 pt-28">
			<div className="container mx-auto max-w-6xl">
				<h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
					Expérience Professionnelle
				</h2>
				<div className="space-y-6 md:space-y-8">
					{experience.map((exp, i) => (
						<Card key={i} className="bg-slate-900/50 border-slate-700">
							<CardContent className="p-8">
								<div className="flex items-start space-x-4">
									<div className="bg-blue-600 p-3 rounded-lg">
										<Briefcase className="w-6 h-6 text-white" />
									</div>
									<div className="flex-1">
										<div className="flex flex-col lg:flex-row lg:justify-between mb-2">
											<h3 className="text-xl font-semibold text-white">
												{exp.title}
											</h3>
											<Badge
												variant="outline"
												className="border-blue-400 text-blue-400"
											>
												{exp.period}
											</Badge>
										</div>
										<p className="text-blue-400 font-medium mb-3">
											{exp.company}
										</p>
										<p className="text-slate-400">
											{exp.description}
										</p>
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
