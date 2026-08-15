import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'framer-motion';
import React from 'react';

type FeatureType = {
	title: string;
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	description?: string;
};

type FeatureCardPorps = React.ComponentProps<'div'> & {
	feature: FeatureType;
};

export function FeatureCard({ feature, className, ...props }: FeatureCardPorps) {
	const p = genRandomPattern();
	const gradientId = React.useId();

	return (
		<div
			className={cn(
				'group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors duration-300 hover:border-primary/30',
				className,
			)}
			{...props}
		>
			<div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
				<div className="from-primary/10 to-primary/[0.02] absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] opacity-100">
					<GridPattern
						width={20}
						height={20}
						x="-12"
						y="4"
						squares={p}
						className="fill-primary/5 stroke-primary/25 absolute inset-0 h-full w-full mix-blend-overlay"
					/>
				</div>
			</div>
			<svg width={0} height={0} aria-hidden className="absolute">
				<defs>
					<linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="hsl(var(--primary))" />
						<stop offset="100%" stopColor="hsl(var(--primary-glow))" />
					</linearGradient>
				</defs>
			</svg>
			<feature.icon
				className="relative z-10 size-6"
				stroke={`url(#${gradientId})`}
				strokeWidth={1.5}
				aria-hidden
			/>
			<h3 className="relative z-10 mt-5 text-sm md:text-base text-white font-medium">{feature.title}</h3>
			{feature.description && (
				<p className="text-muted-foreground relative z-20 mt-2 text-xs font-light leading-relaxed">{feature.description}</p>
			)}
		</div>
	);
}

function GridPattern({
	width,
	height,
	x,
	y,
	squares,
	...props
}: React.ComponentProps<'svg'> & { width: number; height: number; x: string; y: string; squares?: number[][] }) {
	const patternId = React.useId();

	return (
		<svg aria-hidden="true" {...props}>
			<defs>
				<pattern id={patternId} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
					<path d={`M.5 ${height}V.5H${width}`} fill="none" />
				</pattern>
			</defs>
			<rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
			{squares && (
				<svg x={x} y={y} className="overflow-visible">
					{squares.map(([x, y], index) => (
						<rect strokeWidth="0" key={index} width={width + 1} height={height + 1} x={x * width} y={y * height} />
					))}
				</svg>
			)}
		</svg>
	);
}

function genRandomPattern(length?: number): number[][] {
	length = length ?? 5;
	return Array.from({ length }, () => [
		Math.floor(Math.random() * 4) + 7, // random x between 7 and 10
		Math.floor(Math.random() * 6) + 1, // random y between 1 and 6
	]);
}

type ViewAnimationProps = {
	delay?: number;
	className?: string;
	children: React.ReactNode;
};

export function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);
}

// Name kept for import compatibility across call sites — cards now carry
// their own border/rounding (see FeatureCard), so this is just the grid gap.
export const dashedGridClass = 'grid grid-cols-1 gap-4';
