"use client";

import type { ReactNode } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import Reveal from "@/components/effects/Reveal";
import { Timeline, TimelineItem, TimelineMarker } from "@/components/common/Timeline";
import {
	Code2,
	Database,
	Server,
	Braces,
	Globe,
	GitBranch,
	Layout,
	Library,
	MonitorSmartphone,
	HardDrive,
	Boxes,
	Cpu,
} from "lucide-react";

interface Layer {
	key: string;
	icon: ReactNode;
	techs: Array<{ name: string; icon: ReactNode }>;
}

/**
 * The stack is read top-down: a request enters at the interface and travels
 * to the data layer. Order matters — do not reshuffle these.
 */
const LAYERS: Layer[] = [
	{
		key: "client",
		icon: <MonitorSmartphone className="w-5 h-5 md:w-6 md:h-6" />,
		techs: [
			{ name: "HTML/CSS", icon: <Globe className="w-4 h-4" /> },
			{ name: "Tailwind CSS", icon: <Globe className="w-4 h-4" /> },
			{ name: "React.js", icon: <Code2 className="w-4 h-4" /> },
			{ name: "Next.js", icon: <Server className="w-4 h-4" /> },
		],
	},
	{
		key: "api",
		icon: <Cpu className="w-5 h-5 md:w-6 md:h-6" />,
		techs: [
			{ name: "Laravel", icon: <Library className="w-4 h-4" /> },
			{ name: "Node.js", icon: <Server className="w-4 h-4" /> },
			{ name: "PHP", icon: <Code2 className="w-4 h-4" /> },
			{ name: "JavaScript", icon: <Braces className="w-4 h-4" /> },
			{ name: "Python", icon: <Code2 className="w-4 h-4" /> },
		],
	},
	{
		key: "data",
		icon: <HardDrive className="w-5 h-5 md:w-6 md:h-6" />,
		techs: [
			{ name: "MySQL", icon: <Database className="w-4 h-4" /> },
			{ name: "PostgreSQL", icon: <Database className="w-4 h-4" /> },
			{ name: "MongoDB", icon: <Database className="w-4 h-4" /> },
		],
	},
	{
		key: "craft",
		icon: <Boxes className="w-5 h-5 md:w-6 md:h-6" />,
		techs: [
			{ name: "UML/Merise", icon: <Layout className="w-4 h-4" /> },
			{ name: "Github/Gitlab", icon: <GitBranch className="w-4 h-4" /> },
		],
	},
];

export default function Skills() {
	const { t } = useLanguage();

	return (
		<section className="min-h-[calc(100vh-73px)] flex px-4 py-16 md:px-6 bg-surface/40 pt-28">
			<div className="container mx-auto max-w-4xl">
				<Reveal className="mb-12">
					<p className="font-mono text-sm text-accent tracking-widest">
						01 — STACK
					</p>
					<h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight mt-2">
						{t("skills.title")}
					</h2>
					<p className="text-ink-faint mt-3">{t("skills.subtitle")}</p>
				</Reveal>

				<Timeline>
					{LAYERS.map((layer, i) => (
						<TimelineItem key={layer.key} delay={i * 90}>
							<TimelineMarker>{layer.icon}</TimelineMarker>

							<Card className="bg-void/60 border-hairline backdrop-blur-sm">
								<CardContent className="p-6 md:p-8">
									<h3 className="text-xl font-semibold text-ink">
										{t(`skills.layer.${layer.key}`)}
									</h3>

									<div className="mt-4 flex flex-wrap gap-2">
										{layer.techs.map((tech) => (
											<span
												key={tech.name}
												className="inline-flex items-center gap-1.5 rounded-md border border-hairline bg-surface/70 px-2.5 py-1 font-mono text-xs text-ink-dim transition-colors hover:border-accent/50 hover:text-ink"
											>
												<span className="text-accent">{tech.icon}</span>
												{tech.name}
											</span>
										))}
									</div>
								</CardContent>
							</Card>
						</TimelineItem>
					))}
				</Timeline>
			</div>
		</section>
	);
}
