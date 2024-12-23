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
  const [activeTier, setActiveTier] = useState<string>('STANDARD');

  return (
    <div className="bg-white w-full py-16">
      {/* Heading Section */}
      <div className="text-center mb-16">
        <h1 className="w-[1134px] h-[48px] mx-auto
                     font-poppins font-medium text-[32px] 
                     leading-[48px] tracking-[-0.04em] text-center
                     text-[#161C2D] whitespace-nowrap">
          PREMIUM QUALITY AT 10 TIMES LESS PRICE
        </h1>
        
        <p className="w-[1077.84px] h-[54px] mx-auto mt-4
                    font-poppins font-[500] text-[18px]
                    leading-[27px] text-center
                    text-[#161C2D]/70">
          No studio visits. No $200+ photoshoot fees. No waiting for appointments. Achieve stunning, professional-grade
          headshots in just 30 minutes—all from the comfort of your home.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="flex justify-center items-stretch gap-6 max-w-6xl mx-auto px-4">
        {PricingTier.map((tier) => {
          const isStandard = tier.name === 'STANDARD';
          const isPremium = tier.name === 'PREMIUM';
          const isActive = activeTier === tier.name;
          
          return (
            <div 
              key={tier.id} 
              className={cn(
                'w-[394px] min-h-[549px] rounded-[12px] p-[42px]',
                'flex flex-col gap-8',
                'transition-all duration-300 ease-in-out',
                'relative cursor-pointer outline-none',
                {
                  'shadow-[0_var(--sds-size-depth-400)_var(--sds-size-depth-800)_var(--sds-size-depth-negative-100)_var(--sds-color-black-200)] scale-105':
                    isActive,
                  'shadow-none scale-100': !isActive,
                  'bg-white': isActive,
                  'bg-[#F8F9FA]': !isActive,
                }
              )}
              onMouseEnter={() => setActiveTier(tier.name)}
              onMouseLeave={() => setActiveTier('STANDARD')}
              onFocus={() => setActiveTier(tier.name)}
              onBlur={() => setActiveTier('STANDARD')}
              tabIndex={0}
            >
              {/* Badge */}
              {(isStandard || isPremium) && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  {isStandard ? (
                    <div className="gradient-border px-4 py-1.5">
                      <span className="text-sm font-medium" style={{
                        background: 'linear-gradient(90deg, #8371FF -39.48%, #A077FE 15.54%, #01C7E4 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}>
                        82% pick this plan
                      </span>
                    </div>
                  ) : (
                    <div className="px-4 py-1.5 rounded-[20px] bg-transparent border-[1.5px] border-[#5B16FE]">
                      <span className="text-sm font-medium text-[#5B16FE]">
                        Best Value
                      </span>
                    </div>
                  )}
                </div>
              )}
              
              {/* Title Section */}
              <div>
                <h3 className="text-[#5B16FE] text-xl font-semibold">
                  {tier.name}
                </h3>
              </div>
              
              {/* Price Section */}
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  {isStandard ? (
                    // Standard tier with specific colors
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-[#8371FF]">$</span>
                      <span className="text-5xl font-bold ml-1 text-[#01C7E4]">19</span>
                      <span className="text-gray-400 line-through ml-2 flex items-baseline">
                        <span className="text-[#8371FF]">$</span>
                        <span className="text-[#01C7E4]">45</span>
                      </span>
                    </div>
                  ) : (
                    // Regular price for other tiers
                    <>
                      <span className="text-3xl font-bold text-[#161C2D]">$</span>
                      <span className="text-5xl font-bold text-[#161C2D] mr-2">
                        {tier.name === 'BASIC' ? '10' : '29'}
                      </span>
                      <span className="text-[#161C2D] line-through">
                        ${tier.name === 'BASIC' ? '29' : '75'}
                      </span>
                    </>
                  )}
                </div>
                <p className="text-gray-500 mt-2">One Time Payment</p>
              </div>

              {/* Features Section */}
              <div className="space-y-4 mb-8">
                {tier.features.map((feature, idx) => {
                  const getIconColor = () => {
                    if (isStandard) {
                      switch (idx) {
                        case 0: return "text-[#5B16FE]"; // Camera icon - purple
                        case 1: return "text-[#01C7E4]"; // Clock icon - blue
                        case 2: return "text-[#8371FF]"; // Image/outfit icon - light purple
                        case 3: return "text-[#A077FE]"; // Users/poses icon - medium purple
                        default: return "text-[#5B16FE]";
                      }
                    }
                    return "text-gray-600"; // Default color for non-standard tiers
                  };

                  const getIconStyle = () => {
                    const baseStyle = "w-5 h-5"; // Slightly larger icons
                    return cn(baseStyle, getIconColor());
                  };

                  return (
                    <div 
                      key={`${tier.name}-feature-${idx}`}
                      className="flex items-center gap-3"
                    >
                      <div className="flex-shrink-0">
                        <feature.icon className={getIconStyle()} />
                      </div>
                      <span className="text-[15px] text-[#64748B]">
                        {feature.text}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Button Section */}
              <div className="mt-auto">
                <Button 
                  className={cn(
                    'w-[310px] h-[48px] rounded-[46px] px-[25px] py-[12px]',
                    'flex items-center justify-center gap-[10px]',
                    'text-base font-medium transition-all duration-300',
                    'focus:outline-none focus:ring-2 focus:ring-[#5B16FE] focus:ring-offset-2',
                    {
                      'bg-[#5B16FE] text-white hover:bg-[#4B0FD9] transform hover:scale-105': 
                        isActive,
                      'bg-white border border-[#5B16FE] text-[#5B16FE] hover:bg-[#5B16FE]/5': 
                        !isActive
                    }
                  )}
                  asChild
                >
                  <Link 
                    href={`/checkout/${tier.priceId[frequency.value as keyof typeof tier.priceId]}`} 
                    className="flex items-center justify-center gap-[10px]"
                    onFocus={() => setActiveTier(tier.name)}
                    onBlur={() => setActiveTier('STANDARD')}
                  >
                    Try Now
                    <svg 
                      className={cn(
                        "w-5 h-5 transition-transform duration-300",
                        { "transform translate-x-1": isActive }
                      )} 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </Link>
                </Button>
                
                <p className="text-xs text-center text-gray-500 mt-4">
                  No subscription required
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}