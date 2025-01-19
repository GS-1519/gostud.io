'use client';

import { Pricing } from '@/components/home/pricing/pricing';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useUserInfo } from '@/components/hooks/useUserInfo';

export default function PricingPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { user, loading } = useUserInfo(supabase);

  const handlePaymentClick = async () => {
    try {
      if (!user) {
        router.push('/login');
        return;
      }
    } catch (error) {
      console.error('Payment error:', error);
      router.push('/login');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main>
        <Pricing 
          onPaymentClick={handlePaymentClick}
          user={user}
          isLoading={loading}
        />
      </main>
    </div>
  );
}
