'use client'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, ChevronUp, Wand2 } from 'lucide-react';

const BotanicalHeadshotHero = () => {
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
      { src: '/Packs/Botnical-photos/Women/women1.jpg', alt: 'Natural botanical woman portrait' },
      { src: '/Packs/Botnical-photos/Women/women2.jpg', alt: 'Garden-inspired female headshot' },
      { src: '/Packs/Botnical-photos/Women/women3.jpg', alt: 'Floral woman portrait' },
      { src: '/Packs/Botnical-photos/Women/women4.jpg', alt: 'Nature-themed female portrait' },
      { src: '/Packs/Botnical-photos/Women/women5.jpg', alt: 'Botanical style woman portrait' },
      { src: '/Packs/Botnical-photos/Women/women6.jpg', alt: 'Garden beauty female headshot' },
      { src: '/Packs/Botnical-photos/Women/women7.jpg', alt: 'Natural elegance woman portrait' },
      { src: '/Packs/Botnical-photos/Women/women8.jpg', alt: 'Floral inspired female photo' },
      { src: '/Packs/Botnical-photos/Women/women9.jpg', alt: 'Botanical garden portrait' },
      { src: '/Packs/Botnical-photos/Women/women10.jpg', alt: 'Botanical garden portrait' },
      { src: '/Packs/Botnical-photos/Women/women11.jpg', alt: 'Botanical garden portrait' },
      { src: '/Packs/Botnical-photos/Women/women12.jpg', alt: 'Botanical garden portrait' },
    ],
    man: [
      { src: '/Packs/Botnical-photos/Man/man1.jpg', alt: 'Natural botanical man portrait' },
      { src: '/Packs/Botnical-photos/Man/man2.jpg', alt: 'Garden-inspired male headshot' },
      { src: '/Packs/Botnical-photos/Man/man3.jpg', alt: 'Nature man portrait' },
      { src: '/Packs/Botnical-photos/Man/man4.jpg', alt: 'Botanical themed male portrait' },
      { src: '/Packs/Botnical-photos/Man/man5.jpg', alt: 'Garden style man portrait' },
      { src: '/Packs/Botnical-photos/Man/man6.jpg', alt: 'Natural male headshot' },
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
    <div className="w-full max-w-[1276px] mx-auto bg-white rounded-[24px] sm:rounded-[60px] py-[18px] sm:py-20 px-4 sm:px-8 lg:px-10">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 leading-tight tracking-tight">
            Botanical Garden Portrait Collection
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transform your photos into enchanting portraits with natural elements and botanical aesthetics that capture the beauty of nature
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
                className="group flex items-center gap-2 px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 text-white bg-gradient-to-r from-purple-500 via-violet-500 to-cyan-400 hover:opacity-90"
              >
                Generate More
                <Wand2 className="w-5 h-5 transition-transform group-hover:rotate-45" />
              </button>
            </Link>
          )}
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

export default BotanicalHeadshotHero; 