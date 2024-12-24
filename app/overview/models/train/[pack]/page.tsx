'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useParams, useRouter } from 'next/navigation';
import ModelTypeSelector from "@/components/ModelTypeSelector";
import TrainModelZone from "@/components/TrainModelZone";
import InstructionsPage from '@/components/Instructions';
import PricingComponent from '@/components/PricingSection';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function TrainModelPage() {
  const [currentStep, setCurrentStep] = useState('');
  const [user, setUser] = useState(null);
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  const supabase = createClientComponentClient();
  const pack = params?.pack as string;

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, [supabase]);

  const getStep = useCallback(() => {
    const step = searchParams?.get('step');
    return step || '';
  }, [searchParams]);

  useEffect(() => {
    const step = getStep();
    console.log('Current step:', step);
    setCurrentStep(step);
  }, [getStep]);

  const handleContinue = (nextStep: string) => {
    // Update URL with new step
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
        return user ? (
          <PricingComponent 
            user={user} 
            onSuccess={() => handleContinue('summary')}
          />
        ) : null;
      case 'summary':
        return <div>Summary Page</div>; // Replace with your Summary component
      default:
        return <InstructionsPage onContinue={() => handleContinue('model-type')} />;
    }
  };

  return (
    <div className="container mx-auto px-4">
      {renderStep()}
    </div>
  );
}
