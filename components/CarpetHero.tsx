import Image from 'next/image'
import Link from 'next/link'
import lock from "@/public/logo/lock.svg"
import circul from "@/public/logo/circul.svg"
import mdi from "@/public/logo/mdi.svg"
import tick from "@/public/logo/tick.svg"
const CarpetHero = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-8 sm:py-12">
          <div className="flex flex-col items-center lg:items-start">
            {/* Notification banner - Made responsive */}
            <div className="mb-8 w-full max-w-[408px] overflow-hidden">
              <div 
                className="relative h-[44px] rounded-[148px] w-full"
                style={{
                  background: 'linear-gradient(90deg, #8371FF -39.48%, #A077FE 32.07%, #01C7E4 100%)',
                  padding: '1px'
                }}
              >
                <div className="absolute inset-0 bg-[#ECF9FF] rounded-[148px] m-[1px]">
                  <div className="flex items-center h-full px-[12px] py-[8px] gap-[10px]">
                    <div className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-white">
                      <Image 
                        src="/flex.png" 
                        alt="sparkle" 
                        width={20} 
                        height={20} 
                        className="text-blue-500" 
                      />
                    </div>
                    <div className="w-[341px] h-[20px] overflow-hidden">
                      <p className="text-[12px] leading-[20px] font-poppins font-medium whitespace-nowrap">
                        <span className="bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4] bg-clip-text text-transparent">
                          We just upgraded our Headshot Quality with
                        </span>
                        <span className="font-bold text-[#01C7E4]"> Flux Model!</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main content - Made responsive */}
            <div className="max-w-[733px] text-center lg:text-left">
              <h1 className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-bold leading-tight flex flex-col gap-2">
                {/* First row */}
                <div>
                  <span className="bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4] bg-clip-text text-transparent">
                    Red Carpet Ready
                  </span>
                  <span className="text-[#161C2D]"> AI-</span>
                </div>
                
                {/* Second row */}
                <div>
                  <span className="text-[#161C2D]">Enhanced Glamour Shots</span>
                </div>
              </h1>

              <p className="mt-6 text-[18px] text-[#4B5563]">
              Step into the spotlight with AI-generated headshots that radiate sophistication, elegance, and luxury, just like the stars.              </p>

              {/* Features grid */}
              <div className="mt-8 grid grid-cols-2 gap-2">
                <div className="flex items-center">
                  <div className="rounded-full p-2">
                    <Image src={mdi} alt="mdi" width={20} height={20} />
                  </div>
                  <span className="text-[#4B5563] text-sm">Pick from 150+ styles</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-full  p-2">
                    <Image src={circul} alt="clock" width={20} height={20} />
                  </div>
                  <span className="text-[#4B5563] text-sm">Done in less than 1 hour</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-full  p-2">
                    <Image src={lock} alt="lock" width={20} height={20} />
                  </div>
                  <span className="text-[#4B5563] text-sm">Strict data protection</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-full  p-2">
                    <Image src={tick} alt="tick" width={20} height={20} />
                  </div>
                  <span className="text-[#4B5563] text-sm">Guaranteed results</span>
                </div>
              </div>

              {/* CTA Button */}
              <button className="mt-8 rounded-full bg-[#5B16FE] px-6 py-3 text-white flex items-center gap-2 hover:bg-opacity-90 transition-all">
                Get Started For Free
                <span className="ml-2">→</span>
              </button>
            </div>
          </div>

          {/* Right side image - Made responsive */}
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full mt-8 lg:mt-0">
            <Image
              src="/carpet.png"
              alt="Dating app screenshots"
              fill
              className="object-contain lg:object-right"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarpetHero
