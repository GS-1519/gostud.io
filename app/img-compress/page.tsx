'use client'
import React, { useState, useCallback, useEffect } from 'react';
import { Image, Trash2 } from 'lucide-react';
import { CompressionOptions } from '@/components/compress/CompressionOptions'; 
import { DropZone } from '@/components/compress/DropZone'; 
import { ImageList } from '@/components/compress/ImageList'; 
import { DownloadAll } from '@/components/compress/DownloadAll'; 
import { useImageQueue } from '@/components/hooks/useImageQueue'; 
import { DEFAULT_QUALITY_SETTINGS } from '@/utils/formatDefaults'; 
import { ensureWasmLoaded } from '@/utils/wasm';
import type { ImageFile, OutputType, CompressionOptions as CompressionOptionsType } from '@/lib/types/encoders';


export default function Page() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [outputType, setOutputType] = useState<OutputType>('webp');
  const [options, setOptions] = useState<CompressionOptionsType>({
    quality: DEFAULT_QUALITY_SETTINGS.webp,
  });

  const { addToQueue } = useImageQueue(options, outputType, setImages);

  const handleOutputTypeChange = useCallback((type: OutputType) => {
    setOutputType(type);
    if (type !== 'png') {
      setOptions({ quality: 
        DEFAULT_QUALITY_SETTINGS[type as keyof typeof DEFAULT_QUALITY_SETTINGS] 
      });
    }
  }, []);

  const handleFilesDrop = useCallback((newFiles: File[]) => {
    // Add validation
    const validFiles = newFiles.filter(file => {
      if (!file || !(file instanceof File)) {
        console.error('Invalid file object:', file);
        return false;
      }
      return file.type.startsWith('image/') || file.name.toLowerCase().endsWith('jxl');
    });

    // Create ImageFile objects with proper initialization
    const imageFiles = validFiles.map(file => ({
      id: crypto.randomUUID(),
      file,
      name: file.name,
      originalSize: file.size,
      status: 'pending' as const,
    }));

    // Only proceed if we have valid files
    if (imageFiles.length > 0) {
      setImages((prev) => [...prev, ...imageFiles]);
      
      requestAnimationFrame(() => {
        imageFiles.forEach(image => addToQueue(image.id));
      });
    }
  }, [addToQueue]);

  const handleRemoveImage = useCallback((id: string) => {
    setImages((prev) => {
      const image = prev.find(img => img.id === id);
      if (image?.preview) {
        URL.revokeObjectURL(image.preview);
      }
      return prev.filter(img => img.id !== id);
    });
  }, []);

  const handleClearAll = useCallback(() => {
    images.forEach(image => {
      if (image.preview) {
        URL.revokeObjectURL(image.preview);
      }
    });
    setImages([]);
  }, [images]);

  const handleDownloadAll = useCallback(() => {
    const completedImages = images.filter(img => img.status === 'complete');
    completedImages.forEach(image => {
      if (image.blob && image.outputType) {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(image.blob);
        link.download = `${image.file.name.split('.')[0]}.${image.outputType}`;
        link.click();
        URL.revokeObjectURL(link.href);
      }
    });
  }, [images]);

  const completedImages = images.filter(img => img.status === 'complete').length;

  // Initialize WASM modules on mount
  useEffect(() => {
    const initWasm = async () => {
      try {
        // Initialize WASM for the current output type
        await ensureWasmLoaded(outputType);
      } catch (error) {
        console.error('Failed to initialize WASM:', error);
      }
    };

    initWasm();
  }, [outputType]); // Re-run when output type changes

  // Update WASM when output type changes
  useEffect(() => {
    const loadNewFormat = async () => {
      try {
        await ensureWasmLoaded(outputType);
      } catch (error) {
        console.error(`Failed to load ${outputType} support:`, error);
      }
    };
    loadNewFormat();
  }, [outputType]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Image className="w-10 h-10 text-emerald-400" />
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              ImageOptimizer<span className="text-emerald-400">Pro</span>
            </h1>
          </div>
          <p className="text-gray-300 text-lg">
            Professional-grade image optimization for modern web formats
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Supports AVIF, JPEG, JPEG XL, PNG, and WebP formats
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <CompressionOptions
              options={options}
              outputType={outputType}
              onOptionsChange={setOptions}
              onOutputTypeChange={handleOutputTypeChange}
            />
          </div>

          <div className="bg-gray-800/30 backdrop-blur-sm border-2 border-dashed border-gray-600 hover:border-emerald-400 transition-colors rounded-xl">
            <DropZone onFilesDrop={handleFilesDrop} />
          </div>

          {completedImages > 0 && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4">
              <DownloadAll onDownloadAll={handleDownloadAll} count={completedImages} />
            </div>
          )}

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
            <ImageList 
              images={images as ImageFile[]}
              onRemove={handleRemoveImage}
            />
          </div>

          {images.length > 0 && (
            <button
              onClick={handleClearAll}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-500/80 hover:bg-red-600 text-white rounded-xl transition-all duration-200 backdrop-blur-sm font-medium"
            >
              <Trash2 className="w-5 h-5" />
              Clear All Images
            </button>
          )}
        </div>
      </div>
    </div>
  );
}