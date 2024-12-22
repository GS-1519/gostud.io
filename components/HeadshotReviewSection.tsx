'use client'
import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

const StarRating = () => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
    ))}
  </div>
);
const AnimatedNumber = ({ end, duration = 2000 }: { end: number, duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number | null = null;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame ?? 0);
  }, [end, duration]);

  return <>{count.toLocaleString()}</>;
};

const TestimonialCard = ({ image, text }: { image: string, text: string }) => (
  <div 
    className="relative p-[1px] rounded-[10px] bg-gradient-to-r from-[rgba(131,113,255,0.4)] via-[rgba(160,119,254,0.4)] to-[rgba(1,199,228,0.4)]"
  >
    <div className="bg-white rounded-[10px] h-full overflow-hidden">
      {image && (
        <div className="relative">
          <img 
            className="h-auto w-full" 
            src={image} 
            alt="Testimonial" 
          />
        </div>
      )}
      <div className="p-6">
        <StarRating />
        <p className="mt-3 text-[16px] leading-[24px] text-[#161C2D]/60 font-poppins">
          {text}
        </p>
      </div>
    </div>
  </div>
);

const TestimoniallGrid = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 py-8 md:py-16">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-16">
          <h1 className="text-[32px] md:text-[40px] leading-[48px] md:leading-[60px] font-medium mb-4 font-poppins text-center">
            <span className="bg-gradient-to-r from-[#8371FF] to-[#A077FE] bg-clip-text text-transparent font-poppins font-medium text-[40px] leading-[60px] tracking-[-4%]">
              <AnimatedNumber end={80000} duration={2000} />
            </span>
            {' '}PHOTOS ALREADY CREATED FOR{' '}
            <span className="bg-[#01C7E4] bg-clip-text text-transparent font-poppins font-medium text-[40px] leading-[60px] tracking-[-4%]">
              <AnimatedNumber end={21000} duration={2000} />
            </span>
            {' '}HAPPY CUSTOMERS
          </h1>
          <p className="text-[16px] leading-[24px] text-[#161C2D]/60 max-w-[736px] mx-auto font-poppins">
            Not made in a studio. Created by AI. Don't just take our word for it. Our AI turns everyday photos
            into professional headshots, that reflect your confidence & credibility.
          </p>
        </div>

        {/* Testimonial Grid - Updated to show 2 columns by default */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {/* Column #1 */}
          <div className="flex flex-col gap-4 md:gap-8">
            <TestimonialCard 
              image="/testimoniall/img10.png"
              text="The results are stunning and tailored according to me. These AI headshots are next level."
            />
            <TestimonialCard 
              image="/testimoniall/default.png" // Added default image to fix the bug
              text="Perfect for my online store! As an online retailer, high-quality product images are crucial."
            />
            <TestimonialCard 
              image="/testimoniall/img7.png"
              text="Amazing Product Photo generator site ever!"
            />
          </div>

          {/* Column #2 */}
          <div className="flex flex-col gap-4 md:gap-8">
            <TestimonialCard 
              image="/testimoniall/default.png" // Added default image to fix the bug
              text="I love how the platform gives several options after uploading a single image."
            />
            <TestimonialCard 
              image="/testimoniall/img1.png"
              text="A must-have tool for e-commerce!"
            />
            <TestimonialCard 
              image="/testimoniall/img6.png"
              text="Upload once, and you get so many options to pick from."
            />
          </div>

          {/* Column #3 */}
          <div className="flex flex-col gap-4 md:gap-8">
            <TestimonialCard 
              image="/testimoniall/img2.png"
              text="Excellent quality and diversity in photos."
            />
            <TestimonialCard 
              image="/testimoniall/img4.png"
              text="Fast and user-friendly interface. I appreciate how easy this platform is to use."
            />
            <TestimonialCard 
              image="/testimoniall/default.png" // Added default image to fix the bug
              text="The platform exceeds expectations in every way!"
            />
          </div>

          {/* Column #4 */}
          <div className="flex flex-col gap-4 md:gap-8">
            <TestimonialCard 
              image="/testimoniall/img3.png"
              text="The AI is incredibly smart at generating diverse images. It's like having a mini photo studio!"
            />
            <TestimonialCard 
              image="/testimoniall/default.png" // Added default image to fix the bug
              text="I love how the platform gives several options after uploading a single image."
            />
            <TestimonialCard 
              image="/testimoniall/img5.png"
              text="Very satisfied with the quick service and quality."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimoniallGrid;