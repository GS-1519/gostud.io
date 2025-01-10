'use client'

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import lock from "@/public/logo/lock.svg"
import circul from "@/public/logo/circul.svg"
import mdi from "@/public/logo/mdi.svg"
import tick from "@/public/logo/tick.svg"

interface TwoImageSectionProps {
  leftImage: string;
  rightImage: string;
  title: string;
}

interface FeatureItemProps {
  Icon: any;
  text: string;
}

const FeatureItem = ({ Icon, text }: FeatureItemProps) => (
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-gray-600 md:text-white">
      <Image 
        src={Icon} 
        alt="feature icon" 
        width={32}
        height={32}
        className="text-gray-600 md:text-white w-8 h-8 md:w-10 md:h-10"
      />
    </div>
    <span className="text-gray-600 md:text-white text-sm md:text-base font-poppins">{text}</span>
  </div>
);

const SmallPreviewImages = ({ slides, activeIndex }: { slides: any[], activeIndex: number }) => (
  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-2 z-20">
    {slides.map((_, index) => (
      <div
        key={index}
        className={`h-2 rounded-full transition-all duration-300 ${
          index === activeIndex ? 'w-8 bg-white' : 'w-2 bg-white/50'
        }`}
      />
    ))}
  </div>
);

const TwoImageSection = ({ leftImage, rightImage, title }: TwoImageSectionProps) => (
  <div className="flex-shrink-0 w-full flex h-[50vh] md:h-screen overflow-hidden">
    {/* Mobile and Desktop left image */}
    <div className="relative w-[100vw] md:w-1/2 h-full">
      <div className="relative w-full h-full -mr-[1px]">
        <Image 
          src={leftImage} 
          alt="AI Generated Headshot"
          fill
          quality={100}
          priority
          className="object-cover object-center w-full scale-100 md:scale-108"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute bottom-3 left-4 right-4 md:hidden z-10">
          <div className="font-poppins font-semibold text-white text-[26px] leading-[34px] xs:text-[30px] xs:leading-[38px]">
            {title}
          </div>
        </div>
      </div>
    </div>

    {/* Desktop-only right image */}
    <div className="relative w-1/2 h-full hidden md:block -ml-[1px]">
      <Image 
        src={rightImage} 
        alt="AI Generated Headshot"
        fill
        quality={100}
        priority
        className="object-cover"
        sizes="50vw"
      />
    </div>
  </div>
);

export default function Hero() {
  const t = useTranslations('hero');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);

  const slides = [
    {
      left: "/slider/Image1.png",
      right: "/slider/Image2.png",
      smallLeft: "/slider/small1.png",
      smallRight: "/slider/small2.png"
    },
    {
      left: "/slider/Image3.png",
      right: "/slider/Image4.png",
      smallLeft: "/slider/small3.png",
      smallRight: "/slider/small4.png"
    },
    {
      left: "/slider/Image5.png",
      right: "/slider/Image6.png",
      smallLeft: "/slider/small5.png",
      smallRight: "/slider/small6.png"
    },
    {
      left: "/slider/Image7.png",
      right: "/slider/Image8.png",
      smallLeft: "/slider/small7.png",
      smallRight: "/slider/small8.png"
    },
    {
      left: "/slider/Image9.png",
      right: "/slider/Image10.png",
      smallLeft: "/slider/small9.png",
      smallRight: "/slider/small10.png"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIndex(prev => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 1000);
    }, 7000);

    return () => clearInterval(timer);
  }, [slides.length]);


  return (
    <div className="relative w-full overflow-hidden bg-[#1A1A1A]">
      {/* Mobile View */}
      <div className="block md:hidden">
        <div ref={slideRef} className="relative w-full h-[50vh]">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full transition-all duration-1000 ease-in-out ${
                index === activeIndex ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}
              style={{
                transform: 'translate3d(0, 0, 0)',
                backfaceVisibility: 'hidden',
                willChange: 'opacity'
              }}
            >
              <TwoImageSection
                leftImage={slide.left}
                rightImage={slide.right}
                title={t('title')}
              />
            </div>
          ))}
        </div>

        <div className="bg-white">
          <div className="px-4 py-3 space-y-4 xs:space-y-5">
            <p className="text-gray-600 text-sm xs:text-base leading-[22px]">
              {t('description')}
            </p>

            <div className="grid grid-cols-2 gap-4 text-gray-600">
              <FeatureItem Icon={lock} text={t('features.styles')} />
              <FeatureItem Icon={mdi} text={t('features.delivery')} />
              <FeatureItem Icon={circul} text={t('features.protection')} />
              <FeatureItem Icon={tick} text={t('features.guarantee')} />
            </div>

            <div className="flex justify-center">
              <Link href="/login">
                <button className="w-[200px] sm:w-[269px] h-[40px] sm:h-[48px] bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-full flex items-center justify-center gap-2 hover:opacity-90 transition-opacity font-poppins text-[13px] sm:text-[16px]">
                  <span>{t('tryNow')}</span>
                  <svg className="w-3 sm:w-5 h-3 sm:h-5" viewBox="0 0 20 20" fill="none">
                    <path 
                      d="M4.16666 10H15.8333M15.8333 10L10 4.16669M15.8333 10L10 15.8334" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block relative h-screen">
        <div ref={slideRef} className="absolute inset-0">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === activeIndex ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}
            >
              <TwoImageSection
                leftImage={slide.left}
                rightImage={slide.right}
                title={t('title')}
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 z-10">
          <div className="mx-auto pl-[82px] w-[1440px] mt-[390px] ml-[0.02px]">
            <div className="flex flex-col items-start text-left gap-6">
              <h1 className="font-poppins font-semibold text-white whitespace-nowrap text-[48px] leading-[52px] w-[1012px]">
                {t('title')}
              </h1>
              
              <p className="text-white/90 font-poppins text-lg leading-7 w-[1012px]">
                {t('description')}
              </p>
              
              <div className="grid grid-cols-4 gap-x-6 w-full max-w-[1012px]">
                <FeatureItem Icon={lock} text={t('features.styles')} />
                <FeatureItem Icon={mdi} text={t('features.delivery')} />
                <FeatureItem Icon={circul} text={t('features.protection')} />
                <FeatureItem Icon={tick} text={t('features.guarantee')} />
              </div>

              <Link href="/login">
                <button className="bg-[#5B16FE] hover:bg-[#4F46E5] text-white rounded-full px-8 py-4 font-poppins text-base leading-6 transition-colors">
                  {t('button')}
                </button>
              </Link>
            </div>
          </div>
        </div>

        <SmallPreviewImages slides={slides} activeIndex={activeIndex} />
      </div>
    </div>
  );
}