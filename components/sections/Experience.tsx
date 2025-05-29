"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Experience() {
	const { t } = useLanguage();

	const experience = [
		{
			title: t("experience.intern.title"),
			company: t("experience.intern.company"),
			period: t("experience.intern.period"),
			description: t("experience.intern.description"),
		},
		{
			title: t("experience.integrator.title"),
			company: t("experience.integrator.company"),
			period: t("experience.integrator.period"),
			description: t("experience.integrator.description"),
		},
		{
			title: t("experience.dev.title"),
			company: t("experience.dev.company"),
			period: t("experience.dev.period"),
			description: t("experience.dev.description"),
		},
	];

	return (
		<section className="min-h-[calc(100vh-73px)] flex px-4 py-10 md:px-6 bg-slate-800/50 pt-28">
			<div className="container mx-auto max-w-6xl">
				<h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
					{t("experience.title")}
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
