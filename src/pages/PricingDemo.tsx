import React from 'react';
import { PricingSection } from '@/components/ui/pricing';

export default function PricingDemo() {
	return (
		<div className="flex min-h-screen items-center justify-center py-12 bg-background">
			<PricingSection
				plans={PLANS}
				heading="Planos que Crescem com Você"
				description="Se você está começando ou crescendo rápido, nossos planos flexíveis têm tudo que você precisa — sem custos ocultos."
			/>
		</div>
	);
}

const PLANS = [
	{
		id: 'basic',
		name: 'Basic',
		info: 'Para profissionais individuais',
		price: {
			monthly: 49,
			yearly: Math.round(49 * 12 * (1 - 0.12)),
		},
		features: [
			{ text: 'Até 10 Propostas por mês' },
			{ text: 'Análise básica de concorrentes' },
			{ text: 'Relatórios em PDF' },
			{
				text: 'Suporte por email',
				tooltip: 'Resposta em até 24 horas',
			},
			{
				text: 'Dashboard básico',
				tooltip: 'Visualize seus dados principais',
			},
		],
		btn: {
			text: 'Começar Período de Teste',
			href: '#/contact',
		},
	},
	{
		highlighted: true,
		id: 'pro',
		name: 'Pro',
		info: 'Para agências e pequenos negócios',
		price: {
			monthly: 149,
			yearly: Math.round(149 * 12 * (1 - 0.12)),
		},
		features: [
			{ text: 'Propostas ilimitadas' },
			{ text: 'Análise avançada de concorrentes' },
			{ text: 'Relatórios customizados' },
			{
				text: 'Suporte prioritário',
				tooltip: 'Chat 24/7 com nosso time',
			},
			{ text: 'Ferramentas SEO integradas' },
			{ text: 'Dashboard completo' },
			{
				text: 'Integrações com suas ferramentas',
				tooltip: 'Conecte com seus softwares favoritos',
			},
		],
		btn: {
			text: 'Começar Agora',
			href: '#/contact',
		},
	},
	{
		name: 'Enterprise',
		info: 'Para grandes organizações',
		price: {
			monthly: 499,
			yearly: Math.round(499 * 12 * (1 - 0.12)),
		},
		features: [
			{ text: 'Tudo do plano Pro' },
			{ text: 'Análise estratégica personalizada' },
			{ text: 'Suporte dedicado' },
			{
				text: 'Onboarding customizado',
				tooltip: 'Implementação completa da solução',
			},
			{ text: 'Relatórios executivos mensais' },
			{ text: 'Treinamento da equipe' },
			{
				text: 'API e integrações customizadas',
				tooltip: 'Desenvolvimento sob demanda',
			},
		],
		btn: {
			text: 'Falar com o time',
			href: '#/contact',
		},
	},
];
