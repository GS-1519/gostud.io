'use client'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, ChevronUp, Wand2 } from 'lucide-react';

const DoctorHeadshotHero = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  const [showAll, setShowAll] = useState(false);

  const categories = [
    { name: 'All', value: 'all' },
    { name: 'Woman', value: 'woman' },
    { name: 'Man', value: 'man' }
  ];

  const images = {
    woman: [
      { src: '/Packs/Doctor-photos/Women/women1.jpg', alt: 'Professional female doctor headshot' },
      { src: '/Packs/Doctor-photos/Women/women2.jpg', alt: 'Medical professional woman portrait' },
      { src: '/Packs/Doctor-photos/Women/women3.jpg', alt: 'Healthcare professional headshot' },
      { src: '/Packs/Doctor-photos/Women/women4.jpg', alt: 'Woman doctor profile photo' },
      { src: '/Packs/Doctor-photos/Women/women5.jpg', alt: 'Female physician headshot' },
      { src: '/Packs/Doctor-photos/Women/women6.jpg', alt: 'Woman medical specialist photo' },
      { src: '/Packs/Doctor-photos/Women/women7.jpg', alt: 'Female healthcare provider portrait' },
      { src: '/Packs/Doctor-photos/Women/women8.jpg', alt: 'Woman doctor professional photo' },
      { src: '/Packs/Doctor-photos/Women/women9.jpg', alt: 'Female medical practitioner headshot' },
      { src: '/Packs/Doctor-photos/Women/women10.jpg', alt: 'Woman healthcare specialist portrait' },
      { src: '/Packs/Doctor-photos/Women/women11.jpg', alt: 'Female doctor professional headshot' },
    ],
    man: [
      { src: '/Packs/Doctor-photos/Man/man1.jpg', alt: 'Professional male doctor headshot' },
      { src: '/Packs/Doctor-photos/Man/man2.jpg', alt: 'Medical professional man portrait' },
      { src: '/Packs/Doctor-photos/Man/man3.jpg', alt: 'Healthcare professional headshot' },
      { src: '/Packs/Doctor-photos/Man/man4.jpg', alt: 'Man doctor profile photo' },
      { src: '/Packs/Doctor-photos/Man/man5.jpg', alt: 'Male physician headshot' },
      { src: '/Packs/Doctor-photos/Man/man6.jpg', alt: 'Man medical specialist photo' },
      { src: '/Packs/Doctor-photos/Man/man7.jpg', alt: 'Male healthcare provider portrait' },
      { src: '/Packs/Doctor-photos/Man/man8.jpg', alt: 'Man doctor professional photo' },
    ]
  };

  const getDisplayImages = () => {
    const filteredImages = activeCategory === 'all' 
      ? [...images.woman, ...images.man]
      : images[activeCategory as keyof typeof images] || [];
    
    return showAll ? filteredImages : filteredImages.slice(0, 8);
  };

  const displayImages = getDisplayImages();

  return (
    <div className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8 py-12">
          <div className="space-y-4">
            <h1 
              className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4] leading-tight tracking-tight"
              style={{
                backgroundImage: 'linear-gradient(90deg, #8371FF -39.48%, #A077FE 15.54%, #01C7E4 100%)'
              }}
            >
              Professional Medical Headshots That Inspire Trust
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Elevate your medical practice with professional headshots that convey expertise and compassion
            </p>
          </div>

          <div className="flex justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => {
                  setActiveCategory(category.value);
                  setShowAll(false);
                }}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === category.value
                    ? 'bg-[#5B16FE] text-white hover:opacity-90'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayImages.map((image, index) => (
              <div 
                key={index}
                className="relative group cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <div className="aspect-w-4 aspect-h-5 rounded-lg overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={400}
                    height={500}
                    className="object-cover transform transition-transform group-hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-4">
            {activeCategory === 'all' ? (
              <button
                onClick={() => setShowAll(!showAll)}
                className="group flex items-center gap-2 px-6 py-3 bg-[#5B16FE] text-white rounded-full hover:opacity-90 transition-all duration-300 transform hover:scale-105"
              >
                {showAll ? (
                  <>
                    Show Less
                    <ChevronUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                  </>
                ) : (
                  <>
                    Explore More
                    <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            ) : (
              <Link href="/login">
                <button 
                  className="group flex items-center gap-2 px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 text-white"
                  style={{
                    background: 'linear-gradient(90deg, #8371FF -39.48%, #A077FE 15.54%, #01C7E4 100%)'
                  }}
                >
                  Generate More
                  <Wand2 className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full h-auto my-auto">
            <div className="relative w-full h-full">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={1200}
                height={1500}
                className="w-full h-auto object-contain max-h-[90vh] rounded-lg"
                priority
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorHeadshotHero; 