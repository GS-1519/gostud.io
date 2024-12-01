import Image from 'next/image'
import Link from 'next/link'
import lock from "@/public/logo/lock.svg"
import circul from "@/public/logo/circul.svg"
import mdi from "@/public/logo/mdi.svg"
import tick from "@/public/logo/tick.svg"

const AnnieHero = () => {
  return (
    <div className="relative pt-20 sm:pt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-5 items-center py-8 sm:py-8">
          <div className="flex flex-col items-center lg:items-start">
            <div className="max-w-[733px] text-center lg:text-left px-2 sm:px-0">
              <h1 className="text-[24px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-bold leading-tight">
                <div className="bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4] bg-clip-text text-transparent break-words sm:whitespace-nowrap">
                  AI-Generated Photos Inspired
                </div>
                <div className="bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4] bg-clip-text text-transparent break-words">
                  by Annie Leibovitz
                </div>
              </h1>

              <p className="mt-4 sm:mt-6 text-[16px] sm:text-[18px] text-[#4B5563]">
                Capture the joy and excitement of a birthday celebration with vibrant, cheerful headshots, perfect for any occasion.
              </p>
              
              <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-3 sm:gap-4 max-w-[600px] mx-auto lg:mx-0">
                <div className="flex items-center gap-2">
                  <div className="rounded-full  p-1.5 sm:p-2 flex-shrink-0">
                    <Image src={mdi} alt="mdi" width={20} height={20} className="sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-[#4B5563] text-xs sm:text-sm whitespace-nowrap">Pick from 150+ styles</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-full  p-1.5 sm:p-2 flex-shrink-0">
                    <Image src={circul} alt="clock" width={20} height={20} className="sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-[#4B5563] text-xs sm:text-sm whitespace-nowrap">Done in less than 1hr</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-full  p-1.5 sm:p-2 flex-shrink-0">
                    <Image src={lock} alt="lock" width={20} height={20} className="sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-[#4B5563] text-xs sm:text-sm whitespace-nowrap">Strict data protection</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-full  p-1.5 sm:p-2 flex-shrink-0">
                    <Image src={tick} alt="tick" width={20} height={20} className="sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-[#4B5563] text-xs sm:text-sm">Guaranteed results</span>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 flex justify-center lg:justify-start">
                <button className="w-fit rounded-full bg-[#5B16FE] px-2.5 py-1.5 sm:px-4 sm:py-2.5 lg:px-6 lg:py-3 text-xs sm:text-sm lg:text-base text-white flex items-center justify-center sm:inline-flex gap-2 hover:bg-opacity-90 transition-all">
                  Get Started For Free
                  <span className="ml-1 sm:ml-2">→</span>
                </button>
              </div>
            </div>
          </div>

          <div className="relative h-[300px] sm:h-[300px] md:h-[400px] lg:h-[500px] w-full mt-8 lg:mt-0">
            <Image
              src="/annie.png"
              alt="Birthday portraits showcase"
              fill
              className="object-contain object-center lg:object-right"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnnieHero
