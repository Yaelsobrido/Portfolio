import React, { ReactNode } from "react";
import { Server, Code2, Database, Cloud, Zap } from "lucide-react";

export interface Skill {
  name: string;
  level: number;
  icon: ReactNode;
}

export const skills: Skill[] = [
  { name: "Node.js",    level: 95, icon: <Server className="w-5 h-5 text-blue-400" /> },
  { name: "Python",     level: 90, icon: <Code2  className="w-5 h-5 text-green-400" /> },
  { name: "PostgreSQL", level: 88, icon: <Database className="w-5 h-5 text-indigo-400" /> },
  { name: "MongoDB",    level: 85, icon: <Database className="w-5 h-5 text-green-500" /> },
  { name: "Docker",     level: 82, icon: <Cloud   className="w-5 h-5 text-sky-400"   /> },
  { name: "AWS",        level: 80, icon: <Cloud   className="w-5 h-5 text-orange-400"/> },
  { name: "Redis",      level: 78, icon: <Zap     className="w-5 h-5 text-red-400"    /> },
  { name: "GraphQL",    level: 75, icon: <Code2  className="w-5 h-5 text-pink-400"   /> },
];