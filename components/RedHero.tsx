'use client'
import Link from 'next/link';
import { useState } from 'react';

const RedHero = () => {
  const [activeCategory, setActiveCategory] = useState('Red');
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
    { id: 11, src: '/white-backgrounds/rough.jpg', alt: 'Rough white surface' },
    { id: 12, src: '/white-backgrounds/paper.jpg', alt: 'White paper texture' },
    { id: 13, src: '/white-backgrounds/silk.jpg', alt: 'White silk texture' },
    { id: 14, src: '/white-backgrounds/curves.jpg', alt: 'White curved pattern' },
    { id: 15, src: '/white-backgrounds/geometric.jpg', alt: 'White geometric pattern' },
  ];

  const visibleBackgrounds = showAll ? backgrounds : backgrounds.slice(0, 15);

  return (
    <div className="mt-12">
      <div className="mx-auto w-[1274px] min-h-[1122px] bg-white rounded-[60px] py-12">
        {/* Hero Section */}
        <div className="text-center mb-[60px]">
          <h1 className="text-[40px] font-bold text-gray-900 mb-6">
            Red Color Backgrounds
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Stylish Downloads Await! 🔴 Click to grab sleek red backgrounds
            to elevate your screens with modern elegance!
          </p>
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
        <div className="flex flex-col items-center px-[97px]">
          <div className="grid grid-cols-5 gap-[8px] w-[1080px] mx-auto">
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
          
          {/* See All Button */}
          {backgrounds.length > 15 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="mt-8 inline-flex items-center px-6 py-3 rounded-full bg-[#5B16FE] text-white font-medium hover:bg-[#5B16FE] transition-colors duration-200"
            >
              {showAll ? 'Show Less' : 'See All'} 
              {!showAll && <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RedHero;
