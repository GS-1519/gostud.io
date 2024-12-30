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
        setAuthState(prev => ({ ...prev, loading: true }));
        
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error) {
          throw error;
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
        router.push('/login');
      }
    };

    // Initial auth check
    checkAuth();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        setAuthState({
          user: null,
          loading: false,
          error: null
        });
        router.push('/login');
      } else if (event === 'SIGNED_IN' && session?.user) {
        setAuthState({
          user: session.user,
          loading: false,
          error: null
        });
      }
    });

    // Cleanup subscription
    return () => subscription.unsubscribe();
  }, [supabase, router]);

  const handlePaymentClick = async () => {
    try {
      if (!authState.user) {
        router.push('/login');
        return;
      }

      // Verify auth state before proceeding
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        throw new Error('Authentication required');
      }

      // Proceed with payment logic here
      // You can safely use authState.user or user here
      
    } catch (error) {
      console.error('Payment error:', error);
      if (error instanceof Error && error.message === 'Authentication required') {
        router.push('/login');
      }
      // Handle other payment errors appropriately
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
          onClick={() => router.push('/login')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Return to Login
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main>
        <Pricing 
          onPaymentClick={handlePaymentClick}
          user={authState.user}  // Optional: Pass user data if needed in Pricing
        />
      </main>
    </div>
  );
}