'use client';

import { PricingTier } from '@/components/constants/pricing-tier';
import { PriceCards } from '@/components/home/pricing/price-cards';

import { Environments, initializePaddle, Paddle } from '@paddle/paddle-js';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { CheckoutEventsData } from '@paddle/paddle-js/types/checkout/events';
import { cn } from '@/lib/utils';


interface Props {
  userEmail?: string;
}

// Define the Tier type
interface Tier {
  name: string;
  id: string;
  badge?: string;
  price: number;
  originalPrice?: number;
  features: {
    icon: any;
    text: string;
  }[];
  priceId: {
    [key: string]: string;
  };
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

export function CheckoutContents({ userEmail }: Props) {
  const pathname = usePathname();
  const priceId = pathname?.split('/').pop();
  const [quantity, setQuantity] = useState<number>(1);
  const [paddle, setPaddle] = useState<Paddle | null>(null);
  const [checkoutData, setCheckoutData] = useState<CheckoutEventsData | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Find the selected tier by matching the priceId with any tier's priceId
  const selectedTier = PricingTier.find(tier => 
    Object.values(tier.priceId).some(id => id === priceId)
  );

  const handleCheckoutEvents = (event: CheckoutEventsData) => {
    setCheckoutData(event);
  };

  useEffect(() => {
    console.log('Pathname:', pathname);
    console.log('Extracted priceId:', priceId);
    console.log('Is valid price ID:', priceId?.startsWith('pri_'));
  }, [pathname, priceId]);

  useEffect(() => {
    if (!paddle?.Initialized && process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN && process.env.NEXT_PUBLIC_PADDLE_ENV && priceId?.startsWith('pri_')) {
      console.log('Initializing Paddle with:', {
        token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN?.substring(0, 8) + '...',
        environment: process.env.NEXT_PUBLIC_PADDLE_ENV,
        priceId
      });

      initializePaddle({
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
            theme: 'dark',
            allowLogout: !userEmail,
            frameTarget: 'paddle-checkout-frame',
            frameInitialHeight: 450,
            frameStyle: 'width: 100%; background-color: transparent; border: none',
            successUrl: '/checkout/success',
          },
        },
      }).then(async (paddle) => {
        if (paddle && priceId) {
          try {
            console.log('Opening checkout with configuration:', {
              priceId,
              userEmail: userEmail || 'not provided'
            });
            
            setPaddle(paddle);
            await paddle.Checkout.open({
              ...(userEmail && { customer: { email: userEmail } }),
              items: [{ priceId, quantity: 1 }],
            });
          } catch (error) {
            console.error('Failed to open checkout:', error);
          }
        }
      }).catch(error => {
        console.error('Paddle initialization error:', error);
      });
    }
  }, [paddle?.Initialized, priceId, userEmail, priceId?.startsWith('pri_')]);

  useEffect(() => {
    if (paddle && priceId && paddle.Initialized) {
      paddle.Checkout.updateItems([{ priceId: priceId, quantity: quantity }]);
    }
  }, [paddle, priceId, quantity]);

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

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
                  'rounded-[12px] p-4 md:p-[42px]',
                  'flex flex-col gap-4 md:gap-8',
                  'bg-[#F8F9FA]',
                  'relative',
                  'transition-all duration-300 ease-in-out',
                  'cursor-pointer',
                  {
                    'shadow-[0_var(--sds-size-depth-400)_var(--sds-size-depth-800)_var(--sds-size-depth-negative-100)_var(--sds-color-black-200)] scale-105': 
                      isHovered,
                    'shadow-[0_var(--sds-size-depth-0)_var(--sds-size-depth-100)_var(--sds-size-depth-100)_var(--sds-size-depth-negative-100)_var(--sds-color-black-100)] scale-100': 
                      !isHovered
                  }
                )}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onFocus={() => setIsHovered(true)}
                onBlur={() => setIsHovered(false)}
              >
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-full max-w-[200px] flex justify-center">
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
                  ) : selectedTier.name === 'PREMIUM' && (
                    <div className="px-4 py-1.5 rounded-[20px] bg-transparent border-[1.5px] border-[#5B16FE]">
                      <span className="text-sm font-medium text-[#5B16FE]">
                        Best Value
                      </span>
                    </div>
                  )}
                </div>

                {/* Plan Details - responsive text sizes */}
                <div className="mb-4 md:mb-6">
                  <h3 className={cn(
                    "text-lg md:text-xl font-medium",
                    "transition-colors duration-300",
                    isHovered ? "text-[#5B16FE]" : "text-[#161C2D]"
                  )}>
                    {selectedTier.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-xl md:text-2xl font-medium text-[#5B16FE]">
                      ${selectedTier.price}
                    </span>
                    {selectedTier.originalPrice && (
                      <span className="text-[#64748B] text-sm line-through">
                        ${selectedTier.originalPrice}
                      </span>
                    )}
                  </div>
                  <p className="text-[#64748B] text-sm mt-1">One Time Payment</p>
                </div>

                {/* Features List - adjusted spacing */}
                <div className="space-y-3 md:space-y-4">
                  {selectedTier.features.map((feature, index) => (
                    <div 
                      key={index} 
                      className={cn(
                        "flex items-center gap-3",
                        "transition-transform duration-300",
                        isHovered && "transform hover:translate-x-1"
                      )}
                    >
                      <feature.icon className={cn(
                        "w-5 h-5",
                        "transition-colors duration-300",
                        isHovered ? "text-[#5B16FE]" : "text-[#64748B]"
                      )} />
                      <span className="text-[#64748B] text-sm">{feature.text}</span>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown with Quantity Controls */}
                <div className="mt-6 pt-6 border-t border-[#E2E8F0]/60 space-y-4">
                  {/* Quantity Controls */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[#64748B] text-sm">Quantity</span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleDecrement}
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center",
                          "border border-[#E2E8F0] transition-colors duration-200",
                          "hover:bg-[#5B16FE] hover:border-[#5B16FE] hover:text-white",
                          "focus:outline-none focus:ring-2 focus:ring-[#5B16FE] focus:ring-offset-2",
                          quantity <= 1 ? "text-gray-300 cursor-not-allowed" : "text-[#64748B]"
                        )}
                        disabled={quantity <= 1}
                      >
                        <svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 16 16" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path 
                            d="M4 8H12" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                      
                      <span className="text-[#161C2D] font-medium min-w-[20px] text-center">
                        {quantity}
                      </span>
                      
                      <button
                        onClick={handleIncrement}
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center",
                          "border border-[#E2E8F0] text-[#64748B]",
                          "hover:bg-[#5B16FE] hover:border-[#5B16FE] hover:text-white",
                          "transition-colors duration-200",
                          "focus:outline-none focus:ring-2 focus:ring-[#5B16FE] focus:ring-offset-2"
                        )}
                      >
                        <svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 16 16" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path 
                            d="M8 4V12M4 8H12" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="flex justify-between text-sm">
                    <span className="text-[#64748B]">Subtotal</span>
                    <span className="font-medium text-[#161C2D]">
                      ${(checkoutData?.totals.subtotal || 0) * quantity}
                    </span>
                  </div>

                  {/* Tax */}
                  <div className="flex justify-between text-sm">
                    <span className="text-[#64748B]">Tax</span>
                    <span className="font-medium text-[#161C2D]">
                      ${(checkoutData?.totals.tax || 0) * quantity}
                    </span>
                  </div>

                  {/* Total */}
                  <div className="pt-4 border-t border-[#E2E8F0]/60">
                    <div className="flex justify-between">
                      <span className="text-[#64748B]">Total due today</span>
                      <span className="font-medium text-[#161C2D] text-lg">
                        ${(checkoutData?.totals.total || 0) * quantity}
                      </span>
                    </div>
                  </div>
                </div>
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