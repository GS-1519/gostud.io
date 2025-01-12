'use client';

import { PricingTier } from '@/components/constants/pricing-tier';
import { PriceCards } from '@/components/home/pricing/price-cards';

import { Environments, initializePaddle, Paddle } from '@paddle/paddle-js';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { CheckoutEventsData } from '@paddle/paddle-js/types/checkout/events';
import { cn } from '@/lib/utils';


interface Props {
  userEmail?: string;
  userId?: string;
}

// Define the Tier type
interface Tier {
  name: string;
  id: 'basic' | 'standard' | 'premium';
  badge?: string;
  price: number;
  originalPrice: number;
  credits: number;
  features: Array<{
    icon: any;
    text: string;
  }>;
  priceId: string;
  featured?: boolean;
}

// Add this interface at the top
interface PricingCardDetails {
  name: string;
  price: number;
  originalPrice?: number;
  features: {
    icon: any;
    text: string;
  }[];
  badge?: string;
  priceId: string;
}

// Add these CSS variables at the root level
const styles = {
  "--sds-size-depth-0": "0px",
  "--sds-size-depth-100": "2px",
  "--sds-size-depth-400": "8px",
  "--sds-size-depth-800": "24px",
  "--sds-size-depth-negative-100": "-1px",
  "--sds-color-black-100": "rgba(0, 0, 0, 0.05)",
  "--sds-color-black-200": "rgba(0, 0, 0, 0.1)",
} as React.CSSProperties;

