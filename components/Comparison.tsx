'use client'
import React from 'react';
import { DollarSign, Clock, Layers, User } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const gradientTextStyle = {
  background: 'linear-gradient(90.21deg, #8371FF 54.14%, #A077FE 77.65%, #01C7E4 99.96%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text'
};

const ComparisonPage = () => {
  const t = useTranslations('Comparison');

  const comparisonData = [
    {
      label: t('items.value.label'),
      icon: DollarSign,
      goStudio: t('items.value.goStudio'),
      studio: t('items.value.studio'),
      iconBg: '#22C55E'
    },
    {
      label: t('items.time.label'),
      icon: Clock,
      goStudio: t('items.time.goStudio'),
      studio: t('items.time.studio'),
      iconBg: '#A855F7'
    },
    {
      label: t('items.variety.label'),
      icon: Layers,
      goStudio: t('items.variety.goStudio'),
      studio: t('items.variety.studio'),
      iconBg: '#F87171'
    },
    {
      label: t('items.choices.label'),
      icon: User,
      goStudio: t('items.choices.goStudio'),
      studio: t('items.choices.studio'),
      iconBg: '#A855F7'
    }
  ];

  return (
    <div className="w-full bg-white">
      {/* Mobile Version */}
      <div className="md:hidden">
        <div className="max-w-[992px] mx-auto px-6 py-8">
          <div className="bg-white">
            <div className="w-[358px] h-auto sm:h-[48px] font-poppins text-[24px] sm:text-[32px] font-[500] leading-[36px] sm:leading-[48px] text-center mx-auto text-[#161C2D] mb-4">
              {t('title')}
            </div>
            <p className="text-center text-[15px] text-gray-600 mb-8 max-w-[320px] mx-auto leading-[1.6]">
              {t('description')}
            </p>

            {/* Column Headers */}
            <div className="grid grid-cols-[1fr,auto,auto] gap-4 mb-6">
              <div></div>
              <div className="text-[16px] font-medium min-w-[100px] bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4] text-transparent bg-clip-text">
                {t('columns.goStudio')}
              </div>
              <div className="text-gray-400 text-[16px] min-w-[100px]">
                {t('columns.studio')}
              </div>
            </div>

            {/* Comparison Items */}
            <div className="space-y-6">
              {comparisonData.map((item, index) => (
                <div 
                  key={index} 
                  className="grid grid-cols-[1fr,auto,auto] gap-4 items-center"
                >
                  {/* Label + Icon */}
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: item.iconBg }}
                    >
                      <item.icon className="text-white" size={16} />
                    </div>
                    <div className="text-[15px] text-gray-900">{item.label}</div>
                  </div>

                  {/* Go Studio Value */}
                  <div className="text-[15px] font-medium text-gray-900 min-w-[100px]">
                    {item.goStudio}
                  </div>

                  {/* Studio Value */}
                  <div className="text-[15px] text-gray-400 min-w-[100px]">
                    {item.studio}
                  </div>
                </div>
              ))}
            </div>

            {/* Button */}
            <Link href="/login">
            <button className="w-full bg-[#5B16FE] text-white rounded-[100px] h-[56px] mt-8 flex items-center justify-center gap-2 text-[16px] font-medium px-8">
              {t('exploreMore')}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5 19L20.5 12L13.5 5M3.5 12H20.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop Version */}
      <div className="hidden md:block max-w-[992px] mx-auto py-16">
        <div className="text-center mb-12">
          <h2 className="w-[358px] h-auto sm:h-[48px] font-poppins text-[24px] sm:text-[32px] font-[500] leading-[36px] sm:leading-[48px] text-center mx-auto text-[#161C2D] mb-4">
            {t('title')}
          </h2>
        </div>

        {/* Desktop Comparison Headers */}
        <div className="grid grid-cols-3 gap-8 mb-8">
          <div></div>
          <div className="text-xl font-semibold bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4] text-transparent bg-clip-text">
            {t('columns.goStudio')}
          </div>
          <div className="text-[#767676] text-xl font-semibold">{t('columns.studio')}</div>
        </div>

        {/* Desktop Comparison Items */}
        <div className="space-y-8">
          {comparisonData.map((item, index) => (
            <div key={index} className="grid grid-cols-3 gap-8 pb-8 border-b border-gray-200 last:border-0">
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: item.iconBg }}
                >
                  <item.icon className="text-white" size={24} />
                </div>
                <span className="text-gray-900 text-xl font-medium">{item.label}</span>
              </div>
              <div className="text-gray-900 text-xl font-medium">
                {item.goStudio}
              </div>
              <div className="text-gray-500 text-xl">
                {item.studio}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Button */}
        <div className="flex justify-center mt-12">
          <button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-8 py-3 rounded-full flex items-center justify-center gap-2 transition-colors">
            {t('exploreMore')}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path 
                d="M5 12H19M19 12L12 5M19 12L12 19" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComparisonPage;