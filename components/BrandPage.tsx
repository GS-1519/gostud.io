'use client';

import React from 'react';

interface Brand {
  id: number;
  name: string;
  logo: string;
  width: number;
}

const BrandingPage = () => {
  // Brand data with specified widths for each logo
  const brands: Brand[] = [
    {
      id: 1,
      name: 'Shopify',
      logo: '/shopify.svg',
      width: 160
    },
    {
      id: 2,
      name: 'eBay',
      logo: '/ebay.svg',
      width: 140
    },
    {
      id: 3,
      name: 'Stack Overflow',
      logo: '/stackoverflow.svg',
      width: 200
    },
    {
      id: 4,
      name: 'Box',
      logo: '/box.svg',
      width: 120
    },
    {
      id: 5,
      name: 'Berkeley',
      logo: '/berkeley.svg',
      width: 180
    },
    {
      id: 6,
      name: 'Printify',
      logo: '/printify.svg',
      width: 140
    },
    {
      id: 7,
      name: 'Garanty',
      logo: '/garanty.svg',
      width: 150
    },
    {
      id: 8,
      name: 'Mixtiles',
      logo: '/mixtiles.svg',
      width: 140
    },
    {
      id: 9,
      name: 'Vistoprint',
      logo: '/vistoprint.svg',
      width: 150
    },
    {
      id: 10,
      name: 'Rappi',
      logo: '/rappi.svg',
      width: 130
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
          <div className="relative w-[1440px] h-[185px] mx-auto">
            {/* Main Scrolling Container */}
            <div className="absolute top-0 left-0 w-full h-full flex items-center">
              {/* First set of brands */}
              <div className="flex animate-marquee items-center gap-16 whitespace-nowrap">
                {brands.map((brand) => (
                  <div 
                    key={brand.id}
                    className="flex-shrink-0 flex items-center justify-center"
                    style={{ width: `${brand.width}px` }}
                  >
                    <img
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      className="h-8 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
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
                    style={{ width: `${brand.width}px` }}
                  >
                    <img
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      className="h-8 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
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