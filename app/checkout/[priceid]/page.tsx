'use client';

import { CheckoutContents } from '@/components/checkout/checkout-contents';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: Error | null;
}

export default function CheckoutPage() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null
  });

  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) {
          throw error;
        }

        if (!user) {
          router.push('/login');
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
        router.push('/login');
      }
    };

    // Initial auth check
    checkAuth();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        router.push('/login');
      }
    });

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  if (authState.loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (authState.error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500 mb-4">Failed to load checkout</p>
        <button 
          onClick={() => router.push('/login')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Return to Login
        </button>
      </div>
    );
  }

  if (!authState.user) {
    return null; // Router will handle redirect
  }

  return (
    <CheckoutContents 
      userEmail={authState.user.email} 
      userId={authState.user.id} 
    />
  );
}