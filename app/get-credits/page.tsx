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

export default function GetCreditsPage() {
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
        console.log('Checking auth...'); // Debug log
        setAuthState(prev => ({ ...prev, loading: true }));
        
        const { data: { user }, error } = await supabase.auth.getUser();
        console.log('Auth response:', { user, error }); // Debug log

        if (error) {
          throw error;
        }

        if (!user) {
          router.push('/login?returnTo=/get-credits');
          return;
        }

        setAuthState({
          user,
          loading: false,
          error: null
        });
      } catch (error) {
        console.error('Auth error:', error);
        setAuthState({
          user: null,
          loading: false,
          error: error instanceof Error ? error : new Error('Authentication failed')
        });
        router.push('/login?returnTo=/get-credits');
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event); // Debug log
      if (event === 'SIGNED_OUT') {
        setAuthState({
          user: null,
          loading: false,
          error: null
        });
        router.push('/login?returnTo=/get-credits');
      } else if (event === 'SIGNED_IN' && session?.user) {
        setAuthState({
          user: session.user,
          loading: false,
          error: null
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, router]);

  const handlePaymentClick = async () => {
    try {
      if (!authState.user) {
        router.push('/login?returnTo=/get-credits');
        return;
      }

      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        throw new Error('Authentication required');
      }

      // Add your payment logic here
      console.log('Processing payment for user:', user.id);
      
    } catch (error) {
      console.error('Payment error:', error);
      if (error instanceof Error && error.message === 'Authentication required') {
        router.push('/login?returnTo=/get-credits');
      }
    }
  };

  if (authState.loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (authState.error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500 mb-4">Failed to load payment page</p>
        <button 
          onClick={() => router.push('/login?returnTo=/get-credits')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Return to Login
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F7FA]">
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-8 text-center">Get Credits</h1>
          <Pricing 
            onPaymentClick={handlePaymentClick}
            user={authState.user}
            isLoading={authState.loading}
            showTitle={false}
          />
        </div>
      </main>
    </div>
  );
}