import { CheckoutEventsData } from '@paddle/paddle-js/types/checkout/events';
import { LoadingText } from '../ui/loading-text'; 

interface Props {
  checkoutData: CheckoutEventsData | null;
  quantity: number;
  handleQuantityChange: (quantity: number) => void;
}

export function PriceSection({ checkoutData, quantity }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm">
        <span className="text-[#64748B]">Subtotal</span>
        <span className="font-medium text-[#161C2D]">
          <LoadingText 
            currencyCode={checkoutData?.currency_code} 
            value={checkoutData?.totals.subtotal} 
          />
        </span>
      </div>
      
      <div className="flex justify-between text-sm">
        <span className="text-[#64748B]">Tax</span>
        <span className="font-medium text-[#161C2D]">
          <LoadingText 
            currencyCode={checkoutData?.currency_code} 
            value={checkoutData?.totals.tax} 
          />
        </span>
      </div>
      
      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between">
          <span className="text-[#64748B]">Total due today</span>
          <span className="font-medium text-[#161C2D] text-lg">
            <LoadingText 
              currencyCode={checkoutData?.currency_code} 
              value={checkoutData?.totals.total} 
            />
          </span>
        </div>
      </div>
    </div>
  );
}
