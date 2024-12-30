'use client'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, ChevronUp, Wand2 } from 'lucide-react';

const FitnessHeadshotHero = () => {
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
      { src: '/Packs/Fitness-photos/Women/women1.jpg', alt: 'Dynamic fitness woman portrait' },
      { src: '/Packs/Fitness-photos/Women/women2.jpg', alt: 'Athletic female headshot' },
      { src: '/Packs/Fitness-photos/Women/women3.jpg', alt: 'Strong woman portrait' },
      { src: '/Packs/Fitness-photos/Women/women4.jpg', alt: 'Energetic female photo' },
      { src: '/Packs/Fitness-photos/Women/women5.jpg', alt: 'Powerful woman portrait' },
      { src: '/Packs/Fitness-photos/Women/women6.jpg', alt: 'Fit female headshot' },
      { src: '/Packs/Fitness-photos/Women/women7.jpg', alt: 'Active woman portrait' },
      { src: '/Packs/Fitness-photos/Women/women8.jpg', alt: 'Sporty female photo' },
      { src: '/Packs/Fitness-photos/Women/women9.jpg', alt: 'Sporty female photo' },
      { src: '/Packs/Fitness-photos/Women/women10.jpg', alt: 'Sporty female photo' },
      { src: '/Packs/Fitness-photos/Women/women11.jpg', alt: 'Sporty female photo' },
      { src: '/Packs/Fitness-photos/Women/women12.jpg', alt: 'Sporty female photo' },
    ],
    man: [
      { src: '/Packs/Fitness-photos/Man/man1.jpg', alt: 'Dynamic fitness man portrait' },
      { src: '/Packs/Fitness-photos/Man/man2.jpg', alt: 'Athletic male headshot' },
      { src: '/Packs/Fitness-photos/Man/man3.jpg', alt: 'Strong man portrait' },
      { src: '/Packs/Fitness-photos/Man/man4.jpg', alt: 'Energetic male photo' },
      { src: '/Packs/Fitness-photos/Man/man5.jpg', alt: 'Powerful man portrait' },
      { src: '/Packs/Fitness-photos/Man/man6.jpg', alt: 'Fit male headshot' },
      { src: '/Packs/Fitness-photos/Man/man7.jpg', alt: 'Active man portrait' },
      { src: '/Packs/Fitness-photos/Man/man8.jpg', alt: 'Sporty male photo' },
      { src: '/Packs/Fitness-photos/Man/man9.jpg', alt: 'Sporty male photo' },
      { src: '/Packs/Fitness-photos/Man/man10.jpg', alt: 'Sporty male photo' },
      { src: '/Packs/Fitness-photos/Man/man11.jpg', alt: 'Sporty male photo' },
    ]
  };

  const getDisplayImages = () => {
    if (activeCategory === 'all') {
      // Combine and alternate between women and men images
      const maxLength = Math.max(images.woman.length, images.man.length);
      const alternatingImages = [];
      
      for (let i = 0; i < maxLength; i++) {
        // Add woman image if available
        if (images.woman[i]) {
          alternatingImages.push(images.woman[i]);
        }
        // Add man image if available
        if (images.man[i]) {
          alternatingImages.push(images.man[i]);
        }
      }
      
      return showAll ? alternatingImages : alternatingImages.slice(0, 8);
    }
    
    // For woman or man category, return filtered images
    return showAll 
      ? images[activeCategory as keyof typeof images] || []
      : (images[activeCategory as keyof typeof images] || []).slice(0, 8);
  };

  const displayImages = getDisplayImages();

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4]">
          Dynamic Fitness Portrait Collection
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Transform your photos into powerful fitness portraits that showcase your strength, energy, and athletic spirit
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-16">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => {
              setActiveCategory(category.value);
              setShowAll(false);
            }}
            className={`px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
              activeCategory === category.value
                ? 'bg-purple-600 text-white hover:bg-purple-700'
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
            key={`${image.src}-${index}`}
            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            onClick={() => setSelectedImage(image)}
          >
            <div className="relative w-full h-[400px]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
                priority={index < 2}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4 mt-24">
        {activeCategory === 'all' ? (
          <button
            onClick={() => setShowAll(!showAll)}
            className="group flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            {showAll ? (
              <>
                Show Less
                <ChevronUp className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
              </>
            ) : (
              <>
                Explore More
                <ChevronDown className="w-5 h-5 transition-transform group-hover:translate-y-1" />
              </>
            )}
          </button>
        ) : (
          <Link href="/login">
            <button 
              className="group flex items-center gap-2 px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 text-white bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4] hover:opacity-90"
            >
              Generate More
              <Wand2 className="w-5 h-5 transition-transform group-hover:rotate-45" />
            </button>
          </Link>
        )}
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

export default FitnessHeadshotHero; 