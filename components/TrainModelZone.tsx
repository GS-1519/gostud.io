import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Upload, Trash2, Check, AlertCircle, Plus, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";

interface TrainModelZoneProps {
  packSlug: string;
  onContinue: () => void;
  user?: any;
}

interface ImageInspectionResult {
  name: "man" | "woman" | "boy" | "girl" | "baby" | "cat" | "dog" | "NONE";
  ethnicity?: "caucasian" | "black" | "hispanic" | "korean" | "japanese" | "chinese" | "philippine";
  age?: "20 yo" | "30 yo" | "40 yo" | "50 yo" | "60 yo" | "70 yo";
  glasses?: "glasses" | "NONE";
  eye_color?: "blue eyes" | "brown eyes" | "green eyes" | "gray eyes" | "black eyes" | "NONE";
  hair_color?: "blonde" | "brunette" | "red hair" | "black hair" | "NONE";
  hair_length?: "short hair" | "medium hair" | "long hair" | "NONE";
  hair_style?: "dreadlocks" | "bald" | "cornrows" | "straight hair" | "curly hair" | "wavy hair" | "NONE";
  facial_hair?: "mustache" | "beard" | "goatee" | "NONE";
  is_bald?: "bald" | "NONE";
  funny_face: boolean;
  wearing_sunglasses: boolean;
  wearing_hat: boolean;
  blurry: boolean;
  includes_multiple_people: boolean;
  full_body_image_or_longshot: boolean;
  selfie: boolean;
}

interface ProcessedImage {
  file: File;
  preview: string;
  isCropped?: boolean;
  inspectionData?: ImageInspectionResult;
  isProcessing?: boolean;
  needsCropping?: boolean;
}

interface BadImage {
  file: File;
  preview: string;
  reason: string;
}

