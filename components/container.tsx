'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SecurityFeature = ({ icon, title, description }: { icon: string, title: string, description: string }) => (
  <div className="flex flex-row items-start gap-4 sm:gap-6 text-left">
    <div className="w-[80px] h-[80px] sm:w-[107.81px] sm:h-[107.81px] flex items-center justify-center flex-shrink-0">
      <Image 
        src={icon}
        alt={title}
        width={107}
        height={107}
        className="w-full h-full"
      />
    </div>
    <div className="flex-1">
      <h3 className="font-poppins font-bold text-[18px] sm:text-[20px] leading-[28px] sm:leading-[30px] text-[#161C2D] uppercase mb-2">
        {title}
      </h3>
      <p className="font-poppins font-normal text-[14px] sm:text-[16px] leading-[21px] sm:leading-[24px] text-[#161C2D]/60">
        {description}
      </p>
    </div>
  </div>
);

const DataSecuritySection = () => {
  const features = [
    {
      icon: '/logos/Border.png',
      title: "NO DATA SELLING, NO SHARING",
      description: "We will never sell your data or share with the third party websites."
    },
    {
      icon: '/logos/lock.png',
      title: "YOUR PHOTOS, YOUR CONTROL",
      description: "We won't use your photos to train AI without your permissions."
    },
    {
      icon: '/logos/text.png',
      title: "AUTO DELETION OF DATA",
      description: "The system automatically deletes all your images after 90 days. You choose to keep the setting your way."
    },
    {
      icon: '/logos/Group.png',
      title: "TOP-NOTCH SECURITY",
      description: "We encrypt all sensitive user data. We use industry's best trusted software for your data."
    }
  ];

  return (
    <div className="w-full bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-16 py-8 sm:py-16">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-14">
          <h2 
            className="text-[24px] sm:text-[32px] leading-[36px] sm:leading-[48px] font-poppins font-medium mb-3 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4]"
          >
            WE VALUE DATA PRIVACY
          </h2>
          <p className="text-[14px] sm:text-[16px] leading-[21px] sm:leading-[24px] font-poppins font-normal text-[#161C2D]/60">
            Trusted by Fortune 500 Leaders and Top professionals
            <br />
            Reputed enterprise organizations and teams trust us with their data
          </p>
        </div>

        {/* Features Grid - Single column on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-x-20 sm:gap-y-12 mb-8 sm:mb-12">
          {features.map((feature, index) => (
            <SecurityFeature
              key={index}
              {...feature}
            />
          ))}
        </div>

        {/* Create Button */}
        <div className="flex justify-center mt-8">
          <Link href="/login" className="w-full sm:w-auto">
            <button 
              className="w-full sm:w-auto px-4 sm:px-6 py-3 text-white rounded-full flex items-center justify-center gap-2 hover:opacity-90 transition-opacity font-poppins font-medium"
              style={{
                background: 'linear-gradient(90deg, #8371FF -39.48%, #A077FE 15.54%, #01C7E4 100%)'
              }}
            >
              <span className="text-[14px] sm:text-[16px]">Create Your Headshot</span>
              <svg className="w-4 sm:w-5 h-4 sm:h-5" viewBox="0 0 20 20" fill="none">
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

export default DataSecuritySection;