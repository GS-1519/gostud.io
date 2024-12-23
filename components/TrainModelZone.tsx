import React, { useState, useCallback, useEffect } from 'react';
import { Upload, Trash2, Check, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";

interface TrainModelZoneProps {
  packSlug: string;
  onContinue: () => void;
}

const TrainModelZone: React.FC<TrainModelZoneProps> = ({ packSlug, onContinue }) => {
  const [files, setFiles] = useState<{ file: File; preview: string }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modelInfo, setModelInfo] = useState<{ name: string; type: string; user_id: string } | null>(null);
  const { toast } = useToast();
  const router = useRouter();
  const nextStep = "/get-credits";

  useEffect(() => {
    const storedModelInfo = localStorage.getItem('modelInfo');
    if (storedModelInfo) {
      setModelInfo(JSON.parse(storedModelInfo));
    }
  }, []);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    if (files.length >= 8) {
      toast({
        title: "Maximum images reached",
        description: "You can only upload up to 8 images.",
        duration: 5000,
      });
      return;
    }

    const totalSize = [...files, file].reduce((acc, f) => 
      acc + (f instanceof File ? f.size : f.file.size), 0);
    if (totalSize > 120 * 1024 * 1024) {
      toast({
        title: "Image exceeds size limit",
        description: "The total size cannot exceed 120MB.",
        duration: 5000,
      });
      return;
    }

    const newFile = {
      file,
      preview: URL.createObjectURL(file)
    };

    setFiles(prevFiles => [...prevFiles, newFile]);

    toast({
      title: "Image added",
      description: `Successfully added image. ${Math.max(4 - (files.length + 1), 0)} more required.`,
      duration: 5000,
    });
  }, [files, toast]);

  const handleRemoveFile = (fileToRemove: { file: File; preview: string }) => {
    setFiles(files.filter(file => file.file !== fileToRemove.file));
    URL.revokeObjectURL(fileToRemove.preview);
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
    const blobUrls: string[] = [];

    try {
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

      const dataToSave = {
        modelInfo: modelInfo,
        imageUrls: blobUrls
      };
      localStorage.setItem('trainModelData', JSON.stringify(dataToSave));

      toast({
        title: "Upload successful",
        description: "Your photos have been saved. Checking credits...",
        duration: 5000,
      });

      const response = await fetch('/astria/check-credits');
      if (!response.ok) {
        if (response.status === 402 || response.status === 500) {
          router.push('/get-credits');
          return;
        }
      }

      router.push('/summary');
    } catch (error: unknown) {
      let errorMessage = "Upload failed. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-between items-start min-h-screen font-poppins bg-white p-4 lg:p-0">
      <div className="w-full max-w-[1276px] bg-white rounded-2xl p-6 lg:p-[84px_60px] flex flex-col lg:flex-row gap-4 lg:gap-8 shadow-lg mx-auto">
        <div className="w-full lg:w-[580px] rounded-3xl p-[3px] bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4]">
          <div className="bg-[var(--Backgrounds-Secondary,#F2F2F7)] rounded-3xl p-6 lg:p-8 flex flex-col justify-between h-full">
            <div className="space-y-6">
              <h2 className="text-3xl font-normal text-black text-center">Start Uploading photos</h2>
             

              {files.length === 0 ? (
                <div className="w-full border-2 border-dashed border-[#7C3AED] rounded-[12.19px] p-8 flex flex-col items-center justify-center gap-4">
                  <label htmlFor="file-upload-initial" className="cursor-pointer w-full">
                    <div className="bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4] text-white rounded-lg px-6 py-3 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity mx-auto max-w-[200px]">
                      <Upload size={20} />
                      <span>Upload files</span>
                    </div>
                  </label>
                  <div className="text-center space-y-1">
                    <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500">PNG, JPG, HEIC up to 120MB</p>
                  </div>
                  <input 
                    id="file-upload-initial" 
                    type="file" 
                    className="hidden"
                    onChange={handleFileUpload} 
                    accept="image/*" 
                    onClick={(e) => {
                      (e.target as HTMLInputElement).value = '';
                    }}
                  />
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Progress section */}
                  <div className="w-full bg-[#F2FCF4] rounded-xl p-4 border border-[#6BD585]">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Check className="text-[#6BD585]" size={20} />
                        <span className="font-medium">Good Photos</span>
                      </div>
                      <span className="text-[#6BD585]">{files.length}/8</span>
                    </div>
                    <div className="w-full bg-[#E5F9EA] rounded-full h-2">
                      <div 
                        className="bg-[#6BD585] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(files.length / 8) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Photo grid */}
                  <div className="w-full bg-white rounded-xl p-4 shadow-[0px_8.23px_49.37px_0px_rgba(0,0,0,0.15)]">
                    <div className="grid grid-cols-4 gap-[14.63px]">
                      {files.map(({ file, preview }, index) => (
                        <div 
                          key={index} 
                          className="relative group rounded-[12.19px] overflow-hidden aspect-square border border-[#68D585] bg-white"
                        >
                          <img
                            src={preview}
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 left-2 bg-white rounded-full p-1.5 shadow-md">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2">
                              <path d="M7 7h10v10H7z" />
                              <path d="M4 4v16h16" />
                            </svg>
                          </div>
                          <button
                            onClick={() => handleRemoveFile({ file, preview })}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}

                      {Array.from({ length: 8 - files.length }).map((_, index) => (
                        <label
                          key={`empty-${index}`}
                          htmlFor={`file-upload-${index}`}
                          className="border-2 border-dashed border-[#7C3AED] rounded-[12.19px] flex items-center justify-center cursor-pointer aspect-square hover:bg-purple-50 transition-colors"
                        >
                          <div className="text-4xl text-[#7C3AED]">+</div>
                          <input 
                            id={`file-upload-${index}`} 
                            type="file" 
                            className="hidden"
                            onChange={handleFileUpload} 
                            accept="image/*" 
                            onClick={(e) => {
                              (e.target as HTMLInputElement).value = '';
                            }}
                          />
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Bad photos section */}
                  <div className="w-full bg-[#FEF2F2] rounded-xl p-4 border border-[#EF4444] shadow-[0px_8.23px_49.37px_0px_#00000026]">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="text-[#EF4444]" size={20} />
                      <span className="font-medium">Bad Photos</span>
                    </div>
                    <div className="grid grid-cols-4 gap-[14.63px]">
                      {/* Add bad photos content here */}
                    </div>
                  </div>
                </div>
              )}

              <div className="text-center space-y-4">
                <p className="text-xs text-gray-500">
                  By using our AI Tools, you agree to and accept our{" "}
                  <a href="#" className="text-blue-500 hover:underline">Terms of Use</a>
                </p>

                <button 
                  className={`w-[315px] h-[48px] rounded-[50px] px-[12px] py-[12px] pr-[25px] pb-[12px] pl-[25px] gap-[10px] font-semibold text-white transition-colors ${
                    files.length >= 4 && !isLoading
                      ? 'bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4] hover:opacity-90'
                      : 'bg-gray-400 cursor-not-allowed'
                  } mx-auto`}
                  onClick={handleContinue}
                  disabled={files.length < 4 || isLoading}
                >
                  {isLoading ? 'Uploading...' : 'Continue →'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[485px] ml-auto">
          <h2 className="font-poppins text-2xl mb-2">Image Guide</h2>
          <p className="text-gray-600 mb-4">Follow the guide to get quality photos.</p>
          
          <p className="text-[#7C3AED] mb-6">
            To ensure better photo quality, Aaria requires 1 half-body and 7 close-up images of you facing the camera.
          </p>

          <div className="w-[385px] h-[385px] relative rounded-[12.19px] overflow-hidden bg-[#F2F2F7] border border-gray-200 shadow-[0px_8.23px_49.37px_0px_#00000026]">
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