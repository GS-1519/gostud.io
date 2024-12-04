'use client'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, ChevronUp, Wand2 } from 'lucide-react';

const JcrewHeadshotHero = () => {
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
      { src: '/Packs/Jcrew-photos/Women/women1.jpg', alt: 'Professional J.Crew style woman portrait' },
      { src: '/Packs/Jcrew-photos/Women/women2.jpg', alt: 'Fashion-forward woman headshot' },
      { src: '/Packs/Jcrew-photos/Women/women3.jpg', alt: 'Stylish casual woman portrait' },
      { src: '/Packs/Jcrew-photos/Women/women4.jpg', alt: 'Modern preppy woman photo' },
      { src: '/Packs/Jcrew-photos/Women/women5.jpg', alt: 'Contemporary casual woman portrait' },
      { src: '/Packs/Jcrew-photos/Women/women6.jpg', alt: 'Classic style woman headshot' },
      { src: '/Packs/Jcrew-photos/Women/women7.jpg', alt: 'Elegant casual woman portrait' },
      { src: '/Packs/Jcrew-photos/Women/women8.jpg', alt: 'Refined casual woman photo' },
      { src: '/Packs/Jcrew-photos/Women/women9.jpg', alt: 'Modern classic woman portrait' },
    ],
    man: [
      { src: '/Packs/Jcrew-photos/Man/man1.jpg', alt: 'Professional J.Crew style man portrait' },
      { src: '/Packs/Jcrew-photos/Man/man2.jpg', alt: 'Fashion-forward man headshot' },
      { src: '/Packs/Jcrew-photos/Man/man3.jpg', alt: 'Stylish casual man portrait' },
      { src: '/Packs/Jcrew-photos/Man/man4.jpg', alt: 'Modern preppy man photo' },
      { src: '/Packs/Jcrew-photos/Man/man5.jpg', alt: 'Contemporary casual man portrait' },
      { src: '/Packs/Jcrew-photos/Man/man6.jpg', alt: 'Classic style man headshot' },
      { src: '/Packs/Jcrew-photos/Man/man7.jpg', alt: 'Elegant casual man portrait' },
      { src: '/Packs/Jcrew-photos/Man/man8.jpg', alt: 'Refined casual man photo' },
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
    <div className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8 py-12">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-violet-500 to-cyan-400 leading-tight tracking-tight">
              Classic American Style Profile Photos
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Capture your timeless style with professional photos inspired by J.Crew's signature aesthetic
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

export default JcrewHeadshotHero; 