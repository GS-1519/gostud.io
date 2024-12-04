'use client'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, ChevronUp, Wand2 } from 'lucide-react';

const ArtisticHeadshotHero = () => {
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
      { src: '/Packs/Artistic-photos/Women/women1.jpg', alt: 'Creative artistic woman portrait' },
      { src: '/Packs/Artistic-photos/Women/women2.jpg', alt: 'Abstract female portrait' },
      { src: '/Packs/Artistic-photos/Women/women3.jpg', alt: 'Experimental woman headshot' },
      { src: '/Packs/Artistic-photos/Women/women4.jpg', alt: 'Contemporary art female portrait' },
      { src: '/Packs/Artistic-photos/Women/women5.jpg', alt: 'Modern art woman portrait' },
      { src: '/Packs/Artistic-photos/Women/women6.jpg', alt: 'Avant-garde female headshot' },
      { src: '/Packs/Artistic-photos/Women/women7.jpg', alt: 'Creative portrait woman' },
      { src: '/Packs/Artistic-photos/Women/women8.jpg', alt: 'Artistic female photo' },
      { src: '/Packs/Artistic-photos/Women/women9.jpg', alt: 'Abstract art woman portrait' },
      { src: '/Packs/Artistic-photos/Women/women10.jpg', alt: 'Abstract art woman portrait' },
      { src: '/Packs/Artistic-photos/Women/women11.jpg', alt: 'Abstract art woman portrait' },
    ],
    man: [
      { src: '/Packs/Artistic-photos/Man/man1.jpg', alt: 'Creative artistic man portrait' },
      { src: '/Packs/Artistic-photos/Man/man2.jpg', alt: 'Abstract male portrait' },
      { src: '/Packs/Artistic-photos/Man/man3.jpg', alt: 'Experimental man headshot' },
      { src: '/Packs/Artistic-photos/Man/man4.jpg', alt: 'Contemporary art male portrait' },
      { src: '/Packs/Artistic-photos/Man/man5.jpg', alt: 'Modern art man portrait' },
      { src: '/Packs/Artistic-photos/Man/man6.jpg', alt: 'Avant-garde male headshot' },
      { src: '/Packs/Artistic-photos/Man/man7.jpg', alt: 'Creative portrait man' },
    ]
  };

  const getDisplayImages = () => {
    if (activeCategory === 'all') {
      const maxLength = Math.max(images.woman.length, images.man.length);
      const alternatingImages = [];
      
      for (let i = 0; i < maxLength; i++) {
        if (images.woman[i]) alternatingImages.push(images.woman[i]);
        if (images.man[i]) alternatingImages.push(images.man[i]);
      }
      
      return showAll ? alternatingImages : alternatingImages.slice(0, 8);
    }
    
    return images[activeCategory as keyof typeof images]?.slice(0, showAll ? undefined : 8) || [];
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
    <div className="w-full max-w-[1276px] mx-auto bg-white rounded-[24px] sm:rounded-[60px] py-[18px] sm:py-20 px-4 sm:px-8 lg:px-10">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-violet-500 to-cyan-400 leading-tight tracking-tight">
            Avant-Garde Artistic Portrait Collection
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transform your photos into stunning artistic masterpieces with contemporary and experimental aesthetics
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

export default ArtisticHeadshotHero; 