import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Banner = () => {
  return (
    <div className="relative w-full h-[200px] xs:h-[250px] sm:h-[300px] md:h-[459px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/Topp.png"
        alt="Banner background"
        fill
        className="object-contain xs:object-cover object-center scale-[1.2] xs:scale-100"
        sizes="(max-width: 480px) 480px,
               (max-width: 768px) 768px,
               100vw"
        priority
      />

      {/* Button positioned over the image - moved even lower */}
      <div className="absolute top-[75%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Link href="/login">
          <Button 
                       className="bg-[#5B16FE] hover:bg-[#4F46E5] text-white px-8 py-3 rounded-full"

          >
            Get Started
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Banner;