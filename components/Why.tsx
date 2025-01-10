'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const WhySection = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const t = useTranslations('Why');

  const features = [
    {
      title: t('features.linkedin.title'),
      description: t('features.linkedin.description'),
      isActive: true,
      image:'/logos/img1.png' 
    },
    {
      title: t('features.resume.title'),
      description: t('features.resume.description'),
      isActive: false,
      image:'/logos/img2.png'
    },
    {
      title: t('features.events.title'),
      description: t('features.events.description'),
      isActive: false,
      image:'/logos/img3.png'
    },
    {
      title: t('features.business.title'),
      description: t('features.business.description'),
      isActive: false,
      image:'/logos/img4.png' 
    },
    {
      title: t('features.online.title'),
      description: t('features.online.description'),
      isActive: false,
      image:'/logos/img5.png'
    }
  ];

  return (
    <div className="w-full bg-white">
      {/* Mobile Version */}
      <div className="md:hidden w-full max-w-[358px] mx-auto p-4">
        <div className="text-center text-2xl font-bold mb-4 font-poppins">
          <span>{t('title.why')}</span>{' '}
          <span className="bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4] text-transparent bg-clip-text">
            {t('title.gostudio')}
          </span>
        </div>
        
        <p className="text-center text-gray-600 mb-8">
          {t('description')}
        </p>

        <div className="bg-[#F8F7FF] rounded-2xl p-6 mb-6 relative h-[300px]">
          <Image 
            src={features[activeFeature].image}
            alt={features[activeFeature].title}
            fill
            className="rounded-lg object-contain transition-opacity duration-500"
            priority
          />
        </div>

        <h3 className="text-[#5B16FE] text-xl font-semibold mb-3">
          {features[activeFeature].title}
        </h3>
        
        <p className="text-gray-600 mb-6">
          {features[activeFeature].description}
        </p>

        {/* Carousel Navigation */}
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={() => setActiveFeature((prev) => (prev > 0 ? prev - 1 : features.length - 1))}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            aria-label="Previous feature"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex gap-2">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveFeature(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeFeature 
                    ? 'bg-[#5B16FE] w-4' 
                    : 'bg-gray-300'
                }`}
                aria-label={`Go to feature ${index + 1}`}
              />
            ))}
          </div>

          <button 
            onClick={() => setActiveFeature((prev) => (prev < features.length - 1 ? prev + 1 : 0))}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            aria-label="Next feature"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <Link href="/login">
        <button className="w-full bg-[#7C3AED] text-white rounded-full py-3 flex items-center justify-center gap-2">
          {t('tryNow')}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        </Link>
      </div>

      {/* Desktop Version */}
      <div className="hidden md:block max-w-[1440px] mx-auto py-16 px-[120px]">
        <h2 className="text-center mx-auto font-poppins font-medium text-[32px] leading-[48px]">
          <span>{t('title.why')}</span>{' '}
          <span className="bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4] text-transparent bg-clip-text">
            {t('title.gostudio')}
          </span>
        </h2>
        
        <p className="w-[886.52px] h-[54px] text-center mx-auto font-poppins font-normal text-[18px] leading-[27px] text-[#161C2D] mb-12">
          {t('description')}
        </p>

        <div className="flex gap-[100px]">
          {/* Left side - Features */}
          <div className="w-[500px] relative">
            {/* Single continuous background line */}
            <div className="absolute left-[20px] top-0 w-[4px] h-full bg-gray-200 rounded-full" />
            
            {/* Dynamic highlight line */}
            <div 
              className="absolute left-[20px] w-[4px] bg-[#8371FF] rounded-full transition-all duration-300"
              style={{
                top: `${activeFeature * 120}px`,
                height: '120px'
              }}
            />

            {/* Features */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="pl-12 cursor-pointer py-3"
                  onClick={() => setActiveFeature(index)}
                >
                  <h3 className={`text-xl font-semibold mb-1 transition-colors duration-300 ${
                    index === activeFeature ? 'text-[#5B16FE]' : 'text-gray-400'
                  }`}>
                    {feature.title}
                  </h3>
                  <p className={`text-gray-600 transition-opacity duration-300 ${
                    index === activeFeature ? 'opacity-100' : 'opacity-50'
                  }`}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Image */}
          <div className="w-[634px] relative mt-[100px]">
            <div 
              className="w-full h-[472.15px] bg-[#F8F7FF] rounded-[13.04px] p-8 relative"
            >
              <Image 
                src={features[activeFeature].image}
                alt={features[activeFeature].title}
                fill
                className="rounded-[13.04px] object-contain transition-opacity duration-500"
                priority
              />
            </div>
          </div>
        </div>
        <Link href="/login">
        <div className="flex justify-center mt-12">
          <button className="w-[269px] h-[48px] bg-[#5B16FE] text-white rounded-[49px] px-[25px] py-[12px] flex items-center justify-center gap-[10px] font-poppins">
            {t('tryNow')}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        </Link>
      </div>
    </div>
  );
};

export default WhySection;