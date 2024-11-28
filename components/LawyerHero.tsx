import Image from 'next/image'
import Link from 'next/link'
import lock from "@/public/logo/lock.svg"
import circul from "@/public/logo/circul.svg"
import mdi from "@/public/logo/mdi.svg"
import tick from "@/public/logo/tick.svg"
const LawyerHero = () => {
  return (
    <div className="relative w-[1274px] mx-auto mt-[80px] mb-[80px]">
      <div className="flex gap-[62px] items-start">
        <div className="flex-shrink-0 w-[600px]">
          <div className="mb-6 w-full max-w-[408px] overflow-hidden">
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

          <div className="text-left">
            <div className="text-[48px] font-bold leading-[1.1]">
              <div className="whitespace-nowrap">
                <span className="text-[#111827]">Professional </span>
                <span className="text-[#8371FF]">Lawyer & </span>
                <span className="text-[#01C7E4]">Attorney</span>
              </div>
            </div>
            
            <div className="text-[48px] font-bold mt-2">
              AI Headshots at your Home
            </div>

            <p className="mt-6 text-[18px] text-[#6B7280]">
              Get that polished, effortlessly stylish look with AI-generated headshots that channel the timeless elegance of J.Crew.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
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

            <button className="mt-8 rounded-full bg-[#5B16FE] px-8 py-4 text-white">
              Get Started For Free
              <span className="ml-2">→</span>
            </button>
          </div>
        </div>

        <div className="relative flex-1 h-[500.66px] -mt-[40px]">
          <div className="absolute right-0 w-full h-full">
            <Image
              src="/lawyer.png"
              alt="Before and after headshots"
              fill
              className="object-contain object-right"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LawyerHero;
