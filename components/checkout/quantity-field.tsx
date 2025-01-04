import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  quantity: number;
  handleQuantityChange: (quantity: number) => void;
}

export function QuantityField({ quantity, handleQuantityChange }: Props) {
  return (
    <div className="flex items-center gap-1 bg-white border border-[#E2E8F0] rounded-[8px] p-1">
      <Button
        onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}
        disabled={quantity <= 1}
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-[4px] hover:bg-[#F1F5F9] disabled:opacity-50"
      >
        <Minus className="h-4 w-4 text-[#64748B]" />
      </Button>

      <div className="w-12 text-center">
        <span className="text-sm font-medium text-[#161C2D]">{quantity}</span>
      </div>

      <Button
        onClick={() => handleQuantityChange(quantity + 1)}
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-[4px] hover:bg-[#F1F5F9]"
      >
        <Plus className="h-4 w-4 text-[#64748B]" />
      </Button>
    </div>
  );
}
