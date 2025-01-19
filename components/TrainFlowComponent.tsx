'use client'
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ModelTypeSelector } from '@/components/ModelTypeSelector';
import TrainModelZone from '@/components/TrainModelZone';
import GetCreditsPage from '@/app/[locale]/get-credits/page';

interface TrainModelSectionProps {
  packSlug: string;
  onContinue: () => void;
  user: any;
}

const TrainModelSection: React.FC<TrainModelSectionProps> = ({ packSlug, onContinue, user }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<string>('img-upload');
  const [hasEnoughCredits, setHasEnoughCredits] = useState<boolean>(true);

  useEffect(() => {
    const step = searchParams?.get('step') ?? 'img-upload';
    console.log('Current URL step parameter:', step);
    setCurrentStep(step);

    // Check credits when component mounts
    checkCredits();
  }, [searchParams]);

  const checkCredits = async () => {
    try {
      const response = await fetch('/astria/train-model', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          checkCredits: true,
        }),
      });
      setHasEnoughCredits(response.ok);
      
      if (response.status === 402) {
        navigateToNextStep('get-credits');
      }
    } catch (error) {
      console.error('Error checking credits:', error);
    }
  };

  const navigateToNextStep = (nextStep: string) => {
    console.log('Navigating to next step:', nextStep);
    const currentPath = window.location.pathname;
    router.push(`${currentPath}?step=${nextStep}`);
  };

  console.log('Rendering component for step:', currentStep);

  if (currentStep === 'img-upload') {
    return (
      <TrainModelZone 
        packSlug={packSlug}
        user={user}
        onContinue={async () => {
          await checkCredits();
          if (hasEnoughCredits) {
            console.log('Proceeding with model training');
            onContinue();
          } else {
            navigateToNextStep('get-credits');
          }
        }} 
      />
    );
  }

  if (currentStep === 'get-credits') {
    return <GetCreditsPage />;
  }

  // If no step or unknown step, show ModelTypeSelector
  return <ModelTypeSelector onContinue={() => {
    navigateToNextStep('img-upload');
    onContinue();
  }} />;
};

export default TrainModelSection;
