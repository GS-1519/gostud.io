import Image from 'next/image'
import Link from 'next/link'
import lock from "@/public/logo/lock.svg"
import circul from "@/public/logo/circul.svg"
import mdi from "@/public/logo/mdi.svg"
import tick from "@/public/logo/tick.svg"
const HealthHero = () => {
  return (
    <div className="relative overflow-visible">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start py-8 sm:py-12">
          <div className="flex flex-col items-start pr-4">
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
            <div className="max-w-[733.27px]">
              <h1 className="text-[28px] sm:text-[40px] font-[300] leading-[40px] sm:leading-[55.48px] font-plus-jakarta-sans">
                <div className="bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4] bg-clip-text text-transparent">
                  <div className="flex flex-col">
                    <span className="whitespace-nowrap font-bold">Your Path to Wellness AI-</span>
                    <span className="whitespace-nowrap font-bold">Inspired Healthy & Fit Portraits</span>
                  </div>
                </div>
              </h1>

              <p className="mt-4 text-[#4B5563] max-w-[600px]">
                Capture the essence of vitality with AI-generated images 
                that inspire health and fitness.
              </p>

              {/* Features grid - Updated for mobile layout */}
              <div className="mt-8 flex flex-col gap-4 max-w-[600px] mx-auto lg:mx-0">
                <div className="grid grid-cols-2 gap-4 sm:gap-[16px]">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full  p-2">
                      <Image src={mdi} alt="mdi" width={25} height={16} className="text-[#8B5CF6]" />
                    </div>
                    <span className="text-[#4B5563] text-sm">Pick from 150+ styles</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full  p-2">
                      <Image src={circul} alt="circul" width={25} height={16} className="text-[#8B5CF6]" />
                    </div>
                    <span className="text-[#4B5563] text-sm">Done in less than 1 hr</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 sm:gap-[16px]">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full  p-2">
                      <Image src={lock} alt="lock" width={25} height={16} className="text-[#8B5CF6]" />
                    </div>
                    <span className="text-[#4B5563] text-sm">Strict data protection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full  p-2">
                      <Image src={tick} alt="tick" width={25} height={16} className="text-[#8B5CF6]" />
                    </div>
                    <span className="text-[#4B5563] text-sm">Guaranteed results</span>
                  </div>
                </div>
              </div>

              {/* Button - Made responsive */}
              <button className="mt-8 rounded-full bg-[#5B16FE] px-6 py-3 text-white flex items-center gap-2 mx-auto lg:mx-0">
                Get Started For Free
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.16666 10H15.8333" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 4.16666L15.8333 10L10 15.8333" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="relative h-[500px] w-[90%] ml-auto">
              <Image
                src="/Fit.png"
                alt="Fitness photos"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HealthHero
