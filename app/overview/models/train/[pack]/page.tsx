'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import ModelTypeSelector from "@/components/ModelTypeSelector";
import TrainModelZone from "@/components/TrainModelZone";
import InstructionsPage from '@/components/Instructions';

export default function TrainModelPage() {
  const [currentStep, setCurrentStep] = useState('');
  const searchParams = useSearchParams();
  const params = useParams();
  const pack = params?.pack as string;

  const getStep = useCallback(() => {
    const step = searchParams?.get('step');
    return step || '';
  }, [searchParams]);

  useEffect(() => {
    const step = getStep();
    console.log('Current step:', step);
    setCurrentStep(step);
  }, [getStep]);

  const handleContinue = () => {
    setCurrentStep('img-upload');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'img-upload':
        return <TrainModelZone packSlug={pack} onContinue={handleContinue} />;
      case 'model-type':
        return <ModelTypeSelector onContinue={handleContinue} />;
      default:
        return <InstructionsPage />;
    }
  };

  return (
    <div className="container mx-auto px-4">
      {renderStep()}
    </div>
  );
}
