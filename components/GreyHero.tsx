'use client'
import Link from 'next/link';
import { useState } from 'react';

const GreyHero = () => {
  const [activeCategory, setActiveCategory] = useState('White');

  const categories = [
    'Black',
    'Grey',
    'White',
    'Red',
    'Abstract',
    'Halloween',
    'Christmas'
  ];

  const backgrounds = [
    { id: 1, src: '/white-backgrounds/texture-1.jpg', alt: 'White texture background' },
    { id: 2, src: '/white-backgrounds/texture-2.jpg', alt: 'Broken white surface' },
    { id: 3, src: '/white-backgrounds/texture-3.jpg', alt: 'White wall texture' },
    { id: 4, src: '/white-backgrounds/brick-wall.jpg', alt: 'White brick wall' },
    { id: 5, src: '/white-backgrounds/gradient.jpg', alt: 'White gradient' },
    { id: 6, src: '/white-backgrounds/plaster.jpg', alt: 'White plaster texture' },
    { id: 7, src: '/white-backgrounds/wooden-floor.jpg', alt: 'White room with wooden floor' },
    { id: 8, src: '/white-backgrounds/stucco.jpg', alt: 'White stucco texture' },
    { id: 9, src: '/white-backgrounds/fabric.jpg', alt: 'White fabric texture' },
    { id: 10, src: '/white-backgrounds/waves.jpg', alt: 'White waves pattern' },
    { id: 11, src: '/white-backgrounds/waves.jpg', alt: 'White waves pattern' },
    { id: 12, src: '/white-backgrounds/waves.jpg', alt: 'White waves pattern' },
    
  ];

  return (
    <div className="mt-12">
      <div className="mx-auto w-[1274px] min-h-[1122px] bg-white rounded-[60px] py-12">
        {/* Hero Section */}
        <div className="text-center mb-[60px]">
          <h1 className="text-[40px] font-bold text-gray-900 mb-6">
          Grey Color Backgrounds
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Stylish Downloads Await! 🌫️ Click to grab sleek grey backgrounds to elevate your screens with modern elegance!          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex justify-center mb-[60px]">
          <div className="inline-flex items-center bg-white rounded-full p-2 shadow-sm border">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`
                  px-8 py-3 rounded-full text-base font-medium transition-all duration-200
                  ${activeCategory === category
                    ? 'bg-violet-600 text-white shadow-md'
                    : 'text-violet-600 hover:bg-gray-50'
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Image Grid */}
        <div className="flex justify-center px-[97px]">
          <div className="grid grid-cols-5 gap-[8px] w-[1080px] h-[640px] mx-auto">
            {backgrounds.map((background) => (
              <div
                key={background.id}
                className="relative group cursor-pointer overflow-hidden rounded-[12px] w-[200px] h-[200px]"
              >
                <img
                  src={background.src}
                  alt={background.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div 
                  className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-[12px]" 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreyHero;
