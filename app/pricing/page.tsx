'use client';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Pricing } from '@/components/home/pricing/pricing';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';

export default function PricingPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        setUser(user);
      } catch (err) {
        console.error('Auth error:', err);
        setError(err instanceof Error ? err.message : 'Authentication error');
      } finally {
        setLoading(false);
      }
    };

    getUser();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handlePaymentClick = async () => {
    try {
      if (!user) {
        router.push('/login');
        return;
      }
      
      // Add your payment logic here
      router.push('/get-credits');
    } catch (error) {
      console.error('Payment error:', error);
      setError('Payment process failed. Please try again.');
    }
  };

  // Add console logs for debugging
  useEffect(() => {
    console.log('Current user:', user);
    console.log('Loading state:', loading);
    console.log('Error state:', error);
  }, [user, loading, error]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="flex flex-col min-h-screen bg-[#F4F7FA]">
        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Pricing 
              user={user}
              isLoading={loading}
              onPaymentClick={handlePaymentClick}
              showTitle={true}
            />
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}
