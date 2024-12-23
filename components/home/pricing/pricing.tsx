import { PriceCards } from '@/components/home/pricing/price-cards';
import { useEffect, useState } from 'react';
import { BillingFrequency, IBillingFrequency } from '@/components/constants/billing-frequency';
import { Environments, initializePaddle, Paddle } from '@paddle/paddle-js';
import { usePaddlePrices } from '@/components/hooks/usePaddlePrices';

interface PricingProps {
  onPaymentClick: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onPaymentClick }) => {
  const [frequency, setFrequency] = useState<IBillingFrequency>(BillingFrequency[0]);
  const [paddle, setPaddle] = useState<Paddle | undefined>(undefined);

  const { prices, loading } = usePaddlePrices(paddle, 'US');

  useEffect(() => {
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
      }
    };

    initPaddle();
  }, []);

  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <PriceCards 
          frequency={frequency} 
          loading={loading} 
          priceMap={prices || {}} 
        />
      </div>
    </div>
  );
};
