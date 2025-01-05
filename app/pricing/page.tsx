'use client';

import { Pricing } from '@/components/home/pricing/pricing';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useUserInfo } from '@/components/hooks/useUserInfo';
import type { ExtendedUser } from '@/components/hooks/useUserInfo';

export default function PricingPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { user, loading } = useUserInfo(supabase);

  const handlePaymentClick = async () => {
    try {
      // Verify authentication before proceeding
      const { data: { user: currentUser }, error } = await supabase.auth.getUser();
      
      if (error || !currentUser) {
        router.push('/login');
        return;
      }

      // Add your payment logic here
      // For example:
      // await initiatePayment(currentUser.id);
      
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
          user={user as ExtendedUser}
          isLoading={loading}
          onPaymentClick={handlePaymentClick}
        />
      </main>
    </div>
  );
}
