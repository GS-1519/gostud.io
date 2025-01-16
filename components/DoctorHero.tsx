'use client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import lock from "@/public/logo/lock.svg"
import circul from "@/public/logo/circul.svg"
import mdi from "@/public/logo/mdi.svg"
import tick from "@/public/logo/tick.svg"

const DoctorHero = () => {
  const router = useRouter()
  const t = useTranslations()

  const handleGetStarted = () => {
    localStorage.setItem('intendedPack', JSON.stringify({
      type: 'doctor',
      path: '/headshot-packs/doctor-headshot',
      redirect: true
    }))
    router.push('/login')
  }

  return (
    <div className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4 lg:gap-6 items-center py-2 sm:py-4">
          <div className="flex flex-col items-center lg:items-start">
            <div className="max-w-[733px] text-center lg:text-left">
              <h1 className="text-[24px] sm:text-[28px] md:text-[36px] lg:text-[40px] font-bold leading-tight flex flex-col gap-1">
                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-x-1">
                  <span className="text-[#161C2D]">{t('heroPages.doctor.title.part1')}</span>
                  <span className="text-[#8371FF]">{t('heroPages.doctor.title.part2')}</span>
                </div>
                <div className="flex flex-wrap justify-center lg:justify-start items-center">
                  <span className="text-[#01C7E4]">{t('heroPages.doctor.title.part3')}</span>
                  <span className="text-[#161C2D] ml-2">{t('heroPages.doctor.title.part4')}</span>
                </div>
              </h1>

              <p className="mt-2 sm:mt-4 text-base sm:text-lg text-[#4B5563] max-w-[600px] mx-auto lg:mx-0">
                {t('heroPages.doctor.description')}
              </p>

              <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-2 max-w-[600px] mx-auto lg:mx-0">
                <div className="flex items-center gap-1.5">
                  <div className="rounded-full p-1 sm:p-1.5 flex-shrink-0">
                    <Image src={mdi} alt="mdi" width={20} height={20} className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <span className="text-[#4B5563] text-xs sm:text-sm">{t('heroFeatures.styles')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="rounded-full p-1 sm:p-1.5 flex-shrink-0">
                    <Image src={circul} alt="clock" width={20} height={20} className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <span className="text-[#4B5563] text-xs sm:text-sm">{t('heroFeatures.delivery')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="rounded-full p-1 sm:p-1.5 flex-shrink-0">
                    <Image src={lock} alt="lock" width={20} height={20} className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <span className="text-[#4B5563] text-xs sm:text-sm">{t('heroFeatures.protection')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="rounded-full p-1 sm:p-1.5 flex-shrink-0">
                    <Image src={tick} alt="tick" width={20} height={20} className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <span className="text-[#4B5563] text-xs sm:text-sm">{t('heroFeatures.guarantee')}</span>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 flex justify-center lg:justify-start">
                <button 
                  onClick={handleGetStarted}
                  className="w-fit rounded-full bg-[#5B16FE] px-2.5 py-1.5 sm:px-4 sm:py-2.5 lg:px-6 lg:py-3 text-xs sm:text-sm lg:text-base text-white flex items-center justify-center sm:inline-flex gap-2 hover:bg-opacity-90 transition-all"
                >
                  {t('heroPages.doctor.button')}
                  <span className="ml-1 sm:ml-2">→</span>
                </button>
              </div>
            </div>
          </div>

          <div className="relative h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] w-full mt-2 lg:mt-0">
            <div className="absolute w-full h-full lg:translate-x-[10%]">
              <Image
                src="/doctor.png"
                alt="Doctor portraits"
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
  )
}

export default DoctorHero
