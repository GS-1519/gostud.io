import { Camera, Clock, Shirt, Users } from 'lucide-react';

export interface Tier {
  name: string;
  id: 'basic' | 'standard' | 'premium';
  badge?: string;
  price: number;
  originalPrice: number;
  credits: number;
  features: Array<{
    icon: typeof Camera | typeof Clock | typeof Shirt | typeof Users;
    textKey: string;
  }>;
  priceId: string;
  featured?: boolean;
}

export const PricingTier: Tier[] = [
  {
    name: 'BASIC',
    id: 'basic',
    price: 10,
    originalPrice: 29,
    credits: 10,
    features: [
      { icon: Camera, textKey: 'features.headshots.basic' },
      { icon: Clock, textKey: 'features.processing.basic' },
      { icon: Shirt, textKey: 'features.outfits.basic' },
      { icon: Users, textKey: 'features.poses.basic' }
    ],
    priceId: 'pri_01j6wfjbgevsc47sv22ja6qq60'
  },
  {
    name: 'STANDARD',
    id: 'standard',
    badge: 'badges.mostPopular',
    price: 19,
    originalPrice: 45,
    credits: 30,
    features: [
      { icon: Camera, textKey: 'features.headshots.standard' },
      { icon: Clock, textKey: 'features.processing.standard' },
      { icon: Shirt, textKey: 'features.outfits.standard' },
      { icon: Users, textKey: 'features.poses.standard' }
    ],
    priceId: 'pri_01j6w1gr39da9p41rymadfde5q'
  },
  {
    name: 'PREMIUM',
    id: 'premium',
    badge: 'badges.bestValue',
    price: 29,
    originalPrice: 75,
    credits: 100,
    features: [
      { icon: Camera, textKey: 'features.headshots.premium' },
      { icon: Clock, textKey: 'features.processing.premium' },
      { icon: Shirt, textKey: 'features.outfits.premium' },
      { icon: Users, textKey: 'features.poses.premium' }
    ],
    featured: false,
    priceId: 'pri_01j6wfs9rsv8xcbgcz9jwtx146'
  }
];