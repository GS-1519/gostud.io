'use client'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, ChevronUp, Wand2 } from 'lucide-react';

const SaveDateHeadshotHero = () => {
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
      { src: '/Packs/HBD-Date-Save/Girls/women.jpg', alt: 'Elegant save the date woman portrait' },
      { src: '/Packs/HBD-Date-Save/Girls/women1.jpg', alt: 'Elegant save the date woman portrait' },
      { src: '/Packs/HBD-Date-Save/Girls/women2.jpg', alt: 'Romantic female celebration photo' },
      { src: '/Packs/HBD-Date-Save/Girls/women3.jpg', alt: 'Birthday celebration woman portrait' },
      { src: '/Packs/HBD-Date-Save/Girls/women4.jpg', alt: 'Special occasion female photo' },
      { src: '/Packs/HBD-Date-Save/Girls/women5.jpg', alt: 'Celebration style woman portrait' },
      { src: '/Packs/HBD-Date-Save/Girls/women6.jpg', alt: 'Birthday party female headshot' },
      { src: '/Packs/HBD-Date-Save/Girls/women7.jpg', alt: 'Festive woman portrait' },
      { src: '/Packs/HBD-Date-Save/Girls/women8.jpg', alt: 'Celebration moment female photo' },
      { src: '/Packs/HBD-Date-Save/Girls/women9.jpg', alt: 'Birthday celebration portrait' },
      { src: '/Packs/HBD-Date-Save/Girls/women10.jpg', alt: 'Birthday celebration portrait' },
    ],
    man: [
      { src: '/Packs/HBD-Date-Save/Boys/man1.jpg', alt: 'Elegant save the date man portrait' },
      { src: '/Packs/HBD-Date-Save/Boys/man2.jpg', alt: 'Romantic male celebration photo' },
      { src: '/Packs/HBD-Date-Save/Boys/man3.jpg', alt: 'Birthday celebration man portrait' },
      { src: '/Packs/HBD-Date-Save/Boys/man4.jpg', alt: 'Special occasion male photo' },
      { src: '/Packs/HBD-Date-Save/Boys/man5.jpg', alt: 'Celebration style man portrait' },
      { src: '/Packs/HBD-Date-Save/Boys/man6.jpg', alt: 'Birthday party male headshot' },
      { src: '/Packs/HBD-Date-Save/Boys/man7.jpg', alt: 'Festive man portrait' },
      { src: '/Packs/HBD-Date-Save/Boys/man8.jpg', alt: 'Celebration moment male photo' },
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
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 leading-tight tracking-tight">
            Celebration & Save The Date Portraits
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Create stunning portraits perfect for birthdays, save-the-dates, and special celebrations that capture your joyful moments
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

export default SaveDateHeadshotHero; 