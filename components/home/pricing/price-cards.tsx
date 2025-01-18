'use client';

import { useState, useEffect } from 'react';
import { PricingTier } from '@/components/constants/pricing-tier';
import { IBillingFrequency } from '@/components/constants/billing-frequency';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast } from 'react-hot-toast';
import { User } from '@supabase/supabase-js';
import { useTranslations } from 'next-intl';

interface PriceCardsProps {
  frequency: IBillingFrequency;
  loading: boolean;
  priceMap: Record<string, any>;
  onTryNowClick: () => Promise<void>;
  user: any;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: Error | null;
}

export const PriceCards: React.FC<PriceCardsProps> = ({
  frequency,
  loading,
  priceMap,
  onTryNowClick,
  user
}) => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [activeTier, setActiveTier] = useState<string>('STANDARD');
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null
  });
  const t = useTranslations('Pricing');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) {
          setAuthState({
            user: null,
            loading: false,
            error
          });
          return;
        }

        setAuthState({
          user,
          loading: false,
          error: null
        });
      } catch (error) {
        console.error('Auth check error:', error);
        setAuthState({
          user: null,
          loading: false,
          error: error instanceof Error ? error : new Error('Auth check failed')
        });
      }
    };

    checkAuth();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        setAuthState({
          user: null,
          loading: false,
          error: null
        });
      } else if (event === 'SIGNED_IN' && session?.user) {
        setAuthState({
          user: session.user,
          loading: false,
          error: null
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handlePriceClick = async (priceId: string) => {
    try {
      if (!authState.user) {
        toast.error('Please login to continue');
        router.push('/login');
        return;
      }

      router.push(`/checkout/${priceId}`);
    } catch (error) {
      console.error('Price selection error:', error);
      toast.error('Please login to continue');
      router.push('/login');
    }
  };

  if (authState.loading || loading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="bg-white w-full md:py-16">
      {/* Heading Section */}
      <div className="text-center mb-8 md:mb-16 px-4">
        <h2 className="font-poppins font-medium text-[24px] md:text-[32px] 
                    leading-tight md:leading-[48px] tracking-[-0.04em] text-center
                    text-[#161C2D] max-w-[1134px] mx-auto">
          {t('title')}
        </h2>
        
        <p className="font-poppins font-[500] text-[16px] md:text-[18px]
                   leading-relaxed md:leading-[27px] text-center
                   text-[#161C2D]/70 max-w-[1077.84px] mx-auto mt-4">
          {t('description')}
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 max-w-6xl mx-auto px-4">
        {PricingTier.map((tier) => {
          const isStandard = tier.name === 'STANDARD';
          const isPremium = tier.name === 'PREMIUM';
          const isActive = activeTier === tier.name;
          
          return (
            <div 
              key={tier.id} 
              className={cn(
                'w-full md:w-[394px] min-h-[549px] rounded-[12px] p-4 md:p-[42px]',
                'flex flex-col gap-6 md:gap-8',
                'transition-all duration-300 ease-in-out',
                'relative cursor-pointer outline-none',
                {
                  'shadow-[0_var(--sds-size-depth-400)_var(--sds-size-depth-800)_var(--sds-size-depth-negative-100)_var(--sds-color-black-200)] md:scale-105':
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
                        {t(tier.badge!)}
                      </span>
                    </div>
                  ) : (
                    <div className="px-4 py-1.5 rounded-[20px] bg-transparent border-[1.5px] border-[#5B16FE]">
                      <span className="text-sm font-medium text-[#5B16FE]">
                        {t(tier.badge!)}
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
                        {t(feature.textKey)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Button Section */}
              <div className="mt-auto">
                <Button 
                  className={cn(
                    'w-full md:w-[310px] h-[48px] rounded-[46px] px-[25px] py-[12px]',
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
                  onClick={() => handlePriceClick(tier.priceId)}
                >
                  {t('tryNow')}
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
                </Button>
                
                <p className="text-xs text-center text-gray-500 mt-4">
                  {t('noSubscription')}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};