'use client';

import { Pricing } from '@/components/home/pricing/pricing';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: Error | null;
}

export default function PricingPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) {
          setAuthState({
            user: null,
            loading: false,
            error
          });
          return;
        }

        setAuthState({
          user,
          loading: false,
          error: null
        });
      } catch (error) {
        setAuthState({
          user: null,
          loading: false,
          error: error instanceof Error ? error : new Error('Auth check failed')
        });
      }
    };

    checkAuth();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        setAuthState({
          user: null,
          loading: false,
          error: null
        });
      } else if (event === 'SIGNED_IN' && session?.user) {
        setAuthState({
          user: session.user,
          loading: false,
          error: null
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handlePaymentClick = async () => {
    try {
      // Verify authentication before proceeding
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        router.push('/login');
        return;
      }

      // Add your payment logic here
      // For example:
      // await initiatePayment(user.id);
      
    } catch (error) {
      console.error('Payment error:', error);
      router.push('/login');
    }
  };

  if (authState.loading) {
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
          user={authState.user}
          isLoading={authState.loading}
        />
      </main>
    </div>
  );
}
// Update your Pricing component props type
interface PricingProps {
  onPaymentClick: () => Promise<void>;
  user: User | null;
  isLoading?: boolean;
}

// You might also want to update the useUserInfo hook to use getUser:
export function useUserInfo(supabase: any) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) {
          throw error;
        }

        setUser(user);
      } catch (error) {
        console.error('Error checking user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event: any, session: any) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  return { user, loading };
}
