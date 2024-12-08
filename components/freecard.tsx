import Image from 'next/image';
import React from 'react';

interface FreeCardProps {
  backgroundImage: string;
}

const FreeCard: React.FC<FreeCardProps> = ({ backgroundImage }) => {
  return (
    <div className="w-full max-w-[1274px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-[30px] sm:rounded-[60px] flex flex-col lg:flex-row items-center lg:items-start p-6 sm:p-8 lg:px-[97px] gap-8 lg:gap-20">
        {/* Left Content Section */}
        <div className="w-full lg:w-[515px]">
          <div className="flex flex-col gap-6 lg:gap-8 py-6 lg:py-12">
            {/* Heading Section */}
            <div className="w-full lg:w-[497px]">
              <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4]
                            uppercase text-sm md:text-base font-medium tracking-wide mb-3">
                ALL FOR FREE
              </h3>
              <h2 className="font-jakarta text-[32px] sm:text-[40px] lg:text-[48px] leading-tight lg:leading-[60.48px] font-bold text-transparent bg-clip-text"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #8371FF -39.48%, #A077FE 15.54%, #01C7E4 100%)'
                  }}>
                Free colored Backgrounds
              </h2>
            </div>
            
            {/* Paragraph Section */}
            <div className="w-full lg:w-[497px]">
              <p className="font-poppins text-base sm:text-lg lg:text-[20px] leading-relaxed lg:leading-[30px] font-medium text-gray-700">
                Keep it clean and versatile with free white backgrounds! 🤍 Customize them to suit your 
                style or use them as-is for a crisp, minimalist look. Perfect for websites, invitations, 
                or presentations. Pure simplicity – all yours for free!
              </p>
            </div>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="relative w-full h-[300px] sm:h-[400px] lg:w-[500px] lg:h-[600px] rounded-[30px] lg:rounded-r-[60px] overflow-hidden">
          <Image
            src={backgroundImage}
            alt="Background showcase"
            fill
            className="object-contain"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 500px"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default FreeCard;
