'use client';

import React from 'react';

interface Brand {
  id: number;
  name: string;
  logo: string;
  width: number;
  height: number;
}

const BrandingPage = () => {
  // Brand data with specified dimensions for each logo
  const brands: Brand[] = [
    {
      id: 1,
      name: 'Shopify',
      logo: '/logo/AI.svg',
      width: 307,
      height: 83
    },
    {
      id: 2,
      name: 'eBay',
      logo: '/logo/ebay.svg',
      width: 307,
      height: 83
    },
    {
      id: 4,
      name: 'Box',
      logo: '/logo/Ber.svg',
      width: 307,
      height: 83
    },
    {
      id: 5,
      name: 'Berkeley',
      logo: '/logo/Box.svg',
      width: 307,
      height: 83
    },
    {
      id: 6,
      name: 'Printify',
      logo: '/logo/Dell.svg',
      width: 307,
      height: 83
    },
    {
      id: 10,
      name: 'Rappi',
      logo: '/logo/Ncr.svg',
      width: 307,
      height: 83
    }
  ];

  return (
    <div className="w-full bg-white">
      
      <div className="w-full bg-[#F6F2FF] overflow-hidden mb-12">
        <div className="relative w-[1440px] h-[90px] mx-auto">
          <div className="absolute top-0 left-0 w-full h-full flex items-center">
            {/* First set of brands */}
            <div className="flex animate-marquee items-center gap-12 whitespace-nowrap">
              {brands.map((brand) => (
                <div 
                  key={brand.id}
                  className="flex-shrink-0 flex items-center justify-center"
                  style={{ 
                    width: `${brand.width}px`,
                    height: `${brand.height}px`
                  }}
                >
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    width={brand.width}
                    height={brand.height}
                  />
                </div>
              ))}
            </div>

            {/* Duplicate set */}
            <div className="flex animate-marquee items-center gap-12 whitespace-nowrap">
              {brands.map((brand) => (
                <div 
                  key={`${brand.id}-duplicate`}
                  className="flex-shrink-0 flex items-center justify-center"
                  style={{ 
                    width: `${brand.width}px`,
                    height: `${brand.height}px`
                  }}
                >
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    width={brand.width}
                    height={brand.height}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandingPage;