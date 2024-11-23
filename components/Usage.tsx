import Image from 'next/image';
import React from 'react';

interface UsageProps {
  backgroundImage: string;
}

const Usage: React.FC<UsageProps> = ({ backgroundImage }) => {
  return (
    <div className="w-full max-w-[1274px] mx-auto">
      <div className="bg-white rounded-[60px] flex flex-col lg:flex-row items-start px-[97px] gap-20">
        {/* Left Image Section */}
        <div className="relative w-full lg:w-[500px] h-[500px] lg:h-[600px] rounded-r-[60px] overflow-hidden">
          <Image
            src={backgroundImage}
            alt="Background showcase"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 500px"
            priority
          />
        </div>

        {/* Right Content Section */}
        <div className="w-full lg:w-[515px]">
          <div className="flex flex-col gap-8 py-12">
            {/* Heading Section */}
            <div className="w-[497px] h-[120px]">
              <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4]
                            uppercase text-sm md:text-base font-medium tracking-wide"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #8371FF -39.48%, #A077FE 15.54%, #01C7E4 100%)'
                  }}>
                USAGE
              </h2>
              <h1 className="font-jakarta text-[48px] leading-[60.48px] font-bold text-transparent bg-clip-text"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #8371FF -39.48%, #A077FE 15.54%, #01C7E4 100%)'
                  }}>
                Create your own beautiful Images.
              </h1>
            </div>
            
            {/* Paragraph Section */}
            <div className="w-[497px] h-[150px]">
              <p className="font-poppins text-[20px] leading-[30px] font-medium text-gray-700">
                Keep it clean and versatile with free white backgrounds! 🤍 Customize them to suit your 
                style or use them as-is for a crisp, minimalist look. Perfect for websites, invitations, 
                or presentations. Pure simplicity – all yours for free!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usage;
