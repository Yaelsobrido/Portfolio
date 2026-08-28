"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Reveal from "@/components/effects/Reveal";
import { Timeline, TimelineItem, TimelineMarker } from "@/components/common/Timeline";

export default function Experience() {
	const { t } = useLanguage();

	const experience = [
		{
			title: t("experience.dev.title"),
			company: t("experience.dev.company"),
			period: t("experience.dev.period"),
			description: t("experience.dev.description"),
		},
		{
			title: t("experience.integrator.title"),
			company: t("experience.integrator.company"),
			period: t("experience.integrator.period"),
			description: t("experience.integrator.description"),
		},
		{
			title: t("experience.intern.title"),
			company: t("experience.intern.company"),
			period: t("experience.intern.period"),
			description: t("experience.intern.description"),
		},
	];

	return (
		<section className="min-h-[calc(100vh-73px)] flex px-4 py-16 md:px-6 pt-28">
			<div className="container mx-auto max-w-4xl">
				<Reveal className="mb-12">
					<p className="font-mono text-sm text-accent tracking-widest">03 — PATH</p>
					<h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight mt-2">
						{t("experience.title")}
					</h2>
				</Reveal>

				<Timeline>
					{experience.map((exp, i) => (
						<TimelineItem key={i} delay={i * 90}>
							<TimelineMarker>
								<Briefcase className="w-5 h-5 md:w-6 md:h-6" />
							</TimelineMarker>

							<Card className="bg-void/60 border-hairline backdrop-blur-sm">
								<CardContent className="p-6 md:p-8">
									<div className="flex flex-col lg:flex-row lg:justify-between mb-2 gap-2">
										<h3 className="text-xl font-semibold text-ink">{exp.title}</h3>
										<Badge
											variant="outline"
											className="w-fit border-accent/40 text-accent font-mono"
										>
											{exp.period}
										</Badge>
									</div>
									<p className="text-accent font-medium mb-3 font-mono text-sm">
										{exp.company}
									</p>
									<p className="text-ink-faint leading-relaxed">{exp.description}</p>
								</CardContent>
							</Card>
						</TimelineItem>
					))}
				</Timeline>
			</div>
		</section>
	);
}
