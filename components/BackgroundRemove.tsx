"use client";
import dynamic from 'next/dynamic';
import { useState, useRef } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";

const BackgroundRemoval = dynamic(
  () => import('./BackgroundRemovalComponent'),
  { ssr: false }
);

export default function BackgroundRemove() {
  const [inputFile, setInputFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setInputFile(file);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div 
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors"
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files?.[0];
          if (file) handleFileChange({ target: { files: [file] } } as any);
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="space-y-4">
          <div className="flex justify-center">
            <ImageIcon className="w-16 h-16 text-gray-400" />
          </div>
          <div className="space-y-2">
            <p className="text-gray-600">Drag and drop your image here, or</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Choose File
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>

      {inputFile && <BackgroundRemoval />}
    </div>
  );
}