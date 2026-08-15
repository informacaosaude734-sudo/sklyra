import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SklyraLogo } from '@/components/landing/SklyraLogo';

export interface FooterLink {
	title: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
	external?: boolean;
}

export interface FooterSection {
	label: string;
	links: FooterLink[];
}

interface FooterProps {
	sections: FooterSection[];
	copyright: string;
	subtext?: string;
}

export function Footer({ sections, copyright, subtext }: FooterProps) {
	return (
		<footer
			className="md:rounded-t-6xl relative w-[min(100%-2rem,72rem)] md:w-[min(100%-3rem,72rem)] mx-auto flex flex-col items-center justify-center overflow-hidden rounded-t-4xl border-t border-primary/20 px-6 py-12 lg:py-16"
			style={{
				background:
					"radial-gradient(60% 260px at 50% 0%, hsl(var(--primary) / 0.22), transparent 70%), linear-gradient(180deg, hsl(var(--primary) / 0.08), transparent 45%)",
			}}
		>
			<div className="bg-primary-glow absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

			<div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
				<AnimatedContainer className="space-y-4">
					<SklyraLogo width={40} height={40} className="size-9" />
					<div className="mt-8 md:mt-0">
						<p className="text-muted-foreground text-sm">{copyright}</p>
						{subtext && <p className="text-muted-foreground/60 text-xs mt-1">{subtext}</p>}
					</div>
				</AnimatedContainer>

				<div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
					{sections.map((section, index) => (
						<AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
							<div className="mb-10 md:mb-0">
								<h3 className="text-[10px] uppercase tracking-[0.2em] text-primary/80 font-medium">{section.label}</h3>
								<ul className="text-muted-foreground mt-4 space-y-2 text-sm">
									{section.links.map((link) => (
										<li key={link.title}>
											<a
												href={link.href}
												target={link.external ? '_blank' : undefined}
												rel={link.external ? 'noopener noreferrer' : undefined}
												className="hover:text-primary inline-flex items-center transition-all duration-300"
											>
												{link.icon && <link.icon className="me-1 size-4" />}
												{link.title}
											</a>
										</li>
									))}
								</ul>
							</div>
						</AnimatedContainer>
					))}
				</div>
			</div>
		</footer>
	);
}

type ViewAnimationProps = {
	delay?: number;
	className?: ComponentProps<typeof motion.div>['className'];
	children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
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
