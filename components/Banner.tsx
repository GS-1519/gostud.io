import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Banner = () => {
  return (
    <div className="relative w-full min-h-[200px] xs:min-h-[250px] sm:min-h-[300px] md:h-[459px]">
      {/* Background Image - Enhanced responsive handling */}
      <Image
        src="/Top.png"
        alt="Banner background"
        fill
        className="object-cover object-center"
        sizes="(max-width: 480px) 100vw,
               (max-width: 768px) 100vw,
               100vw"
        priority
      />

      {/* Button Container - Improved mobile positioning */}
      <div className="absolute inset-0 flex items-center justify-center px-3 xs:px-4 sm:px-6 md:px-0">
        <div className="mt-[80px] xs:mt-[100px] sm:mt-[150px] md:mt-[251px] 
                      w-full max-w-[260px] xs:max-w-[280px] sm:max-w-[318px]
                      transition-all duration-300 ease-in-out">
          <Link
            href="/login"
            className="flex items-center justify-center 
                     w-full h-[36px] xs:h-[40px] sm:h-[48px]
                     px-[15px] xs:px-[20px] sm:px-[25px] 
                     py-1.5 xs:py-2 sm:py-3
                     bg-[#5B16FE] text-white 
                     rounded-[52px] 
                     transition-all duration-300
                     hover:bg-[#4910d0] hover:scale-[1.02] 
                     active:scale-[0.98]
                     text-[13px] xs:text-[14px] sm:text-[15px] md:text-[16px] 
                     font-medium
                     shadow-lg hover:shadow-xl 
                     text-center
                     whitespace-nowrap
                     touch-manipulation"
          >
            Get your Headshot Now
          </Link>
        </div>
      </div>

      {/* Gradient Overlay - Optimized for all screen sizes */}
      <div className="absolute inset-0 bg-gradient-to-b 
                      from-transparent 
                      via-[#0B0B0F]/40 xs:via-[#0B0B0F]/30 
                      to-[#0B0B0F]/70 xs:to-[#0B0B0F]/60" 
      />
    </div>
  );
};



export default Banner;