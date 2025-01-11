'use client';

import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
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
    cover_url: string;
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
            style={{ animation: 'marquee 30s linear infinite' }}
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
            style={{ animation: 'marquee 30s linear infinite' }}
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    console.log('Pack images in overlay:', pack.images);
  }, [pack]);

  // Save pack to localStorage when selected
  useEffect(() => {
    if (pack && isOpen) {
      try {
        localStorage.setItem('selectedPack', JSON.stringify({
          id: pack.id,
          slug: pack.slug,
          title: pack.title,
          images: pack.images,
          timestamp: new Date().getTime()
        }));
      } catch (error) {
        console.error('Error saving pack to localStorage:', error);
      }
    }
  }, [pack, isOpen]);

  const handleContinue = () => {
    try {
      // Verify the pack is in localStorage before continuing
      const savedPack = localStorage.getItem('selectedPack');
      if (!savedPack) {
        // Re-save if not found
        localStorage.setItem('selectedPack', JSON.stringify({
          id: pack.id,
          slug: pack.slug,
          title: pack.title,
          images: pack.images,
          timestamp: new Date().getTime()
        }));
      }
      
      router.push(`/overview/models/train/${pack.slug}`);
    } catch (error) {
      console.error('Error handling continue:', error);
      // Fallback navigation even if localStorage fails
      router.push(`/overview/models/train/${pack.slug}`);
    }
  };

  // Convert pack images to PackImage format
  const packImages: PackImage[] = (pack.images || []).map(src => ({
    src: src || pack.cover_url, // Fallback to cover_url if src is undefined
    alt: `${pack.title} preview`
  }));

  // Add error handling for empty images array
  if (!packImages.length && pack.cover_url) {
    packImages.push({
      src: pack.cover_url,
      alt: `${pack.title} preview`
    });
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % packImages.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + packImages.length) % packImages.length);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 overflow-y-auto p-4">
      <div 
        className="w-full max-w-[1270px] bg-[#161C2D] rounded-xl relative my-4"
        style={{ 
          minHeight: 'min(703px, calc(100vh - 32px))',
          padding: '24px clamp(16px, 5%, 82px)',
        }}
      >
        {/* Close button - made more visible and accessible */}
        <button 
          onClick={onClose} 
          className="absolute right-4 top-4 md:right-6 md:top-6 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Close overlay"
        >
          <X size={24} />
        </button>

        {/* Title - adjusted for mobile */}
        <h2 className="text-center text-2xl md:text-3xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-medium mb-4 px-4">
          {pack.title}
        </h2>
        
        {/* Description - adjusted for mobile */}
        <p className="text-center text-gray-300 mb-8 max-w-2xl mx-auto px-4 text-sm md:text-base">
          Explore sample images from this pack. Choose this style to create your own unique AI-generated photos.
        </p>

        {/* Image Container - removed auto-scroll, added manual scroll */}
        <div className="mb-8 h-[300px] md:h-[400px] relative">
          {/* Mobile view (single image with controls) */}
          <div className="md:hidden relative h-full">
            <div className="flex items-center justify-center h-full">
              <div 
                className="w-[200px] h-[270px] rounded-xl overflow-hidden bg-[#161C2D]"
                style={{
                  boxShadow: '0px 4px 24px -1px rgba(0, 0, 0, 0.2)'
                }}
              >
                <div className="w-full h-full">
                  <Image 
                    src={packImages[currentImageIndex].src} 
                    alt={packImages[currentImageIndex].alt}
                    width={280}
                    height={380}
                    className="w-full h-full object-cover"
                    priority
                    onLoad={() => setImagesLoaded(prev => prev + 1)}
                    onError={(e) => {
                      console.error(`Failed to load image: ${packImages[currentImageIndex].src}`);
                      e.currentTarget.src = "https://www.astria.ai/assets/logo-b4e21f646fb5879eb91113a70eae015a7413de8920960799acb72c60ad4eaa99.png";
                    }}
                  />
                </div>
              </div>
            </div>
            
            {/* Navigation buttons - adjusted size and position */}
            <button 
              onClick={previousImage}
              className="absolute left-4 top-[55%] -translate-y-1/2 bg-white/10 p-1.5 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-4 top-[55%] -translate-y-1/2 bg-white/10 p-1.5 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Desktop view (scrollable gallery) */}
          <div className="hidden md:block">
            <div 
              className="flex items-center gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
              style={{
                scrollbarWidth: 'none',  // Firefox
                msOverflowStyle: 'none', // IE/Edge
                WebkitOverflowScrolling: 'touch' // iOS smooth scrolling
              }}
            >
              {packImages.map((img, i) => (
                <div 
                  key={i}
                  className="flex-shrink-0 w-[280px] h-[380px] rounded-xl overflow-hidden bg-[#161C2D] transition-all duration-300 hover:scale-[1.02] snap-center"
                  style={{
                    boxShadow: '0px 4px 24px -1px rgba(0, 0, 0, 0.2)'
                  }}
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
              ))}
            </div>
          </div>
        </div>

        {/* Generate Button - adjusted for mobile */}
        <div className="text-center px-4">
          <Button
            onClick={handleContinue}
            className="w-full md:w-auto text-sm md:text-base bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4] text-white px-4 md:px-8 py-2 md:py-3 rounded-full hover:opacity-90 transition-all duration-300"
          >
            Continue with this Pack →
          </Button>
        </div>
      </div>
    </div>
  );
} 