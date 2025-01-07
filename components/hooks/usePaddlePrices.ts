import { Paddle, PricePreviewParams, PricePreviewResponse } from '@paddle/paddle-js';
import { useEffect, useState } from 'react';
import { PricingTier } from '@/components/constants/pricing-tier';

export type PaddlePrices = Record<string, string>;

function getLineItems(): PricePreviewParams['items'] {
  return PricingTier.map((tier) => ({
    priceId: tier.priceId,
    quantity: 1
  }));
}

function getPriceAmounts(prices: PricePreviewResponse) {
  return prices.data.details.lineItems.reduce((acc, item) => {
    acc[item.price.id] = item.formattedTotals.total;
    return acc;
  }, {} as PaddlePrices);
}

export function usePaddlePrices(
  paddle: Paddle | undefined,
  country: string = 'US'
): { prices: PaddlePrices; loading: boolean } {
  const [prices, setPrices] = useState<PaddlePrices>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPrices = async () => {
      if (!paddle?.Initialized) {
        console.log('Paddle not initialized yet');
        return;
      }

      try {
        setLoading(true);
        const items = getLineItems();
        
        if (items.length === 0) {
          console.error('No valid price IDs found');
          return;
        }

        const paddlePricePreviewRequest: PricePreviewParams = {
          items: items,
          ...(country !== 'OTHERS' && { address: { countryCode: country } }),
        };

        const pricePreview = await paddle.PricePreview(paddlePricePreviewRequest);
        setPrices(getPriceAmounts(pricePreview));
      } catch (error) {
        console.error('Error fetching price preview:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, [paddle, country]);

  return { prices, loading };
}