const TrainModelZone: React.FC<TrainModelZoneProps> = ({ packSlug, onContinue, user }) => {
  const [files, setFiles] = useState<ProcessedImage[]>([]);
  const [badFiles, setBadFiles] = useState<BadImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [longShotCount, setLongShotCount] = useState(0);
  const [selfieCount, setSelfieCount] = useState(0);
  const [modelInfo, setModelInfo] = useState<any>(null);
  const { toast } = useToast();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    const storedModelInfo = localStorage.getItem('modelInfo');
    if (storedModelInfo) {
      setModelInfo(JSON.parse(storedModelInfo));
    }
  }, []);

  useEffect(() => {
    return () => {
      files.forEach(file => {
        if (file.preview) URL.revokeObjectURL(file.preview);
      });
      badFiles.forEach(file => {
        if (file.preview) URL.revokeObjectURL(file.preview);
      });
    };
  }, [files, badFiles]);

  const getImageIssue = (data: ImageInspectionResult): string => {
    if (data.blurry) return "Image is blurry";
    if (data.funny_face) return "Funny face detected";
    if (data.wearing_sunglasses) return "Wearing sunglasses";
    if (data.wearing_hat) return "Wearing hat";
    if (data.includes_multiple_people) return "Multiple people detected";
    if (data.full_body_image_or_longshot && longShotCount >= 1) return "Only one long shot allowed";
    if (data.selfie && selfieCount >= 1) return "Only one selfie allowed";
    return "Invalid image";
  };

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    if (!selectedFiles.length) return;
    
    setIsLoading(true);
    
    try {
      for (const file of selectedFiles) {
        const tempPreview = URL.createObjectURL(file);
        
        const formData = new FormData();
        formData.append('file', file);
        
        // Add existing characteristics if we have any
        if (files.length > 0) {
          const existingCharacteristics = files.map(f => f.inspectionData);
          formData.append('characteristics', JSON.stringify(existingCharacteristics));
        }

        const inspectResponse = await fetch('/api/inspect-image', {
          method: 'POST',
          body: formData
        });

        if (!inspectResponse.ok) {
          throw new Error('Failed to inspect image');
        }

        const responseData = await inspectResponse.json();
        const data = responseData.current || responseData;
        const aggregatedData = responseData.aggregated;

        // Use aggregated data if available
        if (aggregatedData && !modelInfo) {
          setModelInfo(aggregatedData);
          localStorage.setItem('modelInfo', JSON.stringify(aggregatedData));
        }

        if (data.blurry || 
            data.funny_face || 
            data.wearing_sunglasses || 
            data.wearing_hat ||
            data.includes_multiple_people) {
          setBadFiles(prev => [...prev, {
            file,
            preview: tempPreview,
            reason: getImageIssue(data)
          }]);
          continue;
        }

        if (data.full_body_image_or_longshot && longShotCount >= 1) {
          setBadFiles(prev => [...prev, {
            file,
            preview: tempPreview,
            reason: "Only one long shot allowed"
          }]);
          continue;
        }

        if (data.full_body_image_or_longshot) {
          setLongShotCount(prev => prev + 1);
        }

        setFiles(prev => [...prev, {
          file,
          preview: tempPreview,
          isProcessing: false,
          inspectionData: data,
          needsCropping: data.full_body_image_or_longshot
        }]);
      }

      toast({
        title: selectedFiles.length > 1 ? "Upload successful" : "Image uploaded",
        description: selectedFiles.length > 1 ? "Your photos have been processed" : "Your photo has been processed",
        duration: 3000,
      });

    } catch (error) {
      console.error('Error uploading files:', error);
      toast({
        title: "Error",
        description: "Failed to upload images",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
      if (event.target) {
        event.target.value = '';
      }
    }
  }, [modelInfo, longShotCount, toast, files]);

  const handleAutoCrop = async (index: number) => {
    const file = files[index];
    if (!file || !file.needsCropping) return;

    setFiles(prev => prev.map((f, i) => 
      i === index ? { ...f, isProcessing: true } : f
    ));

    try {
      const formData = new FormData();
      formData.append('file', file.file);
      formData.append('imageType', 
        file.inspectionData?.includes_multiple_people ? 'group' : 
        file.inspectionData?.full_body_image_or_longshot ? 'longshot' : 'selfie'
      );

      const response = await fetch('/api/auto-crop', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to crop image: ${response.statusText}`);
      }

      const croppedBlob = await response.blob();
      if (!croppedBlob || croppedBlob.size === 0) {
        throw new Error('Received empty response from server');
      }

      const croppedPreview = URL.createObjectURL(croppedBlob);
      const croppedFile = new File([croppedBlob], file.file.name, {
        type: croppedBlob.type || 'image/jpeg'
      });

      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }

      await new Promise(resolve => setTimeout(resolve, 100));

      setFiles(prev => {
        const newFiles = [...prev];
        newFiles[index] = {
          file: croppedFile,
          preview: croppedPreview,
          isProcessing: false,
          isCropped: true,
          needsCropping: false,
          inspectionData: file.inspectionData
        };
        return newFiles;
      });

      toast({
        title: "Success",
        description: "Image cropped successfully",
        duration: 3000,
      });

    } catch (error) {
      console.error('Error cropping image:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to crop image",
        duration: 5000,
      });
      setFiles(prev => prev.map((f, i) => 
        i === index ? { ...f, isProcessing: false } : f
      ));
    }
  };

  const handleContinue = async () => {
    if (files.length < 4 || !modelInfo) {
      toast({
        title: "Not enough information",
        description: "Please upload at least 4 images and ensure model information is available.",
        duration: 5000,
      });
      return;
    }

    setIsLoading(true);
    try {
      // Upload images and save data first
      const blobUrls: string[] = [];
      const uploadPromises = files.map(async ({ file }) => {
        try {
          const blob = await upload(file.name, file, {
            access: 'public',
            handleUploadUrl: '/astria/train-model/image-upload',
          });
          blobUrls.push(blob.url);
        } catch (error) {
          console.error(`Error uploading file ${file.name}:`, error);
          throw error;
        }
      });

      await Promise.all(uploadPromises);

      // Save model data
      const modelData = {
        modelInfo: modelInfo,
        imageUrls: blobUrls
      };
      localStorage.setItem('trainModelData', JSON.stringify(modelData));

      // Check credits
      const response = await fetch('/astria/check-credits');
      const data = await response.json();
      console.log("Credits data", data);

      if (!response.ok || !data.credits || data.credits.credits <= 0) {
        // No credits - Save current pack and redirect to get-credits
        localStorage.setItem('selectedPack', JSON.stringify({
          id: packSlug,
          title: modelInfo.name || 'Unnamed',
          cover_url: blobUrls[0], // Use first image as cover
          slug: packSlug
        }));
        
        toast({
          title: "Insufficient credits",
          description: "Please purchase credits to continue.",
          duration: 5000,
        });
        router.push(`/overview/models/train/${packSlug}?step=get-credits`);
        return;
      }

      // Has credits - Go directly to summary with model data
      router.push(`/overview/models/train/${packSlug}?step=summary`);

    } catch (error: unknown) {
      console.error('Upload error:', error);
      let errorMessage = "There was an error processing your request. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast({
        title: "Process failed",
        description: errorMessage,
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };
   

  return (
    <div className="flex justify-between items-start min-h-screen font-poppins bg-white p-2 sm:p-4 lg:p-0">
      <div className="w-full max-w-[1276px] mx-auto p-3 sm:p-6 lg:p-[84px_60px] flex flex-col lg:flex-row gap-4 lg:gap-8">
        {/* Left Section - Updated with order utilities */}
        <div className="w-full lg:w-[480px] flex flex-col order-2 lg:order-1">
          {/* Banner */}
          <div className="w-full rounded-xl bg-[#5B16FE0F] p-[16px_20px] mb-4 flex items-center gap-6">
            <div className="w-5 h-5">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3333 2.5H6.66667C6.32499 2.5 6.04166 2.78333 6.04166 3.125V4.375C6.04166 4.71667 6.32499 5 6.66667 5H13.3333C13.675 5 13.9583 4.71667 13.9583 4.375V3.125C13.9583 2.78333 13.675 2.5 13.3333 2.5Z" fill="#5B16FE"/>
                <path d="M16.875 5H3.125C2.78333 5 2.5 5.28333 2.5 5.625V16.875C2.5 17.2167 2.78333 17.5 3.125 17.5H16.875C17.2167 17.5 17.5 17.2167 17.5 16.875V5.625C17.5 5.28333 17.2167 5 16.875 5ZM15.8333 15.8333H4.16667V6.66667H15.8333V15.8333Z" fill="#5B16FE"/>
              </svg>
            </div>
            <p className="font-poppins font-medium text-base leading-6 text-black max-w-[576.86px]">
              You can now auto-crop your group selfies! Simply tap on the image you want to crop, and we'll take care of it for you.
            </p>
          </div>

          {/* Main Upload Section */}
          <div className="rounded-3xl p-[3px] bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4]">
            <div className="bg-[#F2F2F7] rounded-3xl p-4 sm:p-6 lg:p-8 flex flex-col justify-between h-full relative">
              <input 
                ref={fileInputRef}
                id="file-upload" 
                type="file" 
                className="hidden"
                onChange={handleFileUpload} 
                accept="image/*"
                multiple
                disabled={isLoading}
              />

              {isLoading && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-3xl z-50 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full border-4 border-[#8371FF] border-t-transparent animate-spin mb-4" />
                  <p className="text-[#7C3AED] font-medium">Uploading images...</p>
                  <p className="text-gray-500 text-sm mt-2">Please wait while we process your photos</p>
                </div>
              )}

              <h2 className="text-2xl sm:text-3xl font-normal text-black text-center mb-4 sm:mb-6">Start Uploading photos</h2>

              {files.length === 0 && badFiles.length === 0 ? (
                <div className="flex-1 flex flex-col">
                  <div className="w-full sm:w-3/4 border-2 border-dashed border-[#7C3AED] rounded-[12.19px] p-3 sm:p-6 flex flex-col items-center justify-center gap-4 mt-4 sm:mt-8 mx-auto">
                    <label 
                      className={`cursor-pointer w-full ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
                      onClick={() => {
                        if (fileInputRef.current) {
                          fileInputRef.current.value = '';
                          fileInputRef.current.click();
                        }
                      }}
                    >
                      <div className="bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4] text-white rounded-lg px-6 py-3 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity mx-auto max-w-[200px]">
                        <Upload size={20} />
                        <span>Upload files</span>
                      </div>
                    </label>
                    <p className="text-sm text-gray-500 text-center">
                      Click to upload or drag and drop<br />
                      PNG, JPG, HEIC up to 120MB
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="rounded-[11.47px] border-[0.5px] border-[#68D585] bg-[#F2FCF4] overflow-hidden mb-4">
                    <div className="p-2 sm:p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#68D585] flex items-center justify-center">
                            <Check className="text-white w-4 h-4" />
                          </div>
                          <span className="font-medium">Good Photos</span>
                        </div>
                        <span className="text-[#68D585] font-medium">{files.length}/8</span>
                      </div>

                      <div className="w-full h-2 bg-[#E5F9EA] rounded-full mb-4">
                        <div 
                          className="h-2 bg-[#68D585] rounded-full transition-all duration-300"
                          style={{ width: `${(files.length / 8) * 100}%` }}
                        />
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                        {files.map((file, index) => (
                          <div key={`${index}-${file.preview}`} className="relative group aspect-square">
                            <div className="w-full h-full rounded-lg overflow-hidden border border-gray-200">
                              {file.preview && (
                                <img
                                  key={file.preview}
                                  src={file.preview}
                                  alt={`Upload ${index + 1}`}
                                  className="w-full h-full object-cover"
                                  style={{ display: 'block' }}
                                />
                              )}
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // Revoke only the URL for the specific image being deleted
                                if (files[index].preview) {
                                  URL.revokeObjectURL(files[index].preview);
                                }
                                
                                setFiles(prevFiles => {
                                  // Create a new array excluding the deleted image
                                  const updatedFiles = prevFiles.filter((_, i) => i !== index);
                                  
                                  // Update longshot count if needed
                                  if (files[index].inspectionData?.full_body_image_or_longshot) {
                                    setLongShotCount(prev => prev - 1);
                                  }
                                  
                                  return updatedFiles;
                                });
                              }}
                              className="absolute top-2 left-2 bg-white p-1.5 rounded-full shadow-md hover:bg-gray-50 transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>

                            {file.needsCropping && !file.isProcessing && (
                              <div className="absolute top-2 right-2 group/crop">
                                <button
                                  onClick={() => handleAutoCrop(index)}
                                  className="bg-white p-1.5 rounded-full shadow-md hover:bg-gray-50 transition-colors relative"
                                  disabled={file.isProcessing}
                                >
                                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                                    <path d="M8 8h8v8H8z" stroke="currentColor" strokeWidth="1.5"/>
                                  </svg>
                                  
                                  <div className="absolute invisible group-hover/crop:visible opacity-0 group-hover/crop:opacity-100 transition-opacity bottom-full mb-2 -left-1/2 transform translate-x-1/2">
                                    <div className="bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                                      Click to auto-crop image
                                    </div>
                                    <div className="w-2 h-2 bg-black transform rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
                                  </div>
                                </button>
                              </div>
                            )}

                            {file.isProcessing && (
                              <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                                <div className="w-8 h-8 rounded-full border-2 border-white border-t-transparent animate-spin" />
                              </div>
                            )}
                          </div>
                        ))}

                        {Array.from({ length: Math.max(0, 8 - files.length) }).map((_, i) => (
                          <div 
                            key={`empty-${i}`} 
                            className="aspect-square rounded-lg border-2 border-dashed border-[#E5E7EB] flex items-center justify-center cursor-pointer hover:border-[#7C3AED] transition-colors"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <div className="w-full h-full flex items-center justify-center">
                              <Plus className="w-5 h-5 text-gray-400" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {badFiles.length > 0 && (
                    <div className="rounded-[11.47px] border-[0.5px] border-[#EF4444] bg-[#FEF2F2] overflow-hidden mb-4">
                      <div className="p-2 sm:p-4">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-6 h-6 rounded-full bg-[#EF4444] flex items-center justify-center">
                            <AlertCircle className="text-white w-4 h-4" />
                          </div>
                          <span className="font-medium">Bad Photos</span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                          {badFiles.map((file, index) => (
                            <div key={index} className="flex flex-col gap-2">
                              {/* Image Container */}
                              <div className="relative aspect-square rounded-lg overflow-hidden border border-red-200">
                                {file.preview && (
                                  <img
                                    src={file.preview}
                                    alt={`Bad upload ${index + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                )}
                              </div>
                              {/* Error Message Below Image */}
                              <div className="bg-red-500 text-white text-sm rounded-lg p-2 text-center">
                                {file.reason}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-center">
                    <button
                      onClick={handleContinue}
                      disabled={files.length < 4 || !modelInfo}
                      className={`w-full sm:w-[315px] h-[48px] rounded-[50px] p-[12px_25px] gap-[10px] flex items-center justify-center transition-all duration-300
                        ${files.length >= 4 && modelInfo 
                          ? 'bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4] text-white hover:opacity-90'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                      Continue
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Section - Updated with order utilities */}
        <div className="w-full lg:w-[485px] ml-0 lg:ml-auto order-1 lg:order-2 mb-4 lg:mb-0">
          <h2 className="font-poppins text-xl sm:text-2xl mb-2">Image Guide</h2>
          <p className="text-gray-600 mb-4 text-sm sm:text-base">Follow the guide to get quality photos.</p>
          
          <p className="text-[#7C3AED] mb-4 sm:mb-6 text-sm sm:text-base">
            To ensure better photo quality, Aaria requires 1 half-body and 7 close-up images of you facing the camera.
          </p>

          <div className="w-full sm:w-[385px] aspect-square relative rounded-[11.47px] overflow-hidden bg-[#F8F8FC] border border-gray-200">
            <Image
              src="/good/img6.png"
              alt="Example photos guide"
              fill
              className="object-contain p-[12.34px] gap-[14.63px]"
              priority
            />
          </div>
        </div>
      </div>
    </div>
    
  );
};


export default TrainModelZone;