'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { useTranslations } from 'use-intl';

const Ariaa = () => {
  const t = useTranslations('ariaa');
  
  return (
    <div className="relative w-full min-h-[20vh] bg-[#1F2937] flex flex-col items-center justify-center text-center px-4">
      <Image
        src="/banner-bg.png"
        alt={t('bannerAlt')}
        fill
        className="object-cover opacity-40"
        priority
      />

      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between h-full gap-8 md:gap-12">
          <div className="w-full md:w-1/2 flex justify-start -ml-4 md:-ml-8">
            <Image
              src="/Awomen.png"
              alt={t('photographerAlt')}
              width={500}
              height={600}
              className="object-contain"
              priority
            />
          </div>

          <div className="w-full md:w-1/2 text-left space-y-4 md:pl-8">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-md text-white leading-tight">
              {t('heading')}
            </h1>

            <p className="text-sm md:text-base text-gray-300 leading-relaxed">
              {t('description')}
            </p>

            <Link href="/login">
              <Button 
                className="bg-[#6D28FF] hover:bg-[#5B16FE] text-white px-8 py-3 rounded-full 
                         text-lg font-medium inline-flex items-center gap-2 mt-6"
              >
                {t('button')}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ariaa;