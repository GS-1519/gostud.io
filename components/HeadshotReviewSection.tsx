'use client'
import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

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

const TestimoniallGrid = () => {
  const t = useTranslations('HeadshotReview');

  const testimonials = [
    // Column 1
    [
      { image: "/testimoniall/img10.png", text: t('testimonials.col1.1') },
      { text: t('testimonials.col1.2') },
      { image: "/testimoniall/img7.png", text: t('testimonials.col1.3') }
    ],
    // Column 2
    [
      { text: t('testimonials.col2.1') },
      { image: "/testimoniall/img1.png", text: t('testimonials.col2.2') },
      { image: "/testimoniall/img6.png", text: t('testimonials.col2.3') }
    ],
    // Column 3
    [
      { image: "/testimoniall/img2.png", text: t('testimonials.col3.1') },
      { image: "/testimoniall/img4.png", text: t('testimonials.col3.2') },
      { text: t('testimonials.col3.3') }
    ],
    // Column 4
    [
      { image: "/testimoniall/img3.png", text: t('testimonials.col4.1') },
      { text: t('testimonials.col4.2') },
      { image: "/testimoniall/img5.png", text: t('testimonials.col4.3') }
    ]
  ];

  return (
    <div className="bg-white border-b">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16">
        <div className="text-center pt-8 pb-6 md:py-8">
          <h2 className="text-[24px] sm:text-[32px] md:text-[48px] leading-[36px] sm:leading-[48px] md:leading-[64px] font-medium mb-4 font-poppins text-center">
            <span className="bg-gradient-to-r from-[#8371FF] to-[#A077FE] bg-clip-text text-transparent">
              <AnimatedNumber end={80000} duration={2000} />
            </span>
            {' '}{t('title.part1')}{' '}
            <span className="bg-[#01C7E4] bg-clip-text text-transparent">
              <AnimatedNumber end={21000} duration={2000} />
            </span>
            {' '}{t('title.part2')}
          </h2>
          <p className="text-[18px] leading-[28px] text-[#161C2D]/60 max-w-[736px] mx-auto font-poppins">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pb-6">
          {testimonials.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-4">
              {column.map((testimonial, index) => (
                <TestimonialCard 
                  key={index}
                  image={testimonial.image}
                  text={testimonial.text}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Link href="/login" className="w-full sm:w-auto">
            <button 
              className="w-[200px] sm:w-[269px] h-[40px] sm:h-[48px] text-white rounded-full flex items-center justify-center gap-2 hover:opacity-90 transition-opacity font-poppins text-[13px] sm:text-[16px] mx-auto"
              style={{
                background: 'linear-gradient(90deg, #8371FF -39.48%, #A077FE 15.54%, #01C7E4 100%)'
              }}
            >
              <span>{t('createButton')}</span>
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
};

export default TestimoniallGrid;