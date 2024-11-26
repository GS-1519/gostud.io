'use client'
import Link from 'next/link';
import { useState } from 'react';

const AbstractHero = () => {
  const [activeCategory, setActiveCategory] = useState('Abstract');

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
    { id: 1, src: '/abstract-bg/ab1.jpg', alt: 'White texture background' },
    { id: 2, src: '/abstract-bg/ab2.jpg', alt: 'Broken white surface' },
    { id: 3, src: '/abstract-bg/ab3.jpg', alt: 'White wall texture' },
    { id: 4, src: '/abstract-bg/ab4.jpg', alt: 'White brick wall' },
    { id: 5, src: '/abstract-bg/ab5.jpg', alt: 'White gradient' },
    { id: 6, src: '/abstract-bg/ab6.jpg', alt: 'White plaster texture' },
    { id: 7, src: '/abstract-bg/ab1.jpg', alt: 'White room with wooden floor' },
    { id: 8, src: '/abstract-bg/ab2.jpg', alt: 'White stucco texture' },
    { id: 9, src: '/abstract-bg/ab3.jpg', alt: 'White fabric texture' },
    { id: 10, src: '/abstract-bg/ab6.jpg', alt: 'White waves pattern' },
    { id: 4, src: '/abstract-bg/ab4.jpg', alt: 'White brick wall' },
    { id: 5, src: '/abstract-bg/ab5.jpg', alt: 'White gradient' },
    { id: 6, src: '/abstract-bg/ab6.jpg', alt: 'White plaster texture' },
    { id: 7, src: '/abstract-bg/ab1.jpg', alt: 'White room with wooden floor' },
    { id: 8, src: '/abstract-bg/ab2.jpg', alt: 'White stucco texture' },
  ];

  return (
    <div className="mt-12">
      <div className="mx-auto w-[1274px] min-h-[1122px] bg-white rounded-[60px] py-12">
        {/* Hero Section */}
        <div className="text-center mb-[60px]">
          <h1 className="text-[40px] font-bold text-gray-900 mb-6">
          Abstract Color Backgrounds
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Creative Downloads Await! 🎨 Click to grab stunning abstract backgrounds and add a splash of art to your screens!        </p>
        </div>

        {/* Updated Category Navigation */}
        <div className="flex justify-center mb-[60px]">
          <div className="inline-flex items-center bg-white rounded-full p-2 shadow-sm border">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.path}
              >
                <button
                  className={`
                    px-8 py-3 rounded-full text-base font-medium transition-all duration-200
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

export default AbstractHero;
