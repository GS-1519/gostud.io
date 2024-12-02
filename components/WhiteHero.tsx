'use client'
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import ImageModal from './ImageModal';

const WhiteHero = () => {
  const [activeCategory, setActiveCategory] = useState('White');
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  const categories = [
    { name: 'Black', path: '/free-tools/background-library/black-background' },
    { name: 'Grey', path: '/free-tools/background-library/grey-background' },
    { name: 'White', path: '/free-tools/background-library/white-background' },
    { name: 'Red', path: '/free-tools/background-library/red-background' },
    { name: 'Abstract', path: '/free-tools/background-library/abstract-background' },
    { name: 'Halloween', path: '/free-tools/background-library/halloween-background' },
    { name: 'Christmas', path: '/free-tools/background-library/christmas-background' }
  ];

  const backgrounds = [
    { id: 1, src: '/white-back/white1.jpg', alt: 'White texture background' },
    { id: 2, src: '/white-back/white2.jpg', alt: 'Broken white surface' },
    { id: 3, src: '/white-back/white3.jpg', alt: 'White wall texture' },
    { id: 4, src: '/white-back/white4.jpg', alt: 'White brick wall' },
    { id: 5, src: '/white-back/white5.jpg', alt: 'White gradient' },
    { id: 6, src: '/white-back/white6.jpg', alt: 'White plaster texture' },
    { id: 7, src: '/white-back/white7.jpg', alt: 'White room with wooden floor' },
    { id: 8, src: '/white-back/white8.jpg', alt: 'White stucco texture' },
    { id: 9, src: '/white-back/white9.jpg', alt: 'White fabric texture' },
    { id: 10, src: '/white-back/white10.jpg', alt: 'White waves pattern' },
    { id: 11, src: '/white-back/white11.jpg', alt: 'Rough white surface' },
    { id: 12, src: '/white-back/white12.jpg', alt: 'White paper texture' },
    { id: 13, src: '/white-back/white13.jpg', alt: 'White silk texture' },
    { id: 14, src: '/white-back/white14.jpg', alt: 'White curved pattern' },
    { id: 15, src: '/white-back/white15.jpg', alt: 'White geometric pattern' },
    
  ];

  return (
    <div className="mt-[100px] w-full min-h-screen bg-white rounded-[30px] sm:rounded-[60px] p-8 sm:p-12">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-[60px] px-4">
          <h1 className="text-[32px] sm:text-[40px] font-bold text-gray-900 mb-4 sm:mb-6">
            Professional White Backgrounds
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Download premium white backgrounds for your product photography and professional presentations. 
            Choose from various textures, patterns, and styles - all free to use! 🤍
          </p>
        </div>

        {/* Category Navigation */}
        <div className="mb-8 sm:mb-12">
          <div className="flex justify-start sm:justify-center overflow-x-auto no-scrollbar">
            <div className="inline-flex items-center bg-white rounded-full p-1.5 shadow-sm border">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.path}
                  className="shrink-0"
                >
                  <button
                    className={`
                      px-4 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-200 whitespace-nowrap
                      ${activeCategory === category.name
                        ? 'bg-violet-600 text-white shadow-md'
                        : 'text-violet-600 hover:bg-gray-50'
                      }
                    `}
                  >
                    {category.name}
                  </button>
                </Link>
              ))}
            </div>
          </div>

          <style jsx global>{`
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .no-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {backgrounds.map((background) => (
            <figure
              key={background.id}
              className="relative group cursor-pointer overflow-hidden rounded-[12px] w-full aspect-square"
              onClick={() => setSelectedImage(background)}
            >
              <Image
                src={background.src}
                alt={background.alt}
                width={200}
                height={200}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
              <figcaption className="sr-only">{background.alt}</figcaption>
              <div 
                className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-[12px]" 
                aria-hidden="true"
              />
            </figure>
          ))}
        </div>

        {/* Modal */}
        {selectedImage && (
          <ImageModal
            isOpen={!!selectedImage}
            onClose={() => setSelectedImage(null)}
            imageUrl={selectedImage.src}
            altText={selectedImage.alt}
          />
        )}
      </div>
    </div>
  );
};

export default WhiteHero;
