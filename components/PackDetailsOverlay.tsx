'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface PackImage {
  src: string;
  alt: string;
}

interface PackDetailsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  pack: {
    id: number;
    slug: string;
    title: string;
    images: string[];
  };
}

// Slider component - reused from PhotographyGrid
const ImageSlider: React.FC<{ images: PackImage[] }> = ({ images }) => {
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const totalImages = images.length;

  return (
    <div className="w-full overflow-hidden">
      <div className="relative w-full">
        <div className="flex items-center">
          {/* First set of images */}
          <div 
            className="flex animate-marquee items-center gap-6 whitespace-nowrap"
            style={{ animation: 'marquee 15s linear infinite' }}
          >
            {images.map((img, i) => (
              <div 
                key={i}
                className="flex-shrink-0 w-[280px] h-[380px] rounded-xl overflow-hidden bg-[#161C2D] transition-all duration-300 hover:scale-[1.02]"
                style={{
                  boxShadow: '0px 4px 24px -1px rgba(0, 0, 0, 0.2)'
                }}
              >
                <div 
                  className="w-full h-full group hover:before:content-[''] hover:before:absolute hover:before:inset-0 hover:before:rounded-xl hover:before:p-[6px] hover:before:bg-gradient-to-r hover:before:from-[#8371FF] hover:before:via-[rgba(160,119,254,0.8)] hover:before:to-[rgba(1,199,228,0.5)]"
                >
                  <div className="relative h-full w-full bg-[#161C2D] rounded-xl overflow-hidden">
                    <Image 
                      src={img.src} 
                      alt={img.alt}
                      width={280}
                      height={380}
                      className="w-full h-full object-cover"
                      priority={i < 2}
                      onLoad={() => setImagesLoaded(prev => prev + 1)}
                      onError={(e) => {
                        console.error(`Failed to load image: ${img.src}`);
                        e.currentTarget.src = "https://www.astria.ai/assets/logo-b4e21f646fb5879eb91113a70eae015a7413de8920960799acb72c60ad4eaa99.png";
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Duplicate set for continuous scroll */}
          <div 
            className="flex animate-marquee items-center gap-6 whitespace-nowrap"
            style={{ animation: 'marquee 15s linear infinite' }}
          >
            {images.map((img, i) => (
              <div 
                key={`${i}-duplicate`}
                className="flex-shrink-0 w-[280px] h-[380px] rounded-xl overflow-hidden bg-[#161C2D] transition-all duration-300 hover:scale-[1.02]"
                style={{
                  boxShadow: '0px 4px 24px -1px rgba(0, 0, 0, 0.2)'
                }}
              >
                <div 
                  className="w-full h-full group hover:before:content-[''] hover:before:absolute hover:before:inset-0 hover:before:rounded-xl hover:before:p-[6px] hover:before:bg-gradient-to-r hover:before:from-[#8371FF] hover:before:via-[rgba(160,119,254,0.8)] hover:before:to-[rgba(1,199,228,0.5)]"
                >
                  <div className="relative h-full w-full bg-[#161C2D] rounded-xl overflow-hidden">
                    <Image 
                      src={img.src} 
                      alt={img.alt}
                      width={280}
                      height={380}
                      className="w-full h-full object-cover"
                      priority={i < 2}
                      onLoad={() => setImagesLoaded(prev => prev + 1)}
                      onError={(e) => {
                        console.error(`Failed to load image: ${img.src}`);
                        e.currentTarget.src = "https://www.astria.ai/assets/logo-b4e21f646fb5879eb91113a70eae015a7413de8920960799acb72c60ad4eaa99.png";
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {imagesLoaded < totalImages && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
          <div className="loading-spinner" />
        </div>
      )}
    </div>
  );
};

export function PackDetailsOverlay({ isOpen, onClose, pack }: PackDetailsOverlayProps) {
  const router = useRouter();
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [failedImages, setFailedImages] = useState<string[]>([]);

  useEffect(() => {
    console.log('Pack images in overlay:', pack.images);
  }, [pack]);

  if (!isOpen) return null;

  const handleContinue = () => {
    try {
      localStorage.setItem('selectedPack', JSON.stringify(pack));
      router.push(`/overview/models/train/${pack.slug}`);
    } catch (error) {
      console.error('Error saving pack:', error);
    }
  };

  // Convert pack images to PackImage format
  const packImages: PackImage[] = pack.images.map(src => ({
    src,
    alt: `${pack.title} preview`
  }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      <div 
        className="w-[1270px] bg-[#161C2D] rounded-xl relative"
        style={{ 
          height: '703px',
          padding: '24px 82px',
        }}
      >
        {/* Close button */}
        <button 
          onClick={onClose} 
          className="absolute right-6 top-6 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        {/* Title */}
        <h2 className="text-center text-3xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-medium mb-4">
          {pack.title}
        </h2>
        
        {/* Description */}
        <p className="text-center text-gray-300 mb-8 max-w-2xl mx-auto">
          Explore sample images from this pack. Choose this style to create your own unique AI-generated photos.
        </p>

        {/* Image Slider */}
        <div className="mb-8 h-[400px] flex items-center">
          <ImageSlider images={packImages} />
        </div>

        {/* Generate Button */}
        <div className="text-center">
          <Button
            onClick={handleContinue}
            className="bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4] text-white px-8 py-3 rounded-full hover:opacity-90 transition-all duration-300"
          >
            Continue with this Pack →
          </Button>
        </div>
      </div>
    </div>
  );
} 