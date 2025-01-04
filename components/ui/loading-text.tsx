import { Skeleton } from "@/components/ui/skeleton";
import { formatMoney } from "@/app/utils/paddle/parse-money";

interface LoadingTextProps {
  value: number | undefined;
  currencyCode: string | undefined;
}

export function LoadingText({ value, currencyCode }: LoadingTextProps) {
  if (value === undefined || currencyCode === undefined) {
    return <Skeleton className="h-5 w-20 bg-border" />;
  }
  
  return formatMoney(value, currencyCode);
} 