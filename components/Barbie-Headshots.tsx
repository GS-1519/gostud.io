'use client'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, ChevronUp, Wand2 } from 'lucide-react';

const BarbieHeadshotHero = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  const [showAll, setShowAll] = useState(false);

  const categories = [
    { name: 'All', value: 'all' },
    { name: 'Woman', value: 'woman' }
  ];

  const images = {
    woman: [
      { src: '/Packs/Barbie-photos/Women/women1.jpg', alt: 'Barbie inspired glamour portrait' },
      { src: '/Packs/Barbie-photos/Women/women2.jpg', alt: 'Pink fantasy female headshot' },
      { src: '/Packs/Barbie-photos/Women/women3.jpg', alt: 'Barbie style woman portrait' },
      { src: '/Packs/Barbie-photos/Women/women4.jpg', alt: 'Dreamy pink female portrait' },
      { src: '/Packs/Barbie-photos/Women/women5.jpg', alt: 'Barbie world woman portrait' },
      { src: '/Packs/Barbie-photos/Women/women6.jpg', alt: 'Pink fantasy female portrait' },
      { src: '/Packs/Barbie-photos/Women/women7.jpg', alt: 'Barbie inspired woman headshot' },
      { src: '/Packs/Barbie-photos/Women/women8.jpg', alt: 'Glamorous pink portrait' },
      { src: '/Packs/Barbie-photos/Women/women9.jpg', alt: 'Barbie style female photo' },
      { src: '/Packs/Barbie-photos/Women/women10.jpg', alt: 'Pink fantasy portrait' },
    ]
  };

  const getDisplayImages = () => {
    const allImages = images.woman;
    return showAll ? allImages : allImages.slice(0, 8);
  };

  const displayImages = getDisplayImages();

  const handleImageClick = (e: React.MouseEvent, image: { src: string; alt: string }) => {
    e.stopPropagation();
    setSelectedImage(image);
  };

  const handleModalClose = () => {
    setSelectedImage(null);
  };

  return (
    <div className="w-full max-w-[1276px] mx-auto">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-violet-500 to-cyan-400">
            Barbie Style AI Portrait Photography
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Create playful and iconic Barbie-inspired portraits
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
              key={`${image.src}-${index}`}
              className="relative group cursor-pointer overflow-hidden rounded-lg"
              onClick={(e) => handleImageClick(e, image)}
            >
              <div className="aspect-[4/5] relative">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority={index < 4}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4">
          {activeCategory === 'all' ? (
            <button
              onClick={() => setShowAll(!showAll)}
              className="group flex items-center gap-2 px-6 py-3 bg-[#5B16FE] text-white rounded-full hover:opacity-90 transition-all duration-300"
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
                className="group flex items-center gap-2 px-8 py-3 rounded-full transition-all duration-300 text-white"
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

export default BarbieHeadshotHero; 