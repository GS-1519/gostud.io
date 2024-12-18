'use client';

import { PriceSection } from '@/components/checkout/price-section';
import { Environments, initializePaddle, Paddle } from '@paddle/paddle-js';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { CheckoutEventsData } from '@paddle/paddle-js/types/checkout/events';

type PathParams = {
  priceId: string;
}

interface Props {
  userEmail?: string;
}

export function CheckoutContents({ userEmail }: Props) {
  const pathname = usePathname();
  const priceId = pathname?.split('/').pop();
  const isValidPriceId = priceId?.startsWith('pri_');
  const [quantity, setQuantity] = useState<number>(1);
  const [paddle, setPaddle] = useState<Paddle | null>(null);
  const [checkoutData, setCheckoutData] = useState<CheckoutEventsData | null>(null);

  const handleCheckoutEvents = (event: CheckoutEventsData) => {
    setCheckoutData(event);
  };

  useEffect(() => {
    console.log('Pathname:', pathname);
    console.log('Extracted priceId:', priceId);
    console.log('Is valid price ID:', isValidPriceId);
  }, [pathname, priceId]);

  useEffect(() => {
    if (!paddle?.Initialized && process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN && process.env.NEXT_PUBLIC_PADDLE_ENV && isValidPriceId) {
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
  }, [paddle?.Initialized, priceId, userEmail, isValidPriceId]);

  useEffect(() => {
    if (paddle && priceId && paddle.Initialized) {
      paddle.Checkout.updateItems([{ priceId: priceId, quantity: quantity }]);
    }
  }, [paddle, priceId, quantity]);

  return (
    <div
      className={
        'rounded-lg md:bg-background/80 md:backdrop-blur-[24px] md:p-10 md:pl-16 md:pt-16 md:min-h-[400px] flex flex-col justify-between relative'
      }
    >
      
      <div className={'flex flex-col md:flex-row gap-8 md:gap-16'}>
        <div className={'w-full md:w-[400px]'}>
          <PriceSection checkoutData={checkoutData} quantity={quantity} handleQuantityChange={setQuantity} />
        </div>
        <div className={'min-w-[375px] lg:min-w-[535px]'}>
          <div className={'text-base leading-[20px] font-semibold mb-8'}>Payment details</div>
          <div className={'paddle-checkout-frame'} />
        </div>
      </div>
    </div>
  );
}