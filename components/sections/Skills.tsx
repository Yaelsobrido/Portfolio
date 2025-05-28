"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Code2, Database, Server, Cloud, Zap } from "lucide-react";

const skills = [
	{ name: "Node.js", level: 95, icon: <Server className="w-5 h-5" /> },
	{ name: "Python", level: 90, icon: <Code2 className="w-5 h-5" /> },
	{ name: "PostgreSQL", level: 88, icon: <Database className="w-5 h-5" /> },
	{ name: "MongoDB", level: 85, icon: <Database className="w-5 h-5" /> },
	{ name: "Docker", level: 82, icon: <Cloud className="w-5 h-5" /> },
	{ name: "AWS", level: 80, icon: <Cloud className="w-5 h-5" /> },
	{ name: "Redis", level: 78, icon: <Zap className="w-5 h-5" /> },
	{ name: "GraphQL", level: 75, icon: <Code2 className="w-5 h-5" /> },
];

export default function Skills() {
	return (
		<section className="min-h-[calc(100vh-73px)] flex px-4 py-10 md:px-6 bg-slate-800/50 pt-28">
			<div className="container mx-auto max-w-6xl">
				<h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
					Compétences Techniques
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
										<span className="text-slate-400">Niveau</span>
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
