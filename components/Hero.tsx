'use client'
import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import lock from "@/public/logo/lock.svg"
import circul from "@/public/logo/circul.svg"
import mdi from "@/public/logo/mdi.svg"
import tick from "@/public/logo/tick.svg"
import AI from "@/public/logo/AI.svg"
import Link from 'next/link';

interface HeadshotCardProps {
  imageUrl: string;
}

const HeadshotCard: React.FC<HeadshotCardProps> = ({ imageUrl }) => (
  <div className="w-[120px] h-[180px] sm:w-[162px] sm:h-[246px] rounded-[12px] sm:rounded-[18.69px] overflow-hidden flex-shrink-0 relative">
    <Image src={imageUrl} alt="AI Headshot" layout="fill" objectFit="cover" />
    <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
      <Image src={AI} alt="AI Logo" width={60} height={16} className="w-[60px] h-[16px] sm:w-[90px] sm:h-[25px]" />
    </div>
  </div>
);

interface FeatureItemProps {
  Icon: string;
  text: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ Icon, text }) => (
  <div className="flex items-center space-x-2">
    <Image src={Icon} alt="Feature icon" width={20} height={20} className="w-5 h-5 sm:w-6 sm:h-6" />
    <span className="text-xs sm:text-sm text-gray-700 font-poppins">{text}</span>
  </div>
);

export default function Hero() {
  const headshots = [
    "/Carosal/image1.svg",
    "/Carosal/image2.svg",
    "/Carosal/image3.svg",
    "/Carosal/image4.svg",
    "/Carosal/image5.svg",
    "/Carosal/image6.svg",
    "/Carosal/image7.svg",
    "/Carosal/image8.svg",
  ];

  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const scrollWidth = carousel.scrollWidth;
    let scrollPosition = 0;

    const scroll = () => {
      scrollPosition += 3;
      if (scrollPosition >= scrollWidth / 2) {
        scrollPosition = 0;
        carousel.scrollLeft = 0;
      } else {
        carousel.scrollLeft = scrollPosition;
      }
    };

    const intervalId = setInterval(scroll, 30);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] flex flex-col items-center justify-between bg-gray-100 px-4 py-8 sm:px-6 lg:px-8 font-poppins">
      <div className="text-center w-full max-w-[982px] flex flex-col justify-center items-center gap-4 sm:gap-6 mt-6 sm:mt-8">
        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold leading-tight font-jakarta px-4 whitespace-nowrap">
          {/* Professional Headshots with {' '} */}
          <span style={{
            background: 'linear-gradient(90deg, #4C6FFF 0%, #62CDFF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Professional Headshots & Photography
          </span>
        </h1>
        <p className="text-sm sm:text-base lg:text-xl text-gray-600 leading-relaxed max-w-[800px] px-4">
        Look your best on LinkedIn and social media. Turn your selfies into 
        professional headshots in minutes—no studio visit needed.
        </p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-4 sm:gap-8 w-full max-w-[967px] mt-6 sm:mt-8 px-4">
        <FeatureItem Icon={mdi} text="50+ professional styles" />
        <FeatureItem Icon={circul} text="Results in 30 minutes" />
        <FeatureItem Icon={lock} text="100% Private & Secure" />
        <FeatureItem Icon={tick} text="Money-back Guarantee" />
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 w-full mt-6 sm:mt-8 px-4">
        <Link href="/login">
          <button className="w-full sm:w-[269px] h-[48px] rounded-[50px] bg-[#5B16FE] text-white font-semibold hover:bg-opacity-90 transition-colors duration-300 px-6 sm:px-[25px] py-3 sm:py-[12px] flex items-center justify-center gap-2 sm:gap-[10px] text-sm sm:text-base">
            Get Started
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </Link>
      </div>
      
      <div className="relative w-screen overflow-hidden mt-8 sm:mt-12">
        <div 
          ref={carouselRef} 
          className="flex w-full h-[180px] sm:h-[246px] gap-[12px] sm:gap-[24px] overflow-x-hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {[...headshots, ...headshots].map((url, index) => (
            <HeadshotCard key={index} imageUrl={url} />
          ))}
        </div>
        <div className="absolute top-0 left-0 w-[50px] sm:w-[100px] h-full bg-gradient-to-r from-blue-50 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[50px] sm:w-[100px] h-full bg-gradient-to-l from-blue-50 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
}
