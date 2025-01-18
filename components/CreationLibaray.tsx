'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

// Define the interface for image data
interface GalleryImage {
  src: string;
  isLarge: boolean;
  alt: string;
}

const Gallery = () => {
  const t = useTranslations('CreationGallery');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  // Gallery images data with proper paths
  const images: GalleryImage[] = [
    { src: '/Packs/Glamour-photos/Man/man1.jpg', isLarge: false, alt: 'Professional headshot 1' },
    { src: '/Packs/Botnical-photos/Man/man2.jpg', isLarge: true, alt: 'Professional headshot 10' },
    { src: '/Packs/Jcrew-photos/Women/women3.jpg', isLarge: true, alt: 'Professional headshot 3' },
    { src: '/Packs/Youtube-photos/Women/women3.jpg', isLarge: false, alt: 'Professional headshot 4' },
    { src: '/Packs/Doctor-photos/Women/women1.jpg', isLarge: true, alt: 'Professional headshot 10' },
    { src: '/Packs/Botnical-photos/Women/women1.jpg', isLarge: true, alt: 'Professional headshot 10' },
    { src: '/Packs/Botnical-photos/Women/women6.jpg', isLarge: true, alt: 'Professional headshot 10' },
    { src: '/Packs/Botnical-photos/Man/man2.jpg', isLarge: true, alt: 'Professional headshot 10' },
    { src: '/Packs/Botnical-photos/Man/man2.jpg', isLarge: true, alt: 'Professional headshot 10' },
    { src: '/Packs/Halloween-photos/Women/women1.jpg', isLarge: true, alt: 'Professional headshot 10' },
    { src: '/Packs/Mythical-photos/Women/women2.jpg', isLarge: false, alt: 'Professional headshot 5' },
    { src: '/Packs/Glamour-photos/Man/man1.jpg', isLarge: true, alt: 'Professional headshot 6' },
    { src: '/Packs/Botnical-photos/Women/women3.jpg', isLarge: false, alt: 'Professional headshot 7' },
    { src: '/Packs/Dog/dog6.jpg', isLarge: true, alt: 'Professional headshot 8' },
    { src: '/Packs/Fitness-photos/Women/women4.jpg', isLarge: false, alt: 'Professional headshot 9' },
    { src: '/Packs/Halloween-photos/Women/women1.jpg', isLarge: true, alt: 'Professional headshot 10' },
    { src: '/Packs/Doctor-photos/Women/women1.jpg', isLarge: true, alt: 'Professional headshot 10' },
    { src: '/Packs/Botnical-photos/Women/women1.jpg', isLarge: true, alt: 'Professional headshot 10' },
    { src: '/Packs/Botnical-photos/Women/women6.jpg', isLarge: true, alt: 'Professional headshot 10' },
    { src: '/Packs/Redcarpat-photos/Man/man2.jpg', isLarge: true, alt: 'Professional headshot 10' },
    { src: '/Packs/Redcarpat-photos/Man/man3.jpg', isLarge: true, alt: 'Professional headshot 10' },
    { src: '/Packs/Americana-photos/Man/man2.jpg', isLarge: true, alt: 'Professional headshot 10' },
    { src: '/Packs/Botnical-photos/Man/man2.jpg', isLarge: true, alt: 'Professional headshot 10' },
    { src: '/Packs/Americana-photos/Man/man3.jpg', isLarge: true, alt: 'Professional headshot 10' },
    { src: '/Packs/Dating-photo/Man/man2.jpg', isLarge: true, alt: 'Professional headshot 10' },
    { src: '/Packs/Dating-photo/Man/man3.jpg', isLarge: true, alt: 'Professional headshot 10' },
    { src: '/Packs/Dating-photo/Women/women3.jpg', isLarge: true, alt: 'Professional headshot 10' },
    { src: '/Packs/Dating-photo/Women/women5.jpg', isLarge: true, alt: 'Professional headshot 10' },
    { src: '/Packs/Fitness-photos/Women/women5.jpg', isLarge: true, alt: 'Professional headshot 10' },
    { src: '/Packs/Tattos-photos/Women/women5.jpg', isLarge: true, alt: 'Professional headshot 10' },
    { src: '/Packs/Halloween-photos/Women/women5.jpg', isLarge: true, alt: 'Professional headshot 10' },
    { src: '/Packs/Redcarpat-photos/Man/man3.jpg', isLarge: true, alt: 'Professional headshot 10' },
    { src: '/Packs/Doctor-photos/Women/women1.jpg', isLarge: true, alt: 'Professional headshot 10' },

    { src: '/Packs/Dating-photo/Women/women5.jpg', isLarge: true, alt: 'Professional headshot 10' },
    { src: '/Packs/Kidsbirthday-photos/Girls/girls5.jpg', isLarge: true, alt: 'Professional headshot 10' },
    { src: '/Packs/Botnical-photos/Man/man2.jpg', isLarge: true, alt: 'Professional headshot 10' },
    
  ];

  // Function to organize images into columns with proper typing
  const getColumnImages = (columnCount: number): GalleryImage[][] => {
    const columns: GalleryImage[][] = Array.from({ length: columnCount }, () => []);
    let currentCol = 0;

    images.forEach((image) => {
      columns[currentCol].push(image);
      currentCol = (currentCol + 1) % columnCount;
    });

    return columns;
  };

  return (
    <div className="w-full bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 pt-4">
          <h2 className="text-[32px] leading-[48px] font-medium text-center mb-4" 
              style={{ 
                background: 'linear-gradient(90deg, #8371FF -39.48%, #A077FE 15.54%, #01C7E4 100%)', 
                WebkitBackgroundClip: 'text', 
                backgroundClip: 'text', 
                color: 'transparent',
                whiteSpace: 'pre-line'
              }}>
            {t('title')}
          </h2>
          <p className="text-[#161C2D]/60 text-[16px] leading-[24px] max-w-[790px] mx-auto">
            {t('description')}
          </p>
        </div>

        {/* Desktop Layout (4 columns) */}
        <div className="hidden md:flex gap-[24px]">
          {getColumnImages(4).map((column, columnIndex) => (
            <div key={`desktop-${columnIndex}`} className="flex-1 flex flex-col gap-[24px]">
              {column.map((image, imageIndex) => (
                <div 
                  key={`desktop-${columnIndex}-${imageIndex}`} 
                  className={`relative w-full overflow-hidden rounded-[16px] ${
                    image.isLarge ? 'h-[375px]' : 'h-[300px]'
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1440px) 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Mobile Layout (2 columns) */}
        <div className="md:hidden flex gap-[16px]">
          {getColumnImages(2).map((column, columnIndex) => (
            <div key={`mobile-${columnIndex}`} className="flex-1 flex flex-col gap-[16px]">
              {column.map((image, imageIndex) => (
                <div 
                  key={`mobile-${columnIndex}-${imageIndex}`} 
                  className={`relative w-full overflow-hidden rounded-[16px] ${
                    image.isLarge ? 'h-[280px]' : 'h-[200px]'
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 768px) 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Create Headshot Button */}
        <div className="flex justify-center mt-8 mb-0 px-4 sm:px-0">
          <Link href="/login" className="w-full sm:w-auto">
            <button 
              className="mx-auto px-4 sm:px-6 py-2.5 sm:py-3 text-white rounded-full flex items-center justify-center gap-2 hover:opacity-90 transition-opacity font-poppins text-[14px] sm:text-[16px]"
              style={{
                background: '#5B16FE',
                maxWidth: '269px',
              }}
            >
              <span>{t('createButton')}</span>
              <svg 
                className={`w-4 sm:w-5 h-4 sm:h-5 ${isRTL ? 'rotate-180' : ''}`} 
                viewBox="0 0 20 20" 
                fill="none"
              >
                <path 
                  d="M4.16666 10H15.8333M15.8333 10L10 4.16669M15.8333 10L10 15.8334" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Gallery;