import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

const Ariaa = () => {
  return (
    <div className="relative w-full min-h-[459px] overflow-hidden bg-gradient-to-b from-gray-900/50 to-gray-900/80">
      {/* Background Image - Show on all screens */}
      <Image
        src="/big.png"
        alt="Banner background"
        fill
        className="object-cover mix-blend-overlay"
        priority
      />

      {/* Single Woman Image - Positioned higher */}
      <div className="absolute left-0 h-full opacity-0 animate-fadeIn
                    w-full flex justify-center items-start pt-8 md:pt-0 md:justify-start" 
        style={{ animation: 'fadeIn 0.5s ease-in forwards' }}>
        <Image
          src="/Awomen.png"
          alt="Woman portrait"
          width={600}
          height={459}
          className="h-[90%] w-auto object-contain"
          priority
        />
      </div>

      {/* Button - Adjusted position */}
      <div className="absolute bottom-12 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <Link href="/login">
          <Button 
            className="bg-[#5B16FE] hover:bg-[#4F46E5] text-white px-8 py-3 rounded-full
                     flex items-center gap-2 group"
          >
            Get Started
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Ariaa;