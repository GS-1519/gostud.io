export interface Tier {
  name: string;
  id: 'starter' | 'pro' | 'advanced';
  description: string;
  features: string[];
  featured: boolean;
  priceId: Record<string, string>;
}

export const PricingTier: Tier[] = [
  {
    name: 'Starter',
    id: 'starter',
    description: 'Ideal for individuals who want to get started with simple design tasks.',
    features: ['1 workspace', 'Limited collaboration', 'Export to PNG and SVG'],
    featured: false,
    priceId: { month: 'pri_01j6wfs9rsv8xcbgcz9jwtx146', year: 'pri_01j6wfs9rsv8xcbgcz9jwtx146' },
  },
  {
    name: 'Pro',
    id: 'pro',
    description: 'Enhanced design tools for scaling teams who need more flexibility.',
    features: ['Integrations', 'Unlimited workspaces', 'Advanced editing tools', 'Everything in Starter'],
    featured: true,
    priceId: { month: 'pri_01j6wfjbgevsc47sv22ja6qq60', year: 'pri_01j6wfjbgevsc47sv22ja6qq60' },
  },
  {
    name: 'Advanced',
    id: 'advanced',
    description: 'Powerful tools designed for extensive collaboration and customization.',
    features: [
      'Single sign on (SSO)',
      'Advanced version control',
      'Assets library',
      'Guest accounts',
      'Everything in Pro',
    ],
    featured: false,
    priceId: { month: 'pri_01j6w1gr39da9p41rymadfde5q', year: 'pri_01j6w1gr39da9p41rymadfde5q' },
  },
];