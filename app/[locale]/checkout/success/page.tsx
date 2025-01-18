'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function SuccessPage() {
  const [credits, setCredits] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    let pollInterval: NodeJS.Timeout;
    
    const checkCredits = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          toast.error('User not found');
          router.push('/login');
          return;
        }

        // Get initial credits
        const { data: initialData } = await supabase
          .from('credits')
          .select('credits')
          .eq('user_id', user.id)
          .single();

        const initialCredits = initialData?.credits || 0;
        setCredits(initialCredits);

        // Start polling for updates
        let attempts = 0;
        pollInterval = setInterval(async () => {
          const { data: newData } = await supabase
            .from('credits')
            .select('credits')
            .eq('user_id', user.id)
            .single();

          const newCredits = newData?.credits || 0;
          
          if (newCredits > initialCredits) {
            setCredits(newCredits);
            setLoading(false);
            clearInterval(pollInterval);
            toast.success('Credits updated successfully!');
          }

          attempts++;
          if (attempts >= 15) { // Stop after 30 seconds
            clearInterval(pollInterval);
            setLoading(false);
            if (newCredits === initialCredits) {
              toast.error('Credit update taking longer than expected');
            }
          }
        }, 2000);
      } catch (error) {
        console.error('Error checking credits:', error);
        setLoading(false);
        toast.error('Failed to check credits');
      }
    };

    checkCredits();

    return () => {
      if (pollInterval) clearInterval(pollInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#22C55E] mb-4">
          Payment Successful!
        </h1>
        <p className="text-xl text-[#64748B] mb-8">
          {loading ? 'Updating your credits...' : 'Your credits have been updated.'}
        </p>
        <div className="mb-8">
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 bg-[#5B16FE] rounded-full animate-bounce" />
              <div className="w-4 h-4 bg-[#5B16FE] rounded-full animate-bounce [animation-delay:-.3s]" />
              <div className="w-4 h-4 bg-[#5B16FE] rounded-full animate-bounce [animation-delay:-.5s]" />
            </div>
          ) : (
            <p className="text-2xl font-semibold text-[#1E293B]">
              Current Credits: {credits}
            </p>
          )}
        </div>
        <button
          onClick={() => router.push('/dashboard')}
          className="px-6 py-3 bg-[#5B16FE] text-white rounded-lg hover:bg-[#4B0FD9] transition-colors"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
