'use client';

import { useState } from 'react';
import { PricingTier } from '@/components/constants/pricing-tier';
import { IBillingFrequency } from '@/components/constants/billing-frequency';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Props {
  loading: boolean;
  frequency: IBillingFrequency;
  priceMap: Record<string, string>;
}

export function PriceCards({ loading, frequency, priceMap }: Props) {
  const [selectedTier, setSelectedTier] = useState('STANDARD');

  return (
    <div className="bg-white w-full py-16">
      {/* Heading Section */}
      <div className="text-center mb-12">
        <h1 className="text-[32px] font-Poppins font-medium tracking-[-0.04em] text-[#161C2D] mb-4">
          PREMIUM QUALITY AT 10 TIMES LESS PRICE
        </h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          No studio visits. No $200+ photoshoot fees. No waiting for appointments. Achieve stunning, professional-grade
          headshots in just 30 minutes—all from the comfort of your home.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="flex justify-center items-start gap-8 max-w-7xl mx-auto px-4">
        {PricingTier.map((tier) => {
          const isStandard = tier.name === 'STANDARD';
          const isPremium = tier.name === 'PREMIUM';
          const isSelected = selectedTier === tier.name;
          
          return (
            <div 
              key={tier.id} 
              className={cn(
                'w-[370px] rounded-lg bg-[#F8F9FA] p-8 cursor-pointer transition-all duration-300 relative',
                {
                  'shadow-[0_var(--sds-size-depth-100)_var(--sds-size-depth-100)_var(--sds-size-depth-negative-100)_var(--sds-color-black-100)]': isStandard && !isSelected,
                  'shadow-[0_var(--sds-size-depth-400)_var(--sds-size-depth-800)_var(--sds-size-depth-negative-100)_var(--sds-color-black-200)]': isSelected,
                  'shadow-none': !isSelected && !isStandard
                }
              )}
              onClick={() => setSelectedTier(tier.name)}
            >
              {/* Badge */}
              {(isStandard || isPremium) && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  {isStandard ? (
                    // 82% pick this plan badge
                    <div className="relative rounded-[50px] px-6 py-2.5 text-sm font-medium whitespace-nowrap bg-white before:absolute before:inset-0 before:rounded-[50px] before:p-[1px] before:bg-gradient-to-r before:from-[#8371FF] before:via-[#A077FE] before:to-[#01C7E4] before:-z-10">
                      <span className="bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4] bg-clip-text text-transparent">
                        82% pick this plan
                      </span>
                    </div>
                  ) : (
                    // Best Value badge
                    <div className="rounded-[50px] px-6 py-2.5 text-sm font-medium whitespace-nowrap bg-white border border-[#5B16FE]">
                      <span className="text-[#5B16FE]">
                        Best Value
                      </span>
                    </div>
                  )}
                </div>
              )}
              
              {/* Title */}
              <h3 className="text-[#5B16FE] text-xl font-semibold mb-8">
                {tier.name}
              </h3>
              
              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className={cn(
                    "text-2xl font-bold",
                    {
                      'text-[#8371FF]': isSelected && isStandard,
                      'text-[#161C2D]': !isSelected || !isStandard
                    }
                  )}>$</span>
                  <span className={cn(
                    "text-5xl font-bold mr-2",
                    {
                      'text-[#01C7E4]': isSelected && isStandard,
                      'text-[#161C2D]': !isSelected || !isStandard
                    }
                  )}>
                    {tier.name === 'BASIC' ? '10' : tier.name === 'STANDARD' ? '19' : '29'}
                  </span>
                  <span className={cn(
                    "line-through",
                    {
                      'text-[#01C7E4] opacity-50': isStandard,
                      'text-gray-400': !isStandard
                    }
                  )}>
                    ${tier.name === 'BASIC' ? '29' : tier.name === 'STANDARD' ? '45' : '75'}
                  </span>
                </div>
                <p className="text-gray-600 mt-2">One Time Payment</p>
              </div>

              {/* Features */}
              <div className="space-y-6 mb-8">
                {tier.features.map((feature) => (
                  <div key={feature.text} className="flex items-start gap-3">
                    <span className="mt-1">{feature.icon}</span>
                    <span className="text-gray-600">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Button */}
              <Button 
                className={cn(
                  'w-full rounded-full py-6 text-base font-medium',
                  {
                    'bg-[#5B16FE] hover:bg-[#5B16FE]/90 text-white': isStandard,
                    'bg-white border-2 border-[#5B16FE] text-[#5B16FE] hover:bg-gray-50': !isStandard
                  }
                )}
                asChild
              >
                <Link href={`/checkout/${tier.priceId[frequency.value]}`} className="flex items-center justify-center">
                  Try Now
                  <svg className="w-5 h-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </Button>
              
              <p className="text-xs text-center text-gray-500 mt-4">
                No subscription required
              </p>
            </div>
          );
        })}
      </div>

      
    </div>
  );
}