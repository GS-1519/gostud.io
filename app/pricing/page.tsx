'use client';
import { Pricing } from '@/components/home/pricing/pricing';
import { useUserInfo } from '@/components/hooks/useUserInfo';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function PricingPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { user } = useUserInfo(supabase);

  // Handler for payment/subscription button clicks
  const handlePaymentClick = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/login');
        return;
      }
      // Proceed with payment logic here
    } catch (error) {
      console.error('Error:', error);
      router.push('/login');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main>
        <Pricing onPaymentClick={handlePaymentClick} />
      </main>
    </div>
  );
}
  