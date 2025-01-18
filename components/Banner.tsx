import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Banner = () => {
  return (
    <div className="relative w-full min-h-[50vh] bg-[#1F2937] flex flex-col items-center justify-center text-center px-4">
      {/* Background Image */}
      <Image
        src="/banner-bg.png"
        alt="Banner background"
        fill
        className="object-cover object-center opacity-10"
        sizes="60vw"
        priority
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto">
        

        {/* Main Heading - with better line breaks and spacing */}
        <h4 className="text-2xl md:text-4xl font-md text-white leading-tight">
          Save <span className="text-[#6D28FF]">87%</span> on your
          professional photos.
          Whenever, wherever you are.
        </h4>

        {/* Subheading - with adjusted spacing */}
        <p className="text-xl md:text-2xl text-gray-300 mt-8 mb-12">
          Get studio-quality, 4K images in a variety of outfits<br />
          & settings in less than an hour.
        </p>

        {/* Button - updated styling */}
        <Link href="/login">
          <Button 
            className="bg-[#6D28FF] hover:bg-[#5B16FE] text-white px-8 py-3 rounded-full text-lg font-medium inline-flex items-center gap-2"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Banner;