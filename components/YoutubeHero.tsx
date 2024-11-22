import Image from 'next/image'
import Link from 'next/link'
import lock from "@/public/logo/lock.svg"
import circul from "@/public/logo/circul.svg"
import mdi from "@/public/logo/mdi.svg"
import tick from "@/public/logo/tick.svg"
const YoutubeHero = () => {
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

            {/* Updated Main content with AI- moved to first row */}
            <div className="max-w-[733.27px] text-left">
              <h1 className="text-[42px] font-plus-jakarta-sans font-semibold leading-[50.48px]">
                {/* Row 1 */}
                <div>
                  Stand Out on{' '}
                  <span className="bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4] bg-clip-text text-transparent">
                    YouTube AI-
                  </span>
                </div>
                
                {/* Row 2 - Lighter end color */}
                <div>
                  <span className="bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4] bg-clip-text text-transparent">
                    Generated Reaction
                  </span>
                </div>
                
                {/* Row 3 - Removed end color */}
                <div>
                  <span className="bg-gradient-to-r from-[#8371FF] to-[#A077FE] bg-clip-text text-transparent">
                    Thumbnails
                  </span>
                </div>
              </h1>

              <p className="mt-4 text-base sm:text-lg text-[#4B5563] max-w-[733px]">
                Create eye-catching, expressive thumbnails for your YouTube channel that grab viewers' attention and boost engagement.
              </p>

              {/* Updated Features grid */}
              <div className="mt-8 grid grid-cols-2 gap-6 max-w-[500px]">
                <div className="flex items-center gap-2">
                  <Image src={mdi} alt="styles" width={24} height={24} />
                  <span className="text-[#4B5563]">Pick from 150+ styles</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src={circul} alt="time" width={24} height={24} />
                  <span className="text-[#4B5563]">Done in less than 1 hour</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src={lock} alt="protection" width={24} height={24} />
                  <span className="text-[#4B5563]">Strict data protection</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src={tick} alt="guarantee" width={24} height={24} />
                  <span className="text-[#4B5563]">Guaranteed results</span>
                </div>
              </div>

              {/* Updated Button */}
              <button className="mt-8 rounded-full bg-[#4F46E5] px-8 py-4 text-white font-medium flex items-center gap-2 hover:bg-[#4338CA] transition-colors">
                Get Started For Free
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.16666 10H15.8333" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 4.16666L15.8333 10L10 15.8333" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Right side image */}
          <div className="relative h-[500px] w-full mt-8 lg:mt-0">
            <Image
              src="/youtube.svg"
              alt="YouTube thumbnails showcase"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default YoutubeHero
