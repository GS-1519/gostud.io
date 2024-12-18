'use client';

import { HeroSection } from '@/components/home/hero-section/hero-section';
import { Pricing } from '@/components/home/pricing/pricing';
import { useUserInfo } from '@/components/hooks/useUserInfo';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

export default function PricingPage() {
  const router = useRouter();
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { user } = useUserInfo(supabase);

  // Handler for payment/subscription button clicks
  const handlePaymentClick = () => {
    if (!user) {
      router.push('/login'); // Redirect to login if user tries to pay without being logged in
      return;
    }
    // Proceed with payment logic here
    // ... payment processing code ...
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main>
        <HeroSection />
        <Pricing onPaymentClick={handlePaymentClick} />
      </main>
    </div>
  );
}
  