import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Ariaa = () => {
  return (
    <div className="relative w-full min-h-[350px] xs:min-h-[400px] md:min-h-[459px] overflow-hidden bg-gradient-to-b from-gray-900/50 to-gray-900/80">
      {/* Background Image with overlay */}
      <Image
        src="/aria.png"
        alt="Banner background"
        fill
        className="object-cover mix-blend-overlay"
        priority
      />

      {/* Content Container - Improved mobile responsiveness */}
      <div className="absolute inset-0 px-4 xs:px-5 sm:px-6 md:px-0 
        flex flex-col justify-center items-center md:items-start md:justify-start
        md:right-[80px] md:top-[60px] md:w-[600px] text-white
        transition-all duration-300 ease-in-out">
        
        {/* Heading - Enhanced mobile typography */}
        <h1 className="w-full max-w-[90%] xs:max-w-[85%] sm:max-w-[80%] md:max-w-[600px] 
          font-['Plus_Jakarta_Sans'] font-bold 
          text-[24px] xs:text-[26px] sm:text-[28px] md:text-[32px] 
          leading-tight md:leading-[40.32px] 
          text-center md:text-left mb-3 md:mb-4
          drop-shadow-lg">
          Meet your AI Photographer who master into creating fabulous photos out of your selfies.
        </h1>
        
        {/* Paragraph - Improved readability on mobile */}
        <p className="w-full max-w-[95%] xs:max-w-[90%] sm:max-w-[85%] md:max-w-[580px] 
          opacity-90 font-['Poppins'] font-medium 
          text-[13px] xs:text-[14px] sm:text-[15px] md:text-[16px] 
          leading-relaxed md:leading-[24px] tracking-[-0.02em] 
          mt-3 xs:mt-4 
          text-center md:text-left
          drop-shadow-md">
          Hello Folks! I'm Aaria, your AI photographer at GoStudio.ai. I've helped over 21,000 
          awesome people like you creating headshots and portraits that truly stand out. 
          Whether you're looking to update your LinkedIn, design a business card, or just level up 
          your online presence, I've got you covered. Let me take care of the details so you can 
          shine with professional-quality results, effortlessly!
        </p>

        {/* Button - Improved mobile layout and touch targets */}
        <div className="w-full mt-6 xs:mt-7 md:mt-6 flex justify-center md:justify-start">
          <Link 
            href="/login"
            className="inline-flex items-center justify-center 
              w-[95%] xs:w-[90%] sm:w-[80%] md:w-[318px] 
              h-[44px] xs:h-[46px] md:h-[48px] 
              px-4 xs:px-[25px] py-3 
              bg-[#5B16FE] text-white rounded-[59px] 
              font-['Poppins'] font-semibold 
              text-[14px] xs:text-[15px] md:text-[16px] 
              leading-[24px] tracking-[-0.04em] 
              transition-all duration-300 ease-in-out
              hover:bg-[#4910d0] hover:scale-[1.02] active:scale-[0.98] 
              shadow-lg hover:shadow-xl
              touch-manipulation"
          >
            Generate Now
            <svg className="ml-2 xs:ml-6 md:ml-10 w-5 h-5 transition-transform group-hover:translate-x-1" 
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Overlay Woman Image - Added responsive visibility */}
      <div className="hidden md:block absolute left-0 h-full opacity-0 animate-fadeIn" 
        style={{ top: '0', animation: 'fadeIn 0.5s ease-in forwards' }}>
        <Image
          src="/Awomen.png"
          alt="Woman portrait"
          width={500}
          height={459}
          className="h-full w-auto object-contain"
          priority
        />
      </div>
    </div>
  );
};


export default Ariaa;