'use client'
import { PriceCards } from '@/components/home/pricing/price-cards';
import { useEffect, useState } from 'react';
import { BillingFrequency, IBillingFrequency } from '@/components/constants/billing-frequency';
import { Environments, initializePaddle, Paddle } from '@paddle/paddle-js';
import { usePaddlePrices } from '@/components/hooks/usePaddlePrices';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import type { ExtendedUser } from '@/components/hooks/useUserInfo';

interface PricingProps {
  showTitle?: boolean;
  onPaymentClick?: () => Promise<void>;
  user: User | null;
  isLoading?: boolean;
}

export const Pricing: React.FC<PricingProps> = ({ 
  showTitle = true, 
  onPaymentClick,
  user,
  isLoading
}) => {
  const [frequency, setFrequency] = useState<IBillingFrequency>(BillingFrequency[0]);
  const [paddle, setPaddle] = useState<Paddle | undefined>(undefined);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const { prices, loading } = usePaddlePrices(paddle, 'US');

  // Handle try now button click
  const handleTryNowClick = async () => {
    try {
      if (!user) {
        router.push('/login');
        return;
      }
      
      if (onPaymentClick) {
        await onPaymentClick();
        return;
      }
    } catch (error) {
      console.error('Error:', error);
      router.push('/login');
    }
  };

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 3;

    const initPaddle = async () => {
      try {
        if (process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN && process.env.NEXT_PUBLIC_PADDLE_ENV) {
          const paddleInstance = await initializePaddle({
            token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
            environment: process.env.NEXT_PUBLIC_PADDLE_ENV as Environments,
          });
          setPaddle(paddleInstance);
        }
      } catch (error) {
        console.error('Failed to initialize Paddle:', error);
        if (retryCount < maxRetries) {
          retryCount++;
          setTimeout(initPaddle, 1000 * retryCount); // Exponential backoff
        }
      }
    };

    initPaddle();
  }, []);

  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <PriceCards 
          frequency={frequency} 
          loading={Boolean(loading || isLoading)} 
          priceMap={prices || {}} 
          onTryNowClick={handleTryNowClick}
          user={user}
        />
      </div>
    </div>
  );
};
