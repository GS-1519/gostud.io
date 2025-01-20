'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'use-intl';

const Banner = () => {
  const t = useTranslations('banner');

  return (
    <div className="relative w-full min-h-[50vh] bg-[#1F2937] flex flex-col items-center justify-center text-center px-4">
     

      <div className="relative z-10 max-w-5xl mx-auto">
        <h4 className="text-2xl md:text-4xl font-md text-white leading-tight">
          {t.rich('heading', {
            discount: (chunks) => <span className="text-[#6D28FF]">{chunks}</span>
          })}
        </h4>

        <p className="text-xl md:text-2xl text-gray-300 mt-8 mb-12">
          {t('subheading.line1')}<br />
          {t('subheading.line2')}
        </p>

        <Link href="/login">
          <Button 
            className="bg-[#6D28FF] hover:bg-[#5B16FE] text-white px-8 py-3 rounded-full text-lg font-medium inline-flex items-center gap-2"
          >
            {t('button')}
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Banner;