'use client'
import Link from 'next/link';
import { useState } from 'react';

const HalloColor = () => {
  const [activeCategory, setActiveCategory] = useState('Halloween');
  const [showAll, setShowAll] = useState(false);

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
    { id: 1, src: '/hallo/hbg1.jpg', alt: 'Christmas background 1' },
    { id: 2, src: '/hallo/hbg2.jpg', alt: 'Christmas background 2' },
    { id: 3, src: '/hallo/hbg3.jpg', alt: 'Christmas background 3' },
    { id: 4, src: '/hallo/hbg4.jpg', alt: 'Christmas background 4' },
    { id: 5, src: '/hallo/hbg5.jpg', alt: 'Christmas background 5' },
    { id: 6, src: '/hallo/hbg6.jpg', alt: 'Christmas background 6' },
    { id: 7, src: '/hallo/hbg7.jpg', alt: 'Christmas background 7' },
    { id: 8, src: '/hallo/hbg8.jpg', alt: 'Christmas background 8' },
    { id: 9, src: '/hallo/hbg9.jpg', alt: 'Christmas background 9' },
    { id: 10, src: '/hallo/hbg10.jpg', alt: 'Christmas background 10' },
    { id: 11, src: '/hallo/hbg11.jpg', alt: 'Christmas background 11' },
    { id: 12, src: '/hallo/hbg12.jpg', alt: 'Christmas background 12' },
    { id: 13, src: '/hallo/hbg13.jpg', alt: 'Christmas background 13' },
    { id: 14, src: '/hallo/hbg14.jpg', alt: 'Christmas background 14' },
    { id: 15, src: '/hallo/hbg15.jpg', alt: 'Christmas background 15' },
    { id: 16, src: '/hallo/hbg16.jpg', alt: 'Christmas background 16' },
    { id: 17, src: '/hallo/hbg17.jpg', alt: 'Christmas background 17' },
    { id: 18, src: '/hallo/hbg18.jpg', alt: 'Christmas background 18' },
    { id: 19, src: '/hallo/hbg19.jpg', alt: 'Christmas background 19' },
    { id: 20, src: '/hallo/hbg20.jpg', alt: 'Christmas background 20' },
  ];

  const visibleBackgrounds = showAll ? backgrounds : backgrounds.slice(0, 15);

  return (
    <div className="mt-12">
      <div className="mx-auto w-[1274px] min-h-[1122px] bg-white rounded-[60px] py-12">
        {/* Hero Section */}
        <div className="text-center mb-[60px]">
          <h1 className="text-[40px] font-bold text-gray-900 mb-6">
           Halloween Backgrounds
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Spooky Downloads Await! 🎃 Click to grab eerie Halloween backgrounds and give your screens a festive fright!
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

export default HalloColor;