export function CheckoutContents({ userEmail, userId }: Props) {
  const pathname = usePathname();
  const priceId = pathname?.split('/').pop();
  const [paddle, setPaddle] = useState<Paddle | null>(null);
  const [checkoutData, setCheckoutData] = useState<CheckoutEventsData | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  // Find the selected tier by matching the priceId with any tier's priceId
  const selectedTier = PricingTier.find(tier => tier.priceId === priceId);

  const handleCheckoutEvents = (event: CheckoutEventsData) => {
    setCheckoutData(event);
    
    if (event.status === 'completed') {
      router.push('/summary');
    }
  };

  useEffect(() => {
    console.log('Pathname:', pathname);
    console.log('Extracted priceId:', priceId);
    console.log('Is valid price ID:', priceId?.startsWith('pri_'));
  }, [pathname, priceId]);

  useEffect(() => {
    const initializePaddleCheckout = async () => {
      if (!paddle?.Initialized && process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN && process.env.NEXT_PUBLIC_PADDLE_ENV && priceId?.startsWith('pri_')) {
        try {
          // Find the selected tier using the single priceId
          const selectedTier = PricingTier.find(tier => tier.priceId === priceId);

          if (selectedTier) {
            const cardDetails: PricingCardDetails = {
              name: selectedTier.name,
              price: selectedTier.price,
              originalPrice: selectedTier.originalPrice,
              features: selectedTier.features,
              badge: selectedTier.badge,
              priceId: selectedTier.priceId
            };

            localStorage.setItem('selectedPricingCard', JSON.stringify(cardDetails));
            
            // Update trainModelData
            const existingData = localStorage.getItem('trainModelData');
            if (existingData) {
              const parsedData = JSON.parse(existingData);
              parsedData.paymentInfo = {
                selectedTier: cardDetails
              };
              localStorage.setItem('trainModelData', JSON.stringify(parsedData));
            }
          }

          // Initialize Paddle with one-time payment settings
          const paddleInstance = await initializePaddle({
            token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
            environment: process.env.NEXT_PUBLIC_PADDLE_ENV as Environments,
            eventCallback: (event) => {
              if (event.data && event.name) {
                handleCheckoutEvents(event.data);
              }
            },
            checkout: {
              settings: {
                displayMode: 'inline',
                theme: 'light',
                allowLogout: true,
                frameTarget: 'paddle-checkout-frame',
                frameInitialHeight: 450,
                frameStyle: 'width: 100%; background-color: transparent; border: none',
                successUrl: '/summary',
              },
            },
          });

          if (paddleInstance && priceId) {
            setPaddle(paddleInstance);
            
            // Open checkout after setting paddle instance
            try {
              await paddleInstance.Checkout.open({
                items: [{ priceId, quantity: 1 }],
                customData: {
                  user_id: userId
                }
              });
            } catch (error) {
              console.error('Failed to open checkout:', error);
            }
          }
        } catch (error) {
          console.error('Failed to initialize Paddle:', error);
        }
      }
    };

    initializePaddleCheckout();
  }, [priceId, userId]); // Removed paddle?.Initialized from dependencies

  useEffect(() => {
    if (paddle && priceId && paddle.Initialized) {
      paddle.Checkout.updateItems([{ priceId: priceId, quantity: 1 }]);
    }
  }, [paddle, priceId]);

  useEffect(() => {
    if (priceId?.startsWith('pri_')) {
      try {
        // Don't clear or overwrite selectedModelPack
        const selectedTier = PricingTier.find(tier => 
          Object.values(tier.priceId).some(id => id === priceId)
        );

        if (selectedTier) {
          // Save pricing data with a different key
          localStorage.setItem('selectedPricingTier', JSON.stringify(selectedTier));

          // Update trainModelData without touching the pack data
          const existingData = localStorage.getItem('trainModelData');
          if (existingData) {
            const parsedData = JSON.parse(existingData);
            parsedData.paymentInfo = {
              selectedTier: selectedTier
            };
            localStorage.setItem('trainModelData', JSON.stringify(parsedData));
          }
        }
      } catch (error) {
        console.error('Error in checkout:', error);
      }
    }
  }, [priceId]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1274px] w-full mx-auto px-4 md:px-[70.5px]">
        {/* Header Section */}
        <div className="text-center mb-4 bg-white pt-2 z-10">
          <h1 className="text-[24px] md:text-[32px] font-semibold text-[#161C2D] mb-2">
            CHECK-OUT
          </h1>
          <p className="text-[14px] md:text-[16px] text-[#64748B] max-w-[800px] mx-auto leading-[1.6] px-4 md:px-0">
            Save hundreds compared to a photo shoot. Customize your AI professional headshot with 
            manual edits or get a redo if the initial uploads were wrong.
          </p>
        </div>

        {/* Main content area with proper scrolling */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-[44px] px-2 md:px-0 pb-10">
          {/* Left Section */}
          <div className="w-full lg:w-[400px] lg:sticky lg:top-8">
            {selectedTier && (
              <div 
                className={cn(
                  'w-full max-w-[394px] min-h-[549px] rounded-[12px] p-[42px]',
                  'flex flex-col gap-8',
                  'bg-white',
                  'relative',
                  'transition-all duration-300 ease-in-out',
                  'shadow-[0_var(--sds-size-depth-400)_var(--sds-size-depth-800)_var(--sds-size-depth-negative-100)_var(--sds-color-black-200)]'
                )}
              >
                {/* Badge */}
                {selectedTier.name === 'STANDARD' || selectedTier.name === 'PREMIUM' ? (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    {selectedTier.name === 'STANDARD' ? (
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
                ) : null}

                {/* Title Section */}
                <div>
                  <h3 className="text-[#5B16FE] text-xl font-semibold">
                    {selectedTier.name}
                  </h3>
                </div>

                {/* Price Section */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    {selectedTier.name === 'STANDARD' ? (
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-[#8371FF]">$</span>
                        <span className="text-5xl font-bold ml-1 text-[#01C7E4]">19</span>
                        <span className="text-gray-400 line-through ml-2 flex items-baseline">
                          <span className="text-[#8371FF]">$</span>
                          <span className="text-[#01C7E4]">45</span>
                        </span>
                      </div>
                    ) : (
                      <>
                        <span className="text-3xl font-bold text-[#161C2D]">$</span>
                        <span className="text-5xl font-bold text-[#161C2D] mr-2">
                          {selectedTier.price}
                        </span>
                        {selectedTier.originalPrice && (
                          <span className="text-[#161C2D] line-through">
                            ${selectedTier.originalPrice}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                  <p className="text-gray-500 mt-2">One Time Payment</p>
                </div>

                {/* Features Section */}
                <div className="space-y-4 mb-8">
                  {selectedTier.features.map((feature, idx) => (
                    <div 
                      key={`feature-${idx}`}
                      className="flex items-center gap-3"
                    >
                      <feature.icon className={cn(
                        "w-5 h-5",
                        selectedTier.name === 'STANDARD' 
                          ? [
                              "text-[#5B16FE]",
                              "text-[#01C7E4]",
                              "text-[#8371FF]",
                              "text-[#A077FE]"
                            ][idx] || "text-[#5B16FE]"
                          : "text-gray-600"
                      )} />
                      <span className="text-[15px] text-[#64748B]">
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="mt-auto pt-6 border-t border-[#E2E8F0]/60 space-y-4">
                  {/* Subtotal */}
                  <div className="flex justify-between text-sm">
                    <span className="text-[#64748B]">Subtotal</span>
                    <span className="font-medium text-[#161C2D]">
                      ${checkoutData?.totals.subtotal || selectedTier.price}
                    </span>
                  </div>

                  {/* Tax */}
                  <div className="flex justify-between text-sm">
                    <span className="text-[#64748B]">Tax</span>
                    <span className="font-medium text-[#161C2D]">
                      ${checkoutData?.totals.tax || 0}
                    </span>
                  </div>

                  {/* Total */}
                  <div className="pt-4 border-t border-[#E2E8F0]/60">
                    <div className="flex justify-between">
                      <span className="text-[#64748B]">Total due today</span>
                      <span className="font-medium text-[#161C2D] text-lg">
                        ${checkoutData?.totals.total || selectedTier.price}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-center text-gray-500 mt-4">
                  No subscription required
                </p>
              </div>
            )}
          </div>

          {/* Right Section - Paddle Checkout */}
          <div className="flex-1">
            <div 
              id="paddle-checkout" 
              className="paddle-checkout-frame"
              style={{
                width: '100%',
                maxWidth: '684px',
                height: 'auto',
                minHeight: '450px',
                padding: '16px',
                borderRadius: '20px',
                boxShadow: 'var(--sds-size-depth-0) var(--sds-size-depth-400) var(--sds-size-depth-800) var(--sds-size-depth-negative-100) var(--sds-color-black-200)',
                marginBottom: '40px',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}