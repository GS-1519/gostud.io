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

  // Add debug logs
  useEffect(() => {
    console.log('Pricing page mounted');
    console.log('Initial loading state:', loading);
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        console.log('Fetching user...');
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        console.log('User data:', user);
        setUser(user);
      } catch (err) {
        console.error('Auth error:', err);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [supabase]);

  if (loading) {
    console.log('Showing loading state');
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  console.log('Rendering pricing component');
  return (
    <ErrorBoundary>
      <div className="flex flex-col min-h-screen bg-[#F4F7FA]">
        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Pricing 
              user={user}
              isLoading={loading}
              showTitle={true}
            />
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}
