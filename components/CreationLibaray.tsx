import React from 'react';
import Image from 'next/image';

// Define the interface for image data
interface GalleryImage {
  src: string;
  isLarge: boolean;
  alt: string;
}

const Gallery = () => {
  // Gallery images data with proper paths
  const images: GalleryImage[] = [
    { src: '/team/img1.png', isLarge: false, alt: 'Professional headshot 1' },
    { src: '/team/img2.png', isLarge: false, alt: 'Professional headshot 2' },
    { src: '/team/img3.png', isLarge: true, alt: 'Professional headshot 3' },
    { src: '/team/img4.png', isLarge: false, alt: 'Professional headshot 4' },
    { src: '/team/img5.png', isLarge: false, alt: 'Professional headshot 5' },
    { src: '/team/img6.png', isLarge: true, alt: 'Professional headshot 6' },
    { src: '/team/img7.png', isLarge: false, alt: 'Professional headshot 7' },
    { src: '/team/img8.png', isLarge: true, alt: 'Professional headshot 8' }
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
    <div className="bg-white min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 pt-8 sm:pt-12">
          <h1 className="text-[32px] leading-[48px] font-medium text-center mb-4">
            TAKE A SNEAK PEEK INTO MY CREATIONS
          </h1>
          <p className="text-[#161C2D]/60 text-[16px] leading-[24px] max-w-[790px] mx-auto">
            I'm excited to share a glimpse of my work with you.
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
      </div>
    </div>
  );
};

export default Gallery;