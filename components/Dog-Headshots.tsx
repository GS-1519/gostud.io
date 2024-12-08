'use client'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, ChevronUp, Wand2 } from 'lucide-react';

const DogHeadshotHero = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  const [showAll, setShowAll] = useState(false);

  const categories = [
    { name: 'All', value: 'all' }
  ];

  const images = {
    all: [
      { src: '/Packs/Dog/dog1.jpg', alt: 'Adorable dog portrait' },
      { src: '/Packs/Dog/dog2.jpg', alt: 'Cute puppy headshot' },
      { src: '/Packs/Dog/dog3.jpg', alt: 'Charming dog portrait' },
      { src: '/Packs/Dog/dog4.jpg', alt: 'Playful dog photo' },
      { src: '/Packs/Dog/dog5.jpg', alt: 'Sweet dog portrait' },
      { src: '/Packs/Dog/dog6.jpg', alt: 'Delightful puppy headshot' },
      { src: '/Packs/Dog/dog7.jpg', alt: 'Lovely dog portrait' },
      { src: '/Packs/Dog/dog8.jpg', alt: 'Charming pet photo' },
    ]
  };

  const getDisplayImages = () => {
    return images.all;
  };

  const handleModalClose = () => setSelectedImage(null);

  const displayImages = getDisplayImages();

  return (
    <div className="w-full max-w-[1276px] mx-auto bg-white rounded-[24px] sm:rounded-[60px] py-[18px] sm:py-20 px-4 sm:px-8 lg:px-10">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 leading-tight tracking-tight">
            Pawsome Pet Portrait Collection
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transform your furry friend's photos into stunning portraits that capture their unique personality and charm
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayImages.map((image, index) => (
            <div 
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-lg"
              onClick={() => setSelectedImage(image)}
            >
              <div className="aspect-[4/5]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={400}
                  height={500}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4">
          <Link href="/login">
            <button 
              className="group flex items-center gap-2 px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 text-white bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 hover:opacity-90"
            >
              Generate More
              <Wand2 className="w-5 h-5 transition-transform group-hover:rotate-45" />
            </button>
          </Link>
        </div>
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto"
          onClick={handleModalClose}
        >
          <div className="relative max-w-4xl w-full h-auto my-auto" onClick={e => e.stopPropagation()}>
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
                onClick={handleModalClose}
                className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
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

export default DogHeadshotHero; 