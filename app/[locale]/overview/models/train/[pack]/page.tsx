'use client'

import { useState, useEffect } from 'react';
import { useSearchParams, useParams, useRouter } from 'next/navigation';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from '@supabase/auth-helpers-nextjs';
import ModelTypeSelector from "@/components/ModelTypeSelector";
import TrainModelZone from "@/components/TrainModelZone";
import InstructionsPage from '@/components/Instructions';
import { Pricing } from '@/components/home/pricing/pricing';
import SummaryPage from '@/app/[locale]/summary/page';  // ✅
interface ExtendedUser extends User {
  credits?: number;
}

interface AuthState {
  user: ExtendedUser | null;
  loading: boolean;
  error: Error | null;
}

export default function TrainModelPage() {
  const [currentStep, setCurrentStep] = useState<string>('');
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null
  });

  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  const supabase = createClientComponentClient();
  const pack = params?.pack as string;
  const locale = params?.locale || 'en';

  const handlePaymentClick = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        router.push(`/${locale}/login`);
        return;
      }

      router.push(`/${locale}/overview/models/train/${pack}?step=summary`);
      setCurrentStep('summary');
    } catch (error) {
      console.error('Payment flow error:', error);
      router.push(`/${locale}/login`);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) {
          throw error;
        }

        setAuthState({
          user: user as ExtendedUser,
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

    checkAuth();

    // Set up auth state listener
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
          user: session.user as ExtendedUser,
          loading: false,
          error: null
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  useEffect(() => {
    const step = searchParams?.get('step');
    if (step) {
      setCurrentStep(step);
    }
  }, [searchParams]);

  const handleContinue = (nextStep: string) => {
    router.push(`/${locale}/overview/models/train/${pack}?step=${nextStep}`);
    setCurrentStep(nextStep);
  };

  if (authState.loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (authState.error || !authState.user) {
    return (
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <p className="text-red-500 mb-4">Please log in to continue</p>
          <button
            onClick={() => router.push(`/${locale}/login`)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 'img-upload':
        return (
          <TrainModelZone
            packSlug={pack}
            onContinue={() => handleContinue('get-credits')}
            user={authState.user}
          />
        );
      case 'model-type':
        return (
          <ModelTypeSelector
            onContinue={() => handleContinue('img-upload')}
            // user={authState.user}
          />
        );
      case 'get-credits':
        return (
          <div className="container mx-auto px-4">
            <Pricing
              onPaymentClick={handlePaymentClick}
              user={authState.user}
            />
          </div>
        );
      case 'summary':
        return <SummaryPage />;
      default:
        return (
          <InstructionsPage 
            onContinue={() => handleContinue('img-upload')}
            user={authState.user}
          />
        );
    }
  };

  return (
    <div className="container mx-auto px-4">
      {renderStep()}
    </div>
  );
}