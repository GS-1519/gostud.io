'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const SecurityFeature = ({ icon, titleKey, descriptionKey }: { 
  icon: string, 
  titleKey: string, 
  descriptionKey: string 
}) => {
  const t = useTranslations('DataSecurity');
  
  return (
    <div className="flex flex-row items-start gap-4 sm:gap-6 text-left">
      <div className="w-[80px] h-[80px] sm:w-[107.81px] sm:h-[107.81px] flex items-center justify-center flex-shrink-0">
        <Image 
          src={icon}
          alt={t(titleKey)}
          width={107}
          height={107}
          className="w-full h-full"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-poppins font-bold text-[18px] sm:text-[20px] leading-[28px]">
          {t(titleKey)}
        </h3>
        <p className="font-poppins font-normal text-[14px] sm:text-[16px] leading-[21px] sm:leading-[24px] text-[#161C2D]/60">
          {t(descriptionKey)}
        </p>
      </div>
    </div>
  );
};

const DataSecuritySection = () => {
  const t = useTranslations('DataSecurity');

  const features = [
    {
      icon: '/logos/Border.png',
      titleKey: 'features.noSelling.title',
      descriptionKey: 'features.noSelling.description'
    },
    {
      icon: '/logos/lock.png',
      titleKey: 'features.control.title',
      descriptionKey: 'features.control.description'
    },
    {
      icon: '/logos/text.png',
      titleKey: 'features.autoDeletion.title',
      descriptionKey: 'features.autoDeletion.description'
    },
    {
      icon: '/logos/Group.png',
      titleKey: 'features.security.title',
      descriptionKey: 'features.security.description'
    }
  ];

  return (
    <div className="w-full bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-16 py-8 sm:py-16">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-14">
          <h2 className="text-[24px] sm:text-[32px] leading-[36px] sm:leading-[48px] font-poppins font-medium mb-3 sm:mb-4">
            {t('title')}
          </h2>
          <p className="text-[14px] sm:text-[16px] leading-[21px] sm:leading-[24px] font-poppins font-normal text-[#161C2D]/60">
            {t('subtitle.line1')}
            <br />
            {t('subtitle.line2')}
          </p>
        </div>

        {/* Features Grid */}
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

export default DataSecuritySection;