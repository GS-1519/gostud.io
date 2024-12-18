'use client'

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import lock from "@/public/logo/lock.svg"
import circul from "@/public/logo/circul.svg"
import mdi from "@/public/logo/mdi.svg"
import tick from "@/public/logo/tick.svg"

interface TwoImageSectionProps {
  leftImage: string;
  rightImage: string;
}

interface FeatureItemProps {
  Icon: any;
  text: string;
}

const FeatureItem = ({ Icon, text }: FeatureItemProps) => (
  <div className="flex items-center gap-2">
    <div className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-gray-600">
      <Image 
        src={Icon} 
        alt="feature icon" 
        width={20}
        height={20}
        className="text-gray-600" // Adding gray color to match paragraph
      />
    </div>
    <span className="text-gray-600 text-sm md:text-base font-poppins">{text}</span>
  </div>
);

const TwoImageSection = ({ leftImage, rightImage }: TwoImageSectionProps) => (
  <div className="flex-shrink-0 w-full flex">
    {/* Mobile and Desktop left image */}
    <div className="relative w-full md:w-1/2">
      <div className="relative w-full aspect-square md:h-screen">
        <Image 
          src={leftImage} 
          alt="AI Generated Headshot"
          fill
          quality={100}
          priority
          className="object-cover"
        />
        {/* Title overlay for mobile */}
        <div className="absolute bottom-8 left-4 right-4 md:hidden z-10">
          <h1 className="font-poppins font-semibold text-white text-[32px] leading-[40px]">
            Professional Headshots<br />
            using your Selfies.
          </h1>
        </div>
      </div>
    </div>

    {/* Desktop-only right image */}
    <div className="relative hidden md:block w-1/2 h-screen">
      <Image 
        src={rightImage} 
        alt="AI Generated Headshot"
        fill
        quality={100}
        priority
        className="object-cover"
      />
    </div>
  </div>
);

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);

  const slides = [
    {
      left: "/slider/Image1.png",
      right: "/slider/Image2.png"
    },
    {
      left: "/slider/Image3.png",
      right: "/slider/Image4.png"
    },
    {
      left: "/slider/Image5.png",
      right: "/slider/Image6.png"
    },
    {
      left: "/slider/Image7.png",
      right: "/slider/Image8.png"
    },
    {
      left: "/slider/Image9.png",
      right: "/slider/Image10.png"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Mobile View */}
      <div className="md:hidden">
        {/* Carousel */}
        <div 
          ref={slideRef}
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${activeIndex * 100}%)`
          }}
        >
          {slides.map((slide, index) => (
            <TwoImageSection
              key={index}
              leftImage={slide.left}
              rightImage={slide.right}
            />
          ))}
        </div>

        {/* Mobile Content Section */}
     {/* Mobile Content Section */}
{/* Mobile Content Section */}
<div className="bg-white">
  <div className="px-4 py-6 space-y-6">
    <p className="text-gray-600 text-base leading-[24px]">
      Stand out on LinkedIn, Twitter, with recruiters. Upload your selfies and receive 
      hundreds of professional headshots all from your favorite AI photographer "Aaria".
    </p>

    <div className="grid grid-cols-2 gap-4 text-gray-600">
      <FeatureItem Icon={lock} text="150+ styles" />
      <FeatureItem Icon={mdi} text="1 hour delivery" />
      <FeatureItem Icon={circul} text="Data Protection" />
      <FeatureItem Icon={tick} text="Money-back" />
    </div>

    <Link href="/get-started" className="block">
      <button className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-full py-3.5 font-poppins text-base transition-colors">
        Try Now →
      </button>
    </Link>
  </div>
</div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        {/* Carousel */}
        <div 
          ref={slideRef}
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${activeIndex * 100}%)`
          }}
        >
          {slides.map((slide, index) => (
            <TwoImageSection
              key={index}
              leftImage={slide.left}
              rightImage={slide.right}
            />
          ))}
        </div>

        {/* Desktop Content */}
        <div className="absolute inset-0">
          <div className="mx-auto pl-[82px] w-[1440px] h-[362px] mt-[446px] ml-[0.02px]">
            <div className="flex flex-col items-start text-left space-y-6">
              <h1 className="font-poppins font-semibold text-white whitespace-nowrap text-[48px] leading-[52px] w-[1012px] h-[52px]">
                Professional Headshots using your Selfies
              </h1>
              
              <p className="text-white/90 font-poppins text-lg leading-7 w-[1012px]">
                Stand out on LinkedIn, Twitter, with recruiters. Upload your selfies and receive 
                hundreds of professional headshots all from your favorite AI photographer "Aaria".
              </p>
              
              <div className="grid grid-cols-4 gap-x-6 w-full max-w-[1012px] mt-6">
                <FeatureItem Icon={lock} text="150+ styles and outfits" />
                <FeatureItem Icon={mdi} text="Results within 1 hour" />
                <FeatureItem Icon={circul} text="Strict Data Protection" />
                <FeatureItem Icon={tick} text="Moneyback Guarantee" />
              </div>

              <Link href="/get-started">
                <button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-full px-6 py-3 font-poppins text-base leading-6 transition-colors mb-10">
                  Get Started →
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 space-x-2 z-20">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'w-8 bg-white' : 'w-2 bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}