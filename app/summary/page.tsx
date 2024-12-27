'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import { redirect } from "next/navigation";
import { cn } from '@/lib/utils';

// Define the PricingTier interface
interface PricingTier {
  name: string;
  price: string;
  originalPrice: string;
  features: string[];
  buttonText: string;
  highlight?: boolean;
  popularTag?: string;
  bestValueTag?: string;
}

// Define the ModelData interface
interface ModelData {
  modelInfo: {
    name: string;
    type: string;
  };
  selectedPack: {
    id: string;
    title: string;
    cover_url: string;
    slug: string;
  };
  imageUrls: string[];
  paymentInfo: {
    orderId: string;
    captureId: string;
    status: string;
    selectedTier: PricingTier;
  };
}

// Add this type for the feature icon
interface Feature {
  text: string;
}

// Add PricingCardDetails interface
interface PricingCardDetails {
  name: string;
  price: number;
  originalPrice?: number;
  features: Feature[];  // Simplified features without icon
  badge?: string;
  priceId: {
    [key: string]: string;
  };
}

const SummaryPage: React.FC = () => {
  const [modelData, setModelData] = useState<ModelData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCard, setSelectedCard] = useState<PricingCardDetails | null>(null);
  const router = useRouter();

  // Combine both useEffects and handle errors properly
  useEffect(() => {
    const loadData = () => {
      try {
        // Load model data
        const storedTrainData = localStorage.getItem('trainModelData');
        const storedPackData = localStorage.getItem('selectedPack');
        const storedCard = localStorage.getItem('selectedPricingCard');
        
        if (storedTrainData && storedPackData) {
          const trainData = JSON.parse(storedTrainData);
          const packData = JSON.parse(storedPackData);
          
          setModelData({
            ...trainData,
            selectedPack: packData
          });
        }

        // Load card data
        if (storedCard) {
          setSelectedCard(JSON.parse(storedCard));
        }
      } catch (error) {
        console.error('Error loading stored data:', error);
        toast.error('Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSubmit = async () => {
    if (!modelData || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/astria/train-model", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(modelData),
      });

      if (!response.ok) throw new Error('Failed to submit model data');

      const result = await response.json();
      
      // Clear localStorage
      localStorage.removeItem('trainModelData');
      localStorage.removeItem('modelInfo');
      localStorage.removeItem('selectedPack');
      localStorage.removeItem('paymentInfo');

      toast.success('Model data submitted successfully');
      router.refresh();
      router.push('/overview');
    } catch (error) {
      console.error('Error submitting model data:', error);
      toast.error('Failed to submit model data');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCheckmark = () => (
    <span className="mr-2 text-green-500">✓</span>
  );

  const getGenderDisplay = (gender: string | undefined) => {
    if (!gender || gender === 'Not specified') {
      return 'Not specified';
    }
    return gender.charAt(0).toUpperCase() + gender.slice(1);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!modelData) {
    return (
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">No Model Data</h1>
        <p className="mb-4">No model data was found. Please go back and create a model first.</p>
        <button 
          onClick={() => router.push('/overview')} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Generate Headshots
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 font-poppins">
      <div className="max-w-[1274px] mx-auto bg-white rounded-[40px] shadow-lg overflow-hidden p-6 sm:p-12">
        <h1 className="text-3xl font-bold mb-4 text-center">Payment Success. Confirm Photoshoot details</h1>
        {/* <p className="text-gray-600 text-center mb-8">
          Save hundreds compared to a photo shoot. Customize your AI professional
          headshot with manual edits or get a redo if the initial uploads were wrong.
        </p> */}
        
        {/* {(
        <div className="bg-white shadow-md rounded-[40px] p-6 mb-8">
          <h2 className="text-indigo-600 font-semibold mb-4">{modelData.paymentInfo.selectedTier.name} PACK</h2>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="mb-4 sm:mb-0">
              <span className="text-4xl font-bold text-indigo-600">${modelData.paymentInfo.selectedTier.price}</span>
              <span className="text-xl text-gray-400 line-through ml-2">{modelData.paymentInfo.selectedTier.originalPrice}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 sm:gap-x-8">
              {modelData.paymentInfo.selectedTier.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  {getCheckmark()}
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
         )}
         */}
        <div className="flex justify-between mb-8">
          <div className="w-1/2 pr-4">
            <h2 className="text-indigo-600 font-semibold mb-2">NAME</h2>
            <div className="bg-gray-100 rounded-lg p-3 border border-gray-300">
              <p className="text-lg font-jakarta">{modelData.modelInfo.name}</p>
            </div>
          </div>
          <div className="w-1/2 pl-4">
            <h2 className="text-indigo-600 font-semibold mb-2">TYPE</h2>
            <div className="flex items-center">
              <div className="bg-gray-100 rounded-lg p-3 border border-gray-300 mr-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-lg font-jakarta">{getGenderDisplay(modelData.modelInfo.type)}</p>
            </div>
          </div>
        </div>
        
        <h2 className="text-indigo-600 font-semibold mb-4">UPLOADED PHOTOS</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
          {modelData.imageUrls.slice(0, 10).map((url, index) => (
            <div key={index} className="relative w-full pt-[100%] rounded-lg overflow-hidden">
              <Image 
                src={url} 
                alt={`Sample ${index + 1}`} 
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
        
        {/* Pack Selection Section */}
        <div className="mb-8">
          <h2 className="text-indigo-600 font-semibold mb-4">SELECTED PACK</h2>
          <div className="bg-black rounded-md overflow-hidden w-full max-w-sm">
            <img
              src={modelData.selectedPack?.cover_url ?? "https://www.astria.ai/assets/logo-b4e21f646fb5879eb91113a70eae015a7413de8920960799acb72c60ad4eaa99.png"}
              alt={modelData.selectedPack?.title}
              className="w-full h-48 object-cover"
            />
            <div className="text-white w-full p-3 text-md font-bold text-center capitalize leading-tight">
              {modelData.selectedPack?.title}
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className={`px-8 py-3 rounded-full text-white font-bold text-lg focus:outline-none focus:shadow-outline font-jakarta transition-all duration-300 ${
              isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
            }`}
            style={{
              background: isSubmitting 
                ? 'linear-gradient(90deg, #01C7E4 0%, #A077FE 50%, #8371FF 100%)' 
                : 'linear-gradient(90deg, #8371FF -39.48%, #A077FE 32.07%, #01C7E4 100%)',
              backgroundSize: isSubmitting ? '200% 100%' : '100% 100%',
              animation: isSubmitting ? 'gradient 2s linear infinite' : 'none',
            }}
          >
            {isSubmitting ? 'Processing...' : 'Start Training'}
          </button>
        </div>
      </div>
      
      {selectedCard && (
        <div 
          className={cn(
            'w-[394px] min-h-[549px] rounded-[12px] p-[42px]',
            'flex flex-col gap-8',
            'bg-white',
            'shadow-[0_var(--sds-size-depth-400)_var(--sds-size-depth-800)_var(--sds-size-depth-negative-100)_var(--sds-color-black-200)]'
          )}
        >
          {/* Badge */}
          {selectedCard.badge && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              {selectedCard.name === 'STANDARD' ? (
                <div className="gradient-border px-4 py-1.5">
                  <span className="text-sm font-medium" style={{
                    background: 'linear-gradient(90deg, #8371FF -39.48%, #A077FE 15.54%, #01C7E4 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    82% pick this plan
                  </span>
                </div>
              ) : (
                <div className="px-4 py-1.5 rounded-[20px] bg-transparent border-[1.5px] border-[#5B16FE]">
                  <span className="text-sm font-medium text-[#5B16FE]">
                    Best Value
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Title Section */}
          <div>
            <h3 className="text-[#5B16FE] text-xl font-semibold">
              {selectedCard.name}
            </h3>
          </div>

          {/* Price Section */}
          <div className="mb-8">
            <div className="flex items-baseline gap-1">
              {selectedCard.name === 'STANDARD' ? (
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-[#8371FF]">$</span>
                  <span className="text-5xl font-bold ml-1 text-[#01C7E4]">19</span>
                  <span className="text-gray-400 line-through ml-2 flex items-baseline">
                    <span className="text-[#8371FF]">$</span>
                    <span className="text-[#01C7E4]">45</span>
                  </span>
                </div>
              ) : (
                <>
                  <span className="text-3xl font-bold text-[#161C2D]">$</span>
                  <span className="text-5xl font-bold text-[#161C2D] mr-2">
                    {selectedCard.price}
                  </span>
                  {selectedCard.originalPrice && (
                    <span className="text-[#161C2D] line-through">
                      ${selectedCard.originalPrice}
                    </span>
                  )}
                </>
              )}
            </div>
            <p className="text-gray-500 mt-2">One Time Payment</p>
          </div>

          {/* Features Section */}
          <div className="space-y-4 mb-8">
            {selectedCard.features.map((feature, idx) => (
              <div 
                key={`feature-${idx}`}
                className="flex items-center gap-3"
              >
                <div className={cn(
                  "w-5 h-5",
                  selectedCard.name === 'STANDARD' 
                    ? [
                        "text-[#5B16FE]",
                        "text-[#01C7E4]",
                        "text-[#8371FF]",
                        "text-[#A077FE]"
                      ][idx] || "text-[#5B16FE]"
                    : "text-gray-600"
                )}>
                  ✓
                </div>
                <span className="text-[15px] text-[#64748B]">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-auto">
            <p className="text-xs text-center text-gray-500 mt-4">
              No subscription required
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// Add this CSS animation either in your global CSS or as a style tag in the component
const gradientAnimation = `
  @keyframes gradient {
    0% { background-position: 100% 0%; }
    100% { background-position: -100% 0%; }
  }
`;

export default SummaryPage;