"use client";

import type { ReactNode } from "react";
import Reveal from "@/components/effects/Reveal";

/**
 * The vertical rail shared by the Experience and Skills pages: a hairline
 * spine with a travelling accent dot. Both pages render through these
 * components so their geometry cannot drift apart — the rail offset, the
 * item padding and the marker box all have to agree.
 */
export function Timeline({ children }: { children: ReactNode }) {
	return (
		<div className="relative space-y-6 md:space-y-8 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-px before:bg-hairline md:before:left-[27px]">
			<span
				className="rail-dot pointer-events-none absolute left-[19px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_14px_var(--accent)] md:left-[27px]"
				aria-hidden
			/>
			{children}
		</div>
	);
}

export function TimelineItem({
	delay = 0,
	children,
}: {
	delay?: number;
	children: ReactNode;
}) {
	return (
		<Reveal delay={delay} className="relative pl-12 md:pl-16">
			{children}
		</Reveal>
	);
}

/** The icon box sitting on the rail. Pass a bare lucide icon. */
export function TimelineMarker({ children }: { children: ReactNode }) {
	return (
		<span className="absolute left-0 top-1.5 flex h-10 w-10 items-center justify-center rounded-lg border border-hairline bg-surface md:h-14 md:w-14">
			<span className="text-accent">{children}</span>
		</span>
	);
}
