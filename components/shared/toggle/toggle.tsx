import { BillingFrequency, IBillingFrequency } from '@/components/constants/billing-frequency'; 
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tabs } from '@radix-ui/react-tabs'; 

interface Props {
  frequency: IBillingFrequency;
  setFrequency: (frequency: IBillingFrequency) => void;
}

export function Toggle({ setFrequency, frequency }: Props) {
  return (
    <div className="flex justify-center mb-8">
      <Tabs
        value={frequency.value}
        onValueChange={(value) =>
          setFrequency(BillingFrequency.find((billingFrequency) => value === billingFrequency.value)!)
        }
      >
        <TabsList>
          {BillingFrequency.map((billingFrequency) => (
            <TabsTrigger key={billingFrequency.value} value={billingFrequency.value}>
              {billingFrequency.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
