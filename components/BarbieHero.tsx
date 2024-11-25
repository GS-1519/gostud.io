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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center py-8 sm:py-12">
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
              <h1 className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-bold leading-tight">
                <span className="bg-[linear-gradient(90deg,_#8371FF_-39.48%,_#A077FE_32.07%)] bg-clip-text text-transparent">
                Iconic Barbie  
                </span>
                {' '}
                <span className="text-[#111827]">
                AI-Generated
                </span>
                {' '}
                <span className="text-[#111827] whitespace-nowrap">
                Headshots with a Playful Twist
                </span>
              </h1>

              <p className="mt-4 text-base sm:text-lg text-[#4B5563]">
                Stand out with AI-generated headshots that embrace striking, vibrant hues to make a bold statement.
              </p>

              {/* Features grid */}
              <div className="mt-8 flex flex-col gap-4 max-w-[600px] mx-auto lg:mx-0">
                <div className="grid grid-cols-2 gap-4 sm:gap-[16px]">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-[#F3E8FF] p-2">
                      <Image src={mdi} alt="mdi" width={16} height={16} className="text-[#8B5CF6]" />
                    </div>
                    <span className="text-[#4B5563] text-sm">Pick from 150+ styles</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-[#F3E8FF] p-2">
                      <Image src={circul} alt="circul" width={16} height={16} className="text-[#8B5CF6]" />
                    </div>
                    <span className="text-[#4B5563] text-sm">Done in less than 1 hr</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 sm:gap-[16px]">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-[#F3E8FF] p-2">
                      <Image src={lock} alt="lock" width={16} height={16} className="text-[#8B5CF6]" />
                    </div>
                    <span className="text-[#4B5563] text-sm">Strict data protection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-[#F3E8FF] p-2">
                      <Image src={tick} alt="tick" width={16} height={16} className="text-[#8B5CF6]" />
                    </div>
                    <span className="text-[#4B5563] text-sm">Guaranteed results</span>
                  </div>
                </div>
              </div>

              {/* Button */}
              <button className="mt-8 rounded-full bg-[#5B16FE] px-6 py-3 text-white flex items-center gap-2 mx-auto lg:mx-0">
                Get Started For Free
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.16666 10H15.8333" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 4.16666L15.8333 10L10 15.8333" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Right image section */}
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full lg:translate-x-12">
            <Image
              src="/barbie.png"
              alt="Birthday portraits showcase"
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

export default BarbieHero;
