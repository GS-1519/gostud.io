'use client'
import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import { toast } from 'react-hot-toast';
import { useRouter, usePathname } from 'next/navigation';
import { User } from '@supabase/auth-helpers-nextjs';

const PayPalScriptProvider = dynamic(
  () => import('@paypal/react-paypal-js').then(mod => mod.PayPalScriptProvider),
  { ssr: false }
);
const PayPalButtons = dynamic(
  () => import('@paypal/react-paypal-js').then(mod => mod.PayPalButtons),
  { ssr: false }
);

interface ExtendedUser extends User {
  credits?: number;
}

interface PricingComponentProps {
  user: ExtendedUser | null;
  onSuccess?: () => void;
}

const PricingComponent: React.FC<PricingComponentProps> = ({ user, onSuccess }) => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleGetStarted = () => {
    router.push('/overview');
  };

  const pricingTiers = [
    {
      name: 'BASIC',
      price: '10',
      originalPrice: '$29',
      features: [
        '📸 20 high-quality headshots',
        '2-hour processing time',
        '👕 5 outfits and backgrounds',
        '🧍‍♂️ 5 poses'
      ],
      buttonText: 'Try Now',
    },
    {
      name: 'STANDARD',
      price: '19',
      originalPrice: '$45',
      features: [
        '📸 60 high-quality headshots',
        '1-hour processing time',
        '👕 20 outfits and backgrounds',
        '🧍‍♂️ 20 poses'
      ],
      buttonText: 'Try Now',
      highlight: true,
      popularTag: '82% pick this plan',
    },
    {
      name: 'PREMIUM',
      price: '29',
      originalPrice: '$75',
      features: [
        '📸 100 high-quality headshots',
        '30-min processing time',
        '👕 40 outfits and backgrounds',
        '🧍‍♂️ 40 poses'
      ],
      buttonText: 'Try Now',
      bestValueTag: 'Best Value',
    },
  ];

  const handlePayment = async (amount: string) => {
    try {
      console.log('Creating PayPal order for amount:', amount);
      const response = await fetch('/astria/paypal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency: 'USD',
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error || 'Unknown error'}`);
      }
      
      const order = await response.json();
      console.log('PayPal order created:', order);
      return order.id;
    } catch (error) {
      console.error('Error creating PayPal order:', error instanceof Error ? error : new Error(String(error)));
      toast.error(`Failed to create order: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  };

  const handlePaymentSuccess = async (data: { orderID: string }, selectedTier: any) => {
    try {
      console.log('Payment approved:', { orderID: data.orderID });
      
      const response = await fetch('/astria/paypal', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderID: data.orderID,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Payment captured:', result);

      // Retrieve the model data from localStorage
      const storedModelData = localStorage.getItem('trainModelData');
      let modelData = storedModelData ? JSON.parse(storedModelData) : { modelInfo: {}, imageUrls: [] };
      
      // Ensure we're not overwriting the existing modelInfo
      modelData.paymentInfo = {
        orderId: data.orderID,
        captureId: result.captureID,
        status: result.status,
        selectedTier: selectedTier,
      };
      
      // Make sure we're not losing the gender information
      if (!modelData.modelInfo) {
        modelData.modelInfo = {};
      }
      
      localStorage.setItem('trainModelData', JSON.stringify(modelData));
      console.log('Updated model data in localStorage:', modelData);

      toast.success('Payment successful! Redirecting to summary page.');
      router.push('/summary');
    } catch (error) {
      console.error('Error capturing payment:', error instanceof Error ? error : new Error(String(error)));
      toast.error(`Failed to process payment: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handlePurchaseSuccess = () => {
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="w-full bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            PREMIUM QUALITY AT 10 TIMES LESS PRICE
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            No studio visits. No $200+ photoshoot fees. No waiting for appointments. Achieve stunning, professional-grade
            headshots in just 30 minutes—all from the comfort of your home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <div key={tier.name} className="relative">
              {(tier.popularTag || tier.bestValueTag) && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className={`px-4 py-1 rounded-full text-sm font-medium 
                    ${tier.popularTag ? 'bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4] bg-clip-text text-transparent border border-[#8371FF]' : 'text-[#5B16FE] border border-[#5B16FE]'}
                    bg-white`}>
                    {tier.popularTag || tier.bestValueTag}
                  </div>
                </div>
              )}

              <div className={`bg-white rounded-lg p-6 h-full flex flex-col
                ${tier.highlight ? 'shadow-lg' : 'border border-gray-200'}`}>
                <h2 className="text-[#473BF0] text-xl font-bold mb-4">{tier.name}</h2>
                
                <div className="flex items-baseline mb-2">
                  <span className="text-3xl font-bold">${tier.price}</span>
                  <span className="ml-2 text-gray-400 line-through">{tier.originalPrice}</span>
                </div>
                
                <p className="text-gray-600 mb-6">One Time Payment</p>
                
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {isHomePage ? (
                  <button className={`w-full py-3 rounded-full font-medium
                    ${tier.highlight ? 'bg-[#5B16FE] text-white' : 'border border-[#5B16FE] text-[#5B16FE]'}`}>
                    {tier.buttonText}
                    <ArrowRight className="ml-2 inline-block h-4 w-4" />
                  </button>
                ) : (
                  isClient && (
                    <PayPalScriptProvider options={{ "clientId": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '', "currency": "USD" }}>
                      <PayPalButtons
                        createOrder={() => handlePayment(tier.price)}
                        onApprove={async (data, actions) => {
                          try {
                            await handlePaymentSuccess(data, tier);
                          } catch (error) {
                            console.error('Error in onApprove:', error instanceof Error ? error : new Error(String(error)));
                            toast.error(`Failed to process payment: ${error instanceof Error ? error.message : 'Unknown error'}`);
                          }
                        }}
                        onError={(err) => {
                          console.error('PayPal Checkout onError', err instanceof Error ? err : new Error(String(err)));
                          toast.error(`Payment error: ${err instanceof Error ? err.message : 'Unknown error'}`);
                        }}
                        style={{ layout: "vertical", shape: "rect" }}
                      />
                    </PayPalScriptProvider>
                  )
                )}

                <p className="text-center text-sm text-gray-500 mt-4">
                  No subscription required
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingComponent;