'use client'
import Link from 'next/link';
import { useState } from 'react';

const BlackHero = () => {
  const [activeCategory, setActiveCategory] = useState('Black');
  const [showAll, setShowAll] = useState(false);

  const categories = [
    { name: 'Black', path: '/tools/black-background' },
    { name: 'Grey', path: '/tools/grey-background' },
    { name: 'White', path: '/tools/white-background' },
    { name: 'Red', path: '/tools/red-background' },
    { name: 'Abstract', path: '/tools/abstract-background' },
    { name: 'Halloween', path: '/tools/halloween-background' },
    { name: 'Christmas', path: '/tools/christmas-background' }
  ];

  const backgrounds = [
    { id: 1, src: '/black-bg/black1.jpg', alt: 'Black texture background' },
    { id: 2, src: '/black-bg/black2.jpg', alt: 'Broken black surface' },
    { id: 3, src: '/black-bg/black3.jpg', alt: 'Black wall texture' },
    { id: 4, src: '/black-bg/black4.jpg', alt: 'Black brick wall' },
    { id: 5, src: '/black-bg/black5.jpg', alt: 'Black gradient' },
    { id: 6, src: '/black-bg/black6.jpg', alt: 'Black plaster texture' },
    { id: 7, src: '/black-bg/black7.jpg', alt: 'Black room with wooden floor' },
    { id: 8, src: '/black-bg/black8.jpg', alt: 'Black stucco texture' },
    { id: 9, src: '/black-bg/black9.jpg', alt: 'Black fabric texture' },
    { id: 10, src: '/black-bg/black10.jpg', alt: 'Black waves pattern' },
    { id: 3, src: '/black-bg/black3.jpg', alt: 'Black wall texture' },
    { id: 4, src: '/black-bg/black4.jpg', alt: 'Black brick wall' },
    { id: 5, src: '/black-bg/black5.jpg', alt: 'Black gradient' },
    { id: 6, src: '/black-bg/black6.jpg', alt: 'Black plaster texture' },
    { id: 7, src: '/black-bg/black7.jpg', alt: 'Black room with wooden floor' },
    
  ];

  // Get visible backgrounds based on showAll state
  const visibleBackgrounds = showAll ? backgrounds : backgrounds.slice(0, 15);

  return (
    <div className="mt-12">
      <div className="mx-auto w-[1274px] min-h-[1122px] bg-white rounded-[60px] py-12">
        {/* Hero Section */}
        <div className="text-center mb-[60px]">
          <h1 className="text-[40px] font-bold text-gray-900 mb-6">
          Black Color Backgrounds
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Stylish Downloads Await! ⚫ Click to grab sleek black, white, and grey backgrounds to elevate your screens with modern elegance!
          </p>
        </div>

        {/* Category Navigation */}
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
            {visibleBackgrounds.map((background) => (
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

export default BlackHero;
