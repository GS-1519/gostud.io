'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, ChevronUp, Wand2 } from 'lucide-react';

const ArtisticHeadshotHero = () => {
  const router = useRouter();
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

  const handleGenerateMore = () => {
    // Store the pack info in localStorage before redirecting
    localStorage.setItem('intendedPack', JSON.stringify({
      type: 'artistic',
      path: '/photoshoot-packs/artistic-portraits',
      redirect: true
    }));
    
    // Redirect to login
    router.push('/login');
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4]">
          Avant-Garde Artistic Portrait Collection
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Transform your photos into stunning artistic masterpieces with contemporary and experimental aesthetics
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
            onClick={(e) => handleImageClick(e, image)}
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
          <button 
            onClick={handleGenerateMore}
            className="group flex items-center gap-2 px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 text-white bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4] hover:opacity-90"
          >
            Generate More
            <Wand2 className="w-5 h-5 transition-transform group-hover:rotate-45" />
          </button>
        )}
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