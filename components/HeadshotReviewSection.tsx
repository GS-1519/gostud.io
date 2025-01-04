'use client'
import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import Link from 'next/link';

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

const TestimonialCard = ({ image, text }: { image?: string, text: string }) => (
  <div className="relative p-[1px] rounded-[10px] bg-gradient-to-r from-[rgba(131,113,255,0.4)] via-[rgba(160,119,254,0.4)] to-[rgba(1,199,228,0.4)]">
    <div className="bg-white rounded-[10px] h-full overflow-hidden">
      {image && (
        <div className="relative">
          <img className="h-auto w-full" src={image} alt="Testimonial" />
        </div>
      )}
      <div className="p-4">
        <StarRating />
        <p className="mt-2 text-[14px] leading-[20px] text-[#161C2D]/60 font-poppins">{text}</p>
      </div>
    </div>
  </div>
);

const TestimoniallGrid = () => (
  <div className="bg-white border-b">
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16">
      <div className="text-center pt-8 pb-6 md:py-8">
        <h2 className="text-[24px] sm:text-[32px] md:text-[48px] leading-[36px] sm:leading-[48px] md:leading-[64px] font-medium mb-4 font-poppins text-center">
          <span className="bg-gradient-to-r from-[#8371FF] to-[#A077FE] bg-clip-text text-transparent">
            <AnimatedNumber end={80000} duration={2000} />
          </span>
          {' '}PHOTOS ALREADY CREATED FOR{' '}
          <span className="bg-[#01C7E4] bg-clip-text text-transparent">
            <AnimatedNumber end={21000} duration={2000} />
          </span>
          {' '}HAPPY CUSTOMERS
        </h2>
        <p className="text-[18px] leading-[28px] text-[#161C2D]/60 max-w-[736px] mx-auto font-poppins">
          Not made in a studio. Created by AI. Don't just take our word for it. Our AI turns everyday photos into professional headshots, that reflect your confidence & credibility.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 pb-6 md:pb-8">
        {/* Column #1 */}
        <div className="flex flex-col gap-4 md:gap-8">
          <TestimonialCard 
            image="/testimoniall/img10.png"
            text="The results are stunning and tailored according to me. These AI headshots are next level."
          />
          <TestimonialCard 
            text="I tested the platform with a range of product images, and I was pleased with the outcomes."
          />
          <TestimonialCard 
            image="/testimoniall/img7.png"
            text="Amazing Product Photo generator site ever!"
          />
        </div>

        {/* Column #2 */}
        <div className="flex flex-col gap-4 md:gap-8">
          <TestimonialCard 
            text="As an online retailer, high-quality 
product images are crucial. I uploaded 
a few photos of my jewelry, and the AI 
generated multiple stunning options that 
showcased the pieces beautifully. The 
variety allowed me to select different 
backgrounds and angles to highlight 
my products effectively. "
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
            text="I appreciate how easy this platform is to 
use. I was impressed with how many 
options I received. While most of them 
were great, there were a couple that 
didn't quite capture the product as I 
hoped. However, it's easy to filter through 
and find the best ones. Overall, a fanta-
stic tool that saves me a lot of effort!"
          />
        </div>

        {/* Column #4 */}
        <div className="flex flex-col gap-4 md:gap-8">
          <TestimonialCard 
            image="/testimoniall/img3.png"
            text="The AI is incredibly smart at generating diverse images. It's like having a mini photo studio!"
          />
          <TestimonialCard 
            text="I love how the platform gives several options after uploading a single image. It's easy to pick a style or background that matches my aesthetic. Still, the convenience of multiple results and the overall quality are worth it! It's a time-saver, especially if you need variety for social media."
          />
          <TestimonialCard 
            image="/testimoniall/img5.png"
            text="Very satisfied with the quick service and quality."
          />
        </div>
      </div>

      {/* Join Now section */}
      <div className="flex justify-center mt-8">
        <Link href="/login" className="w-full sm:w-auto">
          <button 
            className="w-[200px] sm:w-[269px] h-[40px] sm:h-[48px] text-white rounded-full flex items-center justify-center gap-2 hover:opacity-90 transition-opacity font-poppins text-[13px] sm:text-[16px] mx-auto"
            style={{
              background: 'linear-gradient(90deg, #8371FF -39.48%, #A077FE 15.54%, #01C7E4 100%)'
            }}
          >
            <span>Create Your Headshot</span>
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
);

export default TestimoniallGrid;