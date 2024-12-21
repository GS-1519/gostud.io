'use client';

import React from 'react';
import Image from 'next/image';

const WhySection = () => {
  const [activeFeature, setActiveFeature] = React.useState(0);

  const features = [
    {
      title: 'Stand Out on LinkedIn',
      description: 'Make a powerful first impression with a professional headshot that boosts your profile views and credibility.',
      isActive: true
    },
    {
      title: 'Make Resumes Shine',
      description: 'Elevate your application with a polished headshot that adds a personal touch and professionalism.',
      isActive: false
    },
    {
      title: 'Events and Conferences',
      description: 'Represent you best self. Use professional headshots for speaker profiles, event directories, or badges.',
      isActive: false
    },
    {
      title: 'Personalize Your Business Cards',
      description: 'Leave a lasting impression with a crisp, professional headshot that reflects your brand.',
      isActive: false
    },
    {
      title: 'Boost Your Online Presence',
      description: 'Use eye-catching photos for platforms like Instagram, Facebook, Twitter even for your dating profiles.',
      isActive: false
    }
  ];

  return (
    <div className="w-full bg-white">
      {/* Mobile Version */}
      <div className="md:hidden w-full max-w-[358px] mx-auto p-4">
        <h1 className="text-center text-2xl font-bold mb-4 font-poppins">
          WHY <span className="bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4] text-transparent bg-clip-text">GOSTUDIO.AI?</span>
        </h1>
        
        <p className="text-center text-gray-600 mb-8">
          Aaria ensures you're ready for every professional moment. From resumes to LinkedIn, we make your headshots shine effortlessly.
        </p>

        <div className="bg-[#F8F7FF] rounded-2xl p-6 mb-6 relative h-[300px] shadow-[16.3px_14.13px_4.35px_0px_#E6DBFF]">
          <Image 
            src="/whyfram.png" 
            alt="Why GoStudio.ai" 
            fill
            className="rounded-lg object-contain"
            priority
          />
        </div>

        <h2 className="text-[#5B16FE] text-xl font-semibold mb-3">
          {features[0].title}
        </h2>
        
        <p className="text-gray-600 mb-6">
          {features[0].description}
        </p>

        <button className="w-full bg-[#7C3AED] text-white rounded-full py-3 flex items-center justify-center gap-2">
          Try Now
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Desktop Version */}
      <div className="hidden md:block max-w-[1440px] mx-auto py-16 px-[120px]">
        <h1 className="w-[304px] h-[48px] text-center mx-auto font-poppins font-medium text-[32px] leading-[48px]">
          WHY <span className="bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4] text-transparent bg-clip-text">GOSTUDIO.AI?</span>
        </h1>
        
        <p className="w-[886.52px] h-[54px] text-center mx-auto font-poppins font-normal text-[18px] leading-[27px] text-[#161C2D] mb-12">
          Aaria ensures you're ready for every professional moment. From resumes to LinkedIn, we make your headshots shine effortlessly.
        </p>

        <div className="flex gap-[100px]">
          {/* Left side - Features */}
          <div className="w-[500px] relative">
            {/* Single continuous background line */}
            <div className="absolute left-[20px] top-0 w-[4px] h-full bg-gray-200 rounded-full" />
            
            {/* Dynamic highlight line */}
            <div 
              className="absolute left-[20px] w-[4px] bg-[#8371FF] rounded-full transition-all duration-300"
              style={{
                top: `${activeFeature * 120}px`,
                height: '120px'
              }}
            />

            {/* Features */}
            <div className="space-y-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="pl-12 cursor-pointer py-4"
                  onClick={() => setActiveFeature(index)}
                >
                  <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                    index === activeFeature ? 'text-[#5B16FE]' : 'text-gray-400'
                  }`}>
                    {feature.title}
                  </h3>
                  <p className={`text-gray-600 transition-opacity duration-300 ${
                    index === activeFeature ? 'opacity-100' : 'opacity-50'
                  }`}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Image */}
          <div className="w-[634px] relative mt-[100px]">
            <div 
              className="w-full h-[472.15px] bg-[#F8F7FF] rounded-[13.04px] p-8 relative"
              style={{
                boxShadow: '16.3px 14.13px 4.35px 0px #E6DBFF'
              }}
            >
              <Image 
                src="/whyfram.png" 
                alt="Why GoStudio.ai" 
                fill
                className="rounded-[13.04px] object-contain"
                priority
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <button className="w-[269px] h-[48px] bg-[#5B16FE] text-white rounded-[49px] px-[25px] py-[12px] flex items-center justify-center gap-[10px] font-poppins">
            Try Now
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhySection;