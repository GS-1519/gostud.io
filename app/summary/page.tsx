'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import { redirect } from "next/navigation";
import { cn } from '@/lib/utils';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Initialize Supabase client
const supabase = createClientComponentClient();

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
    eye_color: string;
    hair_color: string;
    ethnicity: string;
    age?: string;
  };
  selectedPack: {
    id: string;
    title: string;
    cover_url: string;
    slug: string;
  };
  imageUrls: string[];
  paymentInfo?: {
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

// Update the interfaces to only include the fields we want
interface ModelInfo {
  age: string;      // Changed from name to age
  type: string;     // for gender
  eye_color: string;
  hair_color: string;
  ethnicity: string;
}

interface EditableFields {
  eye_color: boolean;
  hair_color: boolean;
  ethnicity: boolean;
}

interface EditedValues {
  eye_color: string;
  hair_color: string;
  ethnicity: string;
}

// Add ModelDetails component
const ModelDetails: React.FC<ModelDetailsProps> = ({ 
  modelData, 
  editMode, 
  editedValues, 
  handleEdit, 
  handleSave,
  setEditedValues 
}) => {
  return (
    <div className="mb-8">
      <div className="bg-[#F3F0FF] rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
        <span className="text-[#5B16FE]">✓</span>
        <span className="ml-2 text-[#5B16FE] text-sm sm:text-base">
          These are the features Aaria has detected. You can also edit if necessary.
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        {/* Left Column */}
        <div className="col-span-1 sm:col-span-5">
          {/* Age Field - Read Only (replacing Name field) */}
          <div className="mb-6">
            <h2 className="text-[#5B16FE] font-semibold mb-2">AGE</h2>
            <div className="w-full h-[46px] bg-white rounded-lg border border-gray-200 p-3">
              <p>{modelData?.modelInfo.age || 'Not specified'}</p>
            </div>
          </div>

          {/* Eye Color Field */}
          <div className="mb-6">
            <h2 className="text-[#5B16FE] font-semibold mb-2">EYE COLOR</h2>
            <div className="w-full h-[46px] bg-white rounded-lg border border-gray-200 p-3 flex justify-between items-center">
              {editMode.eye_color ? (
                <>
                  <input
                    type="text"
                    value={editedValues.eye_color}
                    onChange={(e) => setEditedValues(prev => ({ ...prev, eye_color: e.target.value }))}
                    className="flex-1 outline-none"
                    placeholder="Enter eye color"
                  />
                  <button onClick={() => handleSave('eye_color')} className="text-[#5B16FE] ml-2">
                    Save
                  </button>
                </>
              ) : (
                <>
                  <p>{modelData?.modelInfo.eye_color}</p>
                  <button onClick={() => handleEdit('eye_color')} className="text-[#5B16FE]">
                    ✏️
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Hair Color Field */}
          <div className="mb-6">
            <h2 className="text-[#5B16FE] font-semibold mb-2">HAIR COLOR</h2>
            <div className="w-full h-[46px] bg-white rounded-lg border border-gray-200 p-3 flex justify-between items-center">
              {editMode.hair_color ? (
                <>
                  <input
                    type="text"
                    value={editedValues.hair_color}
                    onChange={(e) => setEditedValues(prev => ({ ...prev, hair_color: e.target.value }))}
                    className="flex-1 outline-none"
                    placeholder="Enter hair color"
                  />
                  <button onClick={() => handleSave('hair_color')} className="text-[#5B16FE] ml-2">
                    Save
                  </button>
                </>
              ) : (
                <>
                  <p>{modelData?.modelInfo.hair_color || 'Not specified'}</p>
                  <button onClick={() => handleEdit('hair_color')} className="text-[#5B16FE]">
                    ✏️
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Middle Column */}
        <div className="col-span-1 sm:col-span-5">
          {/* Gender Field */}
          <div className="mb-6">
            <h2 className="text-[#5B16FE] font-semibold mb-2">GENDER</h2>
            <div className="flex items-center gap-2">
              <div className="w-[46px] h-[46px] flex items-center justify-center bg-white rounded-lg border border-[#5B16FE]">
                <svg className="w-5 h-5 text-[#5B16FE]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1 h-[46px] bg-white rounded-lg border border-gray-200 p-3">
                <p>{modelData?.modelInfo.type === 'person' ? 'Male' : modelData?.modelInfo.type}</p>
              </div>
            </div>
          </div>

          {/* Ethnicity Field */}
          <div className="mb-6">
            <h2 className="text-[#5B16FE] font-semibold mb-2">ETHNICITY</h2>
            <div className="w-full h-[46px] bg-white rounded-lg border border-gray-200 p-3 flex justify-between items-center">
              {editMode.ethnicity ? (
                <>
                  <input
                    type="text"
                    value={editedValues.ethnicity}
                    onChange={(e) => setEditedValues(prev => ({ ...prev, ethnicity: e.target.value }))}
                    className="flex-1 outline-none"
                    placeholder="Enter ethnicity"
                  />
                  <button onClick={() => handleSave('ethnicity')} className="text-[#5B16FE] ml-2">
                    Save
                  </button>
                </>
              ) : (
                <>
                  <p>{modelData?.modelInfo.ethnicity}</p>
                  <button onClick={() => handleEdit('ethnicity')} className="text-[#5B16FE]">
                    ✏️
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Selected Pack */}
        <div className="col-span-1 sm:col-span-2">
          <h2 className="text-[#5B16FE] font-semibold mb-2">SELECTED PACK</h2>
          {modelData?.selectedPack && (
            <div className="w-full rounded-lg overflow-hidden bg-black">
              <div className="relative w-full pt-[133%]">
                <Image
                  src={modelData.selectedPack.cover_url}
                  alt={modelData.selectedPack.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="p-2 text-white text-center">
                <p className="font-semibold text-sm">{modelData.selectedPack.title}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Add missing interfaces
interface ModelDetailsProps {
  modelData: ModelData | null;
  editMode: EditableFields;
  editedValues: EditedValues;
  handleEdit: (field: keyof EditableFields) => void;
  handleSave: (field: keyof EditableFields) => void;
  setEditedValues: React.Dispatch<React.SetStateAction<EditedValues>>;
}

interface AuthState {
  user: {
    id: string;
    email?: string;
    [key: string]: any;
  } | null;
  loading: boolean;
  error: Error | null;
}

const SummaryPage: React.FC = () => {
  const [modelData, setModelData] = useState<ModelData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCard, setSelectedCard] = useState<PricingCardDetails | null>(null);
  const router = useRouter();

  // Add new state variables
  const [editMode, setEditMode] = useState<EditableFields>({
    eye_color: false,
    hair_color: false,
    ethnicity: false
  });
  const [editedValues, setEditedValues] = useState({
    eye_color: '',
    hair_color: '',
    ethnicity: ''
  });
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null
  });

  // Add authentication check
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError) throw authError;
        
        setAuthState({ 
          user, 
          loading: false, 
          error: null 
        });

        if (!user) {
          router.push('/login');
          return;
        }
      } catch (error) {
        console.error('Auth error:', error);
        setAuthState({ 
          user: null, 
          loading: false, 
          error: error as Error 
        });
      }
    };

    checkAuth();
  }, [router]);

  // Add handlers for edit functionality
  const handleEdit = (field: keyof EditableFields) => {
    setEditMode(prev => ({ ...prev, [field]: true }));
    setEditedValues(prev => ({
      ...prev,
      [field]: modelData?.modelInfo[field] || ''
    }));
  };

  const handleSave = async (field: keyof EditableFields) => {
    if (!modelData) return;
    
    try {
      setModelData(prev => {
        if (!prev) return null;
        return {
          ...prev,
          modelInfo: {
            ...prev.modelInfo,
            [field]: editedValues[field]
          }
        };
      });
      
      setEditMode(prev => ({ ...prev, [field]: false }));
      toast.success(`${field} updated successfully`);
    } catch (error) {
      console.error('Error saving:', error);
      toast.error(`Failed to update ${field}`);
    }
  };

  // Combine both useEffects and handle errors properly
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        // Load all required data from localStorage
        const storedTrainData = localStorage.getItem('trainModelData');
        const storedPackData = localStorage.getItem('selectedPack');
        const storedCard = localStorage.getItem('selectedPricingCard');
        
        console.log('Stored Data:', { storedTrainData, storedPackData, storedCard }); // Debug log

        if (!storedTrainData) {
          console.log('No train data found'); // Debug log
          router.push('/overview');
          return;
        }

        const trainData = JSON.parse(storedTrainData);
        const packData = storedPackData ? JSON.parse(storedPackData) : null;

        // Set model data with proper structure
        const modelDataToSet = {
          modelInfo: {
            name: trainData.modelInfo?.name || 'Unnamed',
            type: trainData.modelInfo?.type || 'Not specified',
            eye_color: trainData.modelInfo?.eye_color || '',
            hair_color: trainData.modelInfo?.hair_color || '',
            ethnicity: trainData.modelInfo?.ethnicity || '',
          },
          imageUrls: trainData.imageUrls || [],
          selectedPack: packData || {
            id: '',
            title: '',
            cover_url: '',
            slug: ''
          }
        };

        console.log('Setting Model Data:', modelDataToSet); // Debug log
        setModelData(modelDataToSet);

        // Set pricing card if it exists
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
  }, [router]);

  useEffect(() => {
    if (modelData?.modelInfo) {
      // Set the name from modelInfo, remove 'Untitled' if present
      const name = modelData.modelInfo.name === 'Untitled' ? '' : modelData.modelInfo.name;
      
      // Set gender/type based on the name from payload
      const type = modelData.modelInfo.name?.toLowerCase().includes('woman') ? 'Female' : 'Male';

      // Update modelData with the correct name and type
      setModelData(prev => {
        if (!prev) return null;
        return {
          ...prev,
          modelInfo: {
            ...prev.modelInfo,
            name,
            type
          }
        };
      });

      // Set initial edited values
      setEditedValues({
        eye_color: modelData.modelInfo.eye_color || '',
        hair_color: modelData.modelInfo.hair_color || '',
        ethnicity: modelData.modelInfo.ethnicity || ''
      });
    }
  }, [modelData?.modelInfo]);

  const handleSubmit = async () => {
    if (!modelData || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/astria/train-model", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          modelInfo: {
            ...modelData.modelInfo,
            name: modelData.modelInfo.name || 'Unnamed',
            type: modelData.modelInfo.type || 'Male',
          },
          imageUrls: modelData.imageUrls,
          selectedPack: modelData.selectedPack
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit model data');
      }

      // Wait for the response to be fully processed
      await response.json();

      // Clear localStorage first
      ['trainModelData', 'selectedPack', 'selectedPricingCard', 'paymentInfo', 'modelInfo']
        .forEach(key => localStorage.removeItem(key));

      toast.success('Model data submitted successfully');
      
      window.location.href = '/overview';

    } catch (error: any) {
      console.error('Error submitting model data:', error);
      toast.error(error.message || 'Failed to submit model data');
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

  if (!modelData?.imageUrls?.length) {
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
    <div className="min-h-screen bg-gray-100 p-3 sm:p-8 font-poppins">
      <div className="max-w-[1274px] mx-auto rounded-[20px] sm:rounded-[40px] bg-white shadow-lg overflow-hidden p-4 sm:p-12">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8 text-center">Order Summary</h1>
        
        <p className="mx-auto w-full sm:w-[812px] text-sm sm:text-base h-auto sm:h-[60px] mb-6 sm:mb-12 opacity-70 text-center font-poppins font-500 leading-[24px] sm:leading-[30px] mt-4">
          Save hundreds compared to a photo shoot. Customize your AI professional headshot with manual edits or get a redo if the initial uploads were wrong.
        </p>

        {/* Pricing Card */}
        {selectedCard && (
          <div className="relative w-full mb-6 sm:mb-8">
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

            <div className="w-full max-w-[1116px] mx-auto h-auto sm:h-[190px] rounded-[16px] sm:rounded-[24px] p-4 sm:p-[42px] bg-[#FBFBFB]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-[48px]">
                {/* Price Section */}
                <div>
                  <h3 className="text-[#5B16FE] text-xl font-bold mb-2">
                    {selectedCard.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[#5B16FE] text-3xl font-bold">$</span>
                    <span className="text-[#01C7E4] text-5xl font-bold">
                      {selectedCard.price}
                    </span>
                    {selectedCard.originalPrice && (
                      <span className="text-gray-400 line-through ml-2">
                        ${selectedCard.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="flex-1">
                  <div className="grid grid-cols-2 gap-4">
                    {selectedCard.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className={cn(
                          "text-lg",
                          [
                            "text-[#5B16FE]",
                            "text-[#01C7E4]",
                            "text-[#8371FF]",
                            "text-[#A077FE]"
                          ][index % 4]
                        )}>✓</span>
                        <span className="text-gray-600">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Train Button */}
                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-3 rounded-full text-white font-semibold transition-all duration-200 hover:opacity-90 disabled:opacity-50"
                  style={{
                    background: 'linear-gradient(90deg, #8371FF -39.48%, #A077FE 32.07%, #01C7E4 100%)'
                  }}
                >
                  {isSubmitting ? 'Processing...' : 'Start Training'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Model Details Grid */}
        <ModelDetails 
          modelData={modelData}
          editMode={editMode}
          editedValues={editedValues}
          handleEdit={handleEdit}
          handleSave={handleSave}
          setEditedValues={setEditedValues}
        />

        {/* Uploaded Photos Grid */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-[#5B16FE] font-semibold mb-3 sm:mb-4">UPLOADED PHOTOS</h2>
          <div className="grid grid-cols-3 sm:grid-cols-8 gap-2 sm:gap-4">
            {modelData?.imageUrls?.map((url, index) => (
              <div key={index} className="relative w-full pt-[100%] rounded-lg overflow-hidden">
                <Image
                  src={url}
                  alt={`Upload ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="hover:scale-105 transition-transform duration-200"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6 sm:mt-8">
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={cn(
              "w-full sm:w-auto px-6 sm:px-8 py-3 rounded-full text-white font-semibold",
              "transition-all duration-200 hover:opacity-90 disabled:opacity-50",
              "bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4]"
            )}
          >
            {isSubmitting ? 'Processing...' : 'Start Training'}
          </button>
        </div>
      </div>
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