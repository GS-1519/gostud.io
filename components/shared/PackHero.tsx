'use client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { HeroConfig } from '@/types/hero-types'
import lock from "@/public/logo/lock.svg"
import circul from "@/public/logo/circul.svg"
import mdi from "@/public/logo/mdi.svg"
import tick from "@/public/logo/tick.svg"
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

// Define the icons type explicitly
const icons: Record<string, any> = {
  mdi,
  circul,
  lock,
  tick,
};

interface PackHeroProps {
  config: HeroConfig;
}

const PackHero = ({ config }: PackHeroProps) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations();

  // Add debug logging
  console.log('Config:', config);
  console.log('Translation test:', {
    gradientTitle: t('heroPacks.birthdayMagic.gradientTitle'),
    features: t('heroPacks.common.features.styles')
  });

  // Add error handling for translations
  const getTranslation = (key: string, fallback: string = '') => {
    try {
      return t(key);
    } catch (error) {
      console.warn(`Translation missing for key: ${key}`);
      return fallback;
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-[200px]" />;
  }

  return (
    <div className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4 lg:gap-6 items-center py-2 sm:py-4">
          <div className="flex flex-col items-center lg:items-start">
            <div className="max-w-[733px] text-center lg:text-left">
              <h1 className="text-[24px] sm:text-[28px] md:text-[36px] lg:text-[40px] font-bold leading-tight flex flex-col gap-1">
                <div className="flex flex-wrap justify-center lg:justify-start items-center">
                  <span className="bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4] bg-clip-text text-transparent">
                    {t(`heroPacks.${config.translationKey}.gradientTitle`)}
                  </span>
                </div>
                <div className="flex flex-wrap justify-center lg:justify-start">
                  <span className="text-[#161C2D]">
                    {t(`heroPacks.${config.translationKey}.normalTitle`)}
                  </span>
                </div>
              </h1>

              <p className="mt-2 sm:mt-4 text-base sm:text-lg text-[#4B5563] max-w-[600px] mx-auto lg:mx-0">
                {t(`heroPacks.${config.translationKey}.description`)}
              </p>

              <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-2 max-w-[600px] mx-auto lg:mx-0">
                {config.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-1.5">
                    <div className="rounded-full p-1 sm:p-1.5 flex-shrink-0">
                      <Image 
                        src={icons[feature.icon] || ''} 
                        alt={feature.icon} 
                        width={20} 
                        height={20} 
                        className="w-6 h-6 sm:w-7 sm:h-7" 
                      />
                    </div>
                    <span className="text-[#4B5563] text-xs sm:text-sm">
                      {feature.textKey ? t(`heroPacks.common.features.${feature.textKey}`) : feature.text}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 sm:mt-6 flex justify-center lg:justify-start">
                <button 
                  onClick={() => {
                    localStorage.setItem('intendedPack', JSON.stringify({
                      type: config.packType,
                      path: config.packPath,
                      redirect: true
                    }));
                    router.push('/login');
                  }}
                  className="w-fit rounded-full bg-[#5B16FE] px-2.5 py-1.5 sm:px-4 sm:py-2.5 lg:px-6 lg:py-3 text-xs sm:text-sm lg:text-base text-white flex items-center justify-center sm:inline-flex gap-2 hover:bg-opacity-90 transition-all"
                >
                  {t(`heroPacks.${config.translationKey}.buttonText`)}
                  <span className="ml-1 sm:ml-2">→</span>
                </button>
              </div>
            </div>
          </div>

          <div className="relative h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] w-full mt-2 lg:mt-0">
            <div className="absolute w-full h-full lg:translate-x-[10%]">
              <Image
                src={config.imagePath}
                alt={config.imageAlt || ''}
                fill
                className="object-contain lg:object-right"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackHero; 