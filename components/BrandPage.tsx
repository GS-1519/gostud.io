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
    <div className="min-h-screen bg-white">
      <section className="relative w-full">
        {/* Header Title Container */}
        <div className="w-full max-w-[459px] mx-auto text-center mb-16 pt-16">
          <h2 className="text-[32px] font-poppins font-[500] leading-[48px] text-[#161C2D]">
            BRAND WHO LOVES GOSUDIO
          </h2>
        </div>

        {/* Brand Logo Slider Container */}
        <div className="w-full bg-[#F6F2FF] overflow-hidden">
          <div className="relative w-[1440px] h-[250px] mx-auto"> {/* Increased height to accommodate larger logos */}
            {/* Main Scrolling Container */}
            <div className="absolute top-0 left-0 w-full h-full flex items-center">
              {/* First set of brands */}
              <div className="flex animate-marquee items-center gap-16 whitespace-nowrap">
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

              {/* Duplicate set for seamless scrolling */}
              <div className="flex animate-marquee items-center gap-16 whitespace-nowrap">
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
      </section>
    </div>
  );
};

export default BrandingPage;