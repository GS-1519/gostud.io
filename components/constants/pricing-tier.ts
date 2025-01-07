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
    text: string;
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
      { icon: Camera, text: '20 high-quality headshots' },
      { icon: Clock, text: '2-hour processing time' },
      { icon: Shirt, text: '5 outfits and backgrounds' },
      { icon: Users, text: '5 poses' }
    ],
    priceId: 'pri_01j6wfjbgevsc47sv22ja6qq60'
  },
  {
    name: 'STANDARD',
    id: 'standard',
    badge: '82% pick this plan',
    price: 19,
    originalPrice: 45,
    credits: 30,
    features: [
      { icon: Camera, text: '60 high-quality headshots' },
      { icon: Clock, text: '1-hour processing time' },
      { icon: Shirt, text: '20 outfits and backgrounds' },
      { icon: Users, text: '20 poses' }
    ],
    priceId: 'pri_01j6w1gr39da9p41rymadfde5q'
  },
  {
    name: 'PREMIUM',
    id: 'premium',
    badge: 'Best Value',
    price: 29,
    originalPrice: 75,
    credits: 100,
    features: [
      { icon: Camera, text: '100 high-quality headshots' },
      { icon: Clock, text: '30-min processing time' },
      { icon: Shirt, text: '40 outfits and backgrounds' },
      { icon: Users, text: '40 poses' }
    ],
    featured: false,
    priceId: 'pri_01j6wfs9rsv8xcbgcz9jwtx146'
  }
];