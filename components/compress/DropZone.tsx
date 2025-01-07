import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import type { ProcessedImage } from '@/lib/types/encoders';

interface DropZoneProps {
  onFilesDrop: (files: File[]) => void;
  disabled?: boolean;
}

export function DropZone({ onFilesDrop, disabled }: DropZoneProps) {
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (disabled) return;
    
    const files = Array.from(e.dataTransfer.files)
      .filter(file => file.type.startsWith('image/') || file.name.toLowerCase().endsWith('jxl'));
    onFilesDrop(files);
  }, [onFilesDrop, disabled]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    
    const files = Array.from(e.target.files || [])
      .filter(file => file.type.startsWith('image/') || file.name.toLowerCase().endsWith('jxl'));
    onFilesDrop(files);
    e.target.value = '';
  }, [onFilesDrop, disabled]);

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
        disabled 
          ? 'border-gray-200 bg-gray-50 cursor-not-allowed' 
          : 'border-gray-300 hover:border-blue-500 cursor-pointer'
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input
        type="file"
        id="fileInput"
        className="hidden"
        multiple
        accept="image/*,.jxl"
        onChange={handleFileInput}
        disabled={disabled}
      />
      <label
        htmlFor="fileInput"
        className={`flex flex-col items-center gap-4 ${
          disabled ? 'cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        <Upload className={`w-12 h-12 ${disabled ? 'text-gray-300' : 'text-gray-400'}`} />
        <div>
          <p className={`text-lg font-medium ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
            {disabled ? 'Processing...' : 'Drop images here or click to upload'}
          </p>
          <p className={`text-sm ${disabled ? 'text-gray-300' : 'text-gray-500'}`}>
            Supports JPEG, PNG, WebP, AVIF, and JXL
          </p>
        </div>
      </label>
    </div>
  );
}