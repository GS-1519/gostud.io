import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Banner = () => {
  return (
    <div className="relative w-full min-h-[250px] sm:min-h-[300px] md:h-[459px]">
      {/* Background Image */}
      <Image
        src="/Top.png"
        alt="Banner background"
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority
      />

      {/* Button Container */}
      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 md:px-0">
        <div className="mt-[100px] sm:mt-[150px] md:mt-[251px] w-full max-w-[280px] sm:max-w-[318px]">
          <Link 
            href="/login"
            className="flex items-center justify-center w-full h-[40px] sm:h-[48px] 
              px-[20px] sm:px-[25px] py-2 sm:py-3 
              bg-[#5B16FE] text-white rounded-[52px] transition-all duration-300 
              hover:bg-[#4910d0] hover:scale-[1.02] active:scale-[0.98] 
              text-[14px] sm:text-[15px] md:text-[16px] font-medium 
              shadow-lg hover:shadow-xl text-center
              whitespace-nowrap"
          >
            Get your Headshot Now
          </Link>
        </div>
      </div>

      {/* Gradient Overlay - Made darker for better text visibility on mobile */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0B0F]/30 to-[#0B0B0F]/60" />
    </div>
  );
};

export default Banner;