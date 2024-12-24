'use client'

import { useState, useEffect } from 'react';
import { useSearchParams, useParams, useRouter } from 'next/navigation';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from '@supabase/auth-helpers-nextjs';

import ModelTypeSelector from "@/components/ModelTypeSelector";
import TrainModelZone from "@/components/TrainModelZone";
import InstructionsPage from '@/components/Instructions';
import PricingComponent from '@/components/PricingSection';

interface ExtendedUser extends User {
  credits?: number;
}

export default function TrainModelPage() {
  const [currentStep, setCurrentStep] = useState<string>('');
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  const supabase = createClientComponentClient();
  const pack = params?.pack as string;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        setUser(user as ExtendedUser);
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      }
    };
    fetchUser();
  }, [supabase]);

  useEffect(() => {
    // Set initial step from URL
    const step = searchParams?.get('step');
    if (step) {
      setCurrentStep(step);
    }
  }, [searchParams]);

  const handleContinue = (nextStep: string) => {
    router.push(`/overview/models/train/${pack}?step=${nextStep}`);
    setCurrentStep(nextStep);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'img-upload':
        return <TrainModelZone 
          packSlug={pack} 
          onContinue={() => handleContinue('get-credits')} 
        />;
      case 'model-type':
        return <ModelTypeSelector 
          onContinue={() => handleContinue('img-upload')} 
        />;
      case 'get-credits':
        return (
          <PricingComponent 
            user={user}
            onSuccess={() => handleContinue('summary')}
          />
        );
      case 'summary':
        return <div>Summary Page</div>;
      default:
        return (
          <InstructionsPage 
            onContinue={() => handleContinue('img-upload')}
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
