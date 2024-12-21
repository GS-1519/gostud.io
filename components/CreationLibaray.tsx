import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const CreationGallery = () => {
  const images = [
    { src: "/api/placeholder/400/500", alt: "Doctor in white coat" },
    { src: "/api/placeholder/400/500", alt: "Woman with flowers" },
    { src: "/api/placeholder/400/500", alt: "Smiling woman" },
    { src: "/api/placeholder/400/500", alt: "Man with food" },
    { src: "/api/placeholder/400/500", alt: "Man in suit" },
    { src: "/api/placeholder/400/500", alt: "Pop art portrait" },
    { src: "/api/placeholder/400/500", alt: "Woman in garden" },
    { src: "/api/placeholder/400/500", alt: "Woman in blazer" },
    { src: "/api/placeholder/400/500", alt: "Dog in field" },
    { src: "/api/placeholder/400/500", alt: "Woman in red dress" },
    { src: "/api/placeholder/400/500", alt: "Professional headshot" },
    { src: "/api/placeholder/400/500", alt: "Woman in suit" },
    { src: "/api/placeholder/400/500", alt: "Woman in office" },
    { src: "/api/placeholder/400/500", alt: "Doctor portrait" },
    { src: "/api/placeholder/400/500", alt: "Executive portrait" },
    { src: "/api/placeholder/400/500", alt: "Swimming portrait" }
  ];

  return (
    <div className="w-full bg-white py-12 px-4 md:py-16">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-[#8371FF] to-[#99E6FF] bg-clip-text text-transparent">
            TAKE A SNEAK PEEK INTO MY CREATIONS
          </h2>
          <p className="text-gray-600">
            I'm excited to share a glimpse of my work with you.
          </p>
        </div>

        {/* Mobile Gallery */}
        <div className="md:hidden space-y-4">
          {images.slice(0, 8).map((image, index) => (
            <div key={index} className="w-full rounded-2xl overflow-hidden">
              <div className="relative aspect-[4/5]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Gallery */}
        <div className="hidden md:grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div 
              key={index} 
              className={`rounded-2xl overflow-hidden ${
                index === 3 || index === 7 || index === 11 || index === 15 
                  ? 'col-span-1 row-span-2' 
                  : 'col-span-1'
              }`}
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
            </div>
          ))}
        </div>

        {/* See All Button */}
        <div className="flex justify-center mt-8 md:mt-12">
          <Link href="/gallery">
            <button className="bg-[#7C3AED] text-white px-8 py-3 rounded-full flex items-center gap-2 hover:bg-[#6D28D9] transition-colors">
              See All
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M5 12H19M19 12L12 5M19 12L12 19" 
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

export default CreationGallery;