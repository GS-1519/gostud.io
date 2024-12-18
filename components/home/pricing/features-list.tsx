'use client';

import { Check } from 'lucide-react';
import { Tier } from '@/components/constants/pricing-tier';

interface FeaturesListProps {
  tier: Tier;
}

export function FeaturesList({ tier }: FeaturesListProps) {
  if (!tier?.features) {
    return null;
  }

  return (
    <ul className="p-8 flex flex-col gap-4">
      {tier.features.map((feature) => (
        <li key={feature} className="flex gap-x-3">
          <Check className="h-6 w-6 text-muted-foreground" />
          <span className="text-base">{feature}</span>
        </li>
      ))}
    </ul>
  );
}