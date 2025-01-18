'use client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import lock from "@/public/logo/lock.svg"
import circul from "@/public/logo/circul.svg"
import mdi from "@/public/logo/mdi.svg"
import tick from "@/public/logo/tick.svg"

const LawyerHero = () => {
  const router = useRouter();
  const t = useTranslations('heroPages.lawyer');
  const featuresT = useTranslations('heroFeatures');

  const features = [
    { icon: mdi, text: featuresT('styles'), key: 'styles' },
    { icon: circul, text: featuresT('delivery'), key: 'delivery' },
    { icon: lock, text: featuresT('protection'), key: 'protection' },
    { icon: tick, text: featuresT('guarantee'), key: 'guarantee' }
  ];

  const handleGetStarted = () => {
    localStorage.setItem('intendedPack', JSON.stringify({
      type: 'lawyer',
      path: '/headshot-packs/lawyer-headshot',
      redirect: true
    }));
    router.push('/login');
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <h1 className="text-[24px] sm:text-[28px] md:text-[36px] lg:text-[40px] font-bold leading-tight flex flex-col gap-1">
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-x-1">
                <span className="text-[#161C2D]">{t('title.part1')}</span>
                <span className="text-[#8371FF]">{t('title.part2')}</span>
              </div>
              <div className="flex flex-wrap justify-center lg:justify-start items-center">
                <span className="text-[#01C7E4]">{t('title.part3')}</span>
                <span className="text-[#161C2D] ml-2">{t('title.part4')}</span>
              </div>
            </h1>

            <p className="text-[#161C2D] text-center lg:text-left text-base sm:text-lg mt-4">
              {t('description')}
            </p>
            
            <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-2 max-w-[600px] mx-auto lg:mx-0">
              {features.map(({ icon, text, key }) => (
                <div key={key} className="flex items-center gap-1.5">
                  <div className="rounded-full p-1 sm:p-1.5 flex-shrink-0">
                    <Image 
                      src={icon} 
                      alt={key} 
                      width={20} 
                      height={20} 
                      className="w-6 h-6 sm:w-7 sm:h-7" 
                    />
                  </div>
                  <span className="text-[#4B5563] text-xs sm:text-sm">
                    {text}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={handleGetStarted}
              className="mt-8 w-fit rounded-full bg-[#5B16FE] px-6 py-3 text-white hover:bg-opacity-90 transition-colors"
            >
              {t('button')}
            </button>
          </div>

          <div className="relative h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] w-full mt-2 lg:mt-0">
            <Image
              src="/lawyer.png"
              alt="Before and after headshots"
              fill
              className="object-contain lg:object-right"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LawyerHero
