'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

// Curved Arrow Component
const CurvedArrow = ({ rotation, style }: { rotation: number; style: React.CSSProperties }) => {
  return (
    <svg 
      width="51.99" 
      height="55.79" 
      viewBox="0 0 52 56" 
      style={{ 
        transform: `rotate(${rotation}deg)`,
        ...style 
      }}
    >
      <path
        d="M25.995 0C11.641 0 0 11.641 0 25.995c0 14.354 11.641 25.995 25.995 25.995"
        stroke="url(#gradient)"
        strokeWidth="3"
        fill="none"
      />
      <path
        d="M38 40l-12 12M38 52l-12-12"
        stroke="url(#gradient)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8371FF" />
          <stop offset="50%" stopColor="#A077FE" />
          <stop offset="100%" stopColor="#01C7E4" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const HeadshotSteps = () => {
  const t = useTranslations('ExplainerSection');
  const params = useParams();
  const locale = params?.locale as string;
  const isRTL = locale === 'ar';
  const imageBoxStyle = "w-[90px] h-[90px] rounded-[16px] border border-gray-100 overflow-hidden flex items-center justify-center bg-white shadow-sm relative";

  return (
    <div className={`w-full bg-white ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="pt-[80px] pb-[24px]">
        <h2 className="font-poppins text-[24px] sm:text-[32px] leading-[36px] sm:leading-[48px] font-medium text-center mb-[80px]">
          {t('title')}
        </h2>

        <div className="flex flex-col md:flex-row justify-between items-start gap-[24px] relative px-4 md:px-[82px]">
          {/* Step 1 */}
          <div className="w-full md:w-[424px]">
            <div className="relative w-full aspect-[2/1] mb-8">
              <Image 
                src="/team/Frame2.png"
                alt="First set of profile images"
                fill
                className="object-contain"
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-poppins text-[21.2px] leading-[24.74px] font-medium">
                <span className="block text-[28.27px] mb-2">01</span>
                {t('step1.title')}
              </h3>
              <p className="text-gray-600 text-base leading-relaxed mb-8">
                {t('step1.description')}
              </p>
              <Link href="/login" className="block">
                <button className="w-[269px] h-[48px] rounded-[37px] bg-[#5B16FE] hover:bg-[#4912d0] text-white px-[25px] py-[12px] font-medium flex items-center justify-center gap-[10px]">
                  <span>{t('tryNow')}</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </Link>
            </div>
          </div>

          {/* Step 2 */}
          <div className="w-full md:w-[424px]">
            <div 
              className="bg-[#F8FAFC] rounded-2xl p-12 h-[459px] flex flex-col justify-center relative overflow-hidden"
              style={{
                backgroundImage: 'url(/step.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="relative z-10">
                <h3 className="font-poppins text-[21.2px] leading-[24.74px] font-medium text-white">
                  <span className="block text-[28.27px] mb-2">02</span>
                  {t('step2.title')}
                </h3>
                <p className="w-[330.08px] h-[72px] text-white font-poppins text-[15.9px] leading-[23.85px] font-normal">
                  {t('step2.description')}
                </p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="w-full md:w-[424px]">
            <div className="relative w-full aspect-[2/1] mb-8">
              <Image 
                src="/team/Frame1.png"
                alt="Second set of profile images"
                fill
                className="object-contain"
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-poppins text-[21.2px] leading-[24.74px] font-medium">
                <span className="block text-[28.27px] mb-2">03</span>
                {t('step3.title')}
              </h3>
              <p className="text-gray-600 text-base leading-relaxed mb-8">
                {t('step3.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadshotSteps;