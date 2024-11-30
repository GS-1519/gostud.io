import Image from 'next/image'
import Link from 'next/link'
import lock from "@/public/logo/lock.svg"
import circul from "@/public/logo/circul.svg"
import mdi from "@/public/logo/mdi.svg"
import tick from "@/public/logo/tick.svg"
const BarbieHero = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center py-6 sm:py-8 md:py-12">
          <div className="flex flex-col items-center lg:items-start">
            <div className="max-w-[733px] text-center lg:text-left px-2 sm:px-0">
              <h1 className="text-[24px] sm:text-[28px] md:text-[36px] lg:text-[40px] font-bold leading-tight flex flex-col gap-2 sm:gap-3">
                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-x-1">
                  <span className="bg-[linear-gradient(90deg,_#8371FF_-39.48%,_#A077FE_32.07%)] bg-clip-text text-transparent">
                    Iconic Barbie
                  </span>
                  <span className="text-[#161C2D]">AI-</span>
                </div>
                
                <div className="flex flex-wrap justify-center lg:justify-start">
                  <span className="text-[#161C2D] break-words sm:whitespace-nowrap">
                    Generated Headshots with a
                  </span>
                </div>
                <div className="flex flex-wrap justify-center lg:justify-start">
                  <span className="text-[#161C2D] break-words sm:whitespace-nowrap">
                    Playful Twist
                  </span>
                </div>
              </h1>

              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-[#4B5563] max-w-[600px] mx-auto lg:mx-0">
                Stand out with AI-generated headshots that embrace striking, vibrant hues to make a bold statement.
              </p>

              <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-3 sm:gap-4 max-w-[600px] mx-auto lg:mx-0">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-[#F3E8FF] p-1.5 sm:p-2 flex-shrink-0">
                    <Image src={mdi} alt="mdi" width={16} height={16} className="sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-[#4B5563] text-xs sm:text-sm">Pick from 150+ styles</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-[#F3E8FF] p-1.5 sm:p-2 flex-shrink-0">
                    <Image src={circul} alt="clock" width={16} height={16} className="sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-[#4B5563] text-xs sm:text-sm">Done in less than 1hr</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-[#F3E8FF] p-1.5 sm:p-2 flex-shrink-0">
                    <Image src={lock} alt="lock" width={16} height={16} className="sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-[#4B5563] text-xs sm:text-sm">Strict data protection</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-[#F3E8FF] p-1.5 sm:p-2 flex-shrink-0">
                    <Image src={tick} alt="tick" width={16} height={16} className="sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-[#4B5563] text-xs sm:text-sm">Guaranteed results</span>
                </div>
              </div>

              <button className="mt-6 sm:mt-8 w-full sm:w-auto rounded-full bg-[#5B16FE] px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base text-white flex items-center justify-center sm:inline-flex gap-2 hover:bg-opacity-90 transition-all">
                Get Started For Free
                <span className="ml-1 sm:ml-2">→</span>
              </button>
            </div>
          </div>

          <div className="relative h-[250px] sm:h-[350px] md:h-[450px] lg:h-[600px] w-full mt-6 lg:mt-0">
            <Image
              src="/barbie.png"
              alt="Birthday portraits showcase"
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

export default BarbieHero;
