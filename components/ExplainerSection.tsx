import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// Removed Instagram import due to error

// Curved Arrow Component
const CurvedArrow = ({ rotation, style }: { rotation: number; style: React.CSSProperties }) => {
  return (
    <svg 
      width="51.99" 
      height="55.79" 
      viewBox="0 0 52 56" 
      style={{ 
        transform: `rotate(${rotation}deg)`,
        ...style 
      }}
    >
      <path
        d="M25.995 0C11.641 0 0 11.641 0 25.995c0 14.354 11.641 25.995 25.995 25.995"
        stroke="url(#gradient)"
        strokeWidth="3"
        fill="none"
      />
      <path
        d="M38 40l-12 12M38 52l-12-12"
        stroke="url(#gradient)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8371FF" />
          <stop offset="50%" stopColor="#A077FE" />
          <stop offset="100%" stopColor="#01C7E4" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const HeadshotSteps = () => {
  const imageBoxStyle = "w-[90px] h-[90px] rounded-[16px] border border-gray-100 overflow-hidden flex items-center justify-center bg-white shadow-sm";

  // First section images
  const firstSectionImages = [
    "/Step-icons/img1.png",
    "/Step-icons/img2.png",
    "/Step-icons/img3.png",
    "/Step-icons/img4.png",
    "/Step-icons/img5.png",
    "/Step-icons/img6.png",
    "/Step-icons/img7.png",
    "/Step-icons/img8.png",
    "/Step-icons/img9.png",
    "/Step-icons/img10.png",
  ];

  // Third section images
  const thirdSectionImages = [
    "/Step-icons/img11.png",
    "/Step-icons/img12.png",
    "/Step-icons/img13.png",
    "/Step-icons/img14.png",
    "/Step-icons/img15.png",
    "/Step-icons/img16.png",
    "/Step-icons/img17.png",
    "/Step-icons/img18.png",
    "/Step-icons/img19.png",
    "/Step-icons/img20.png",
  ];

  return (
    <div className="w-full bg-white">
      <div className="pt-[80px] pb-[24px]">
        <h1 className="font-poppins text-[32px] leading-[48px] font-medium text-center mb-[80px]">
          3 EASY STEPS TO GET YOUR STUDIO QUALITY PROFILE.
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-start gap-[52px] relative px-4 md:px-[82px]">
          {/* Step 1 */}
          <div className="w-full md:w-[424px]">
            <div className="grid grid-cols-5 gap-2 mb-8">
              {firstSectionImages.map((imgPath, index) => (
                <div key={index} className={imageBoxStyle}>
                  {index === 6 ? (
                    <Image 
                      src="/instagram-icon.png"
                      alt="Instagram"
                      width={85}
                      height={85}
                      className="w-[85px] h-[85px]"
                    />
                  ) : (
                    <Image 
                      src={imgPath}
                      alt={`Step 1 image ${index + 1}`}
                      width={85}
                      height={85}
                      className="w-[85px] h-[85px] object-cover"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h2 className="font-poppins text-[28.27px] leading-[24.74px] font-medium w-[330.08px] h-[25px]">01</h2>
              <h3 className="font-poppins text-[21.2px] leading-[24.74px] font-medium">Upload a few photos</h3>
              <p className="text-gray-600 text-base leading-relaxed mb-8">
                Upload a few photos of yourself to let AI learn about you.
              </p>
              <button className="w-[269px] h-[48px] rounded-[37px] bg-[#5B16FE] hover:bg-[#4912d0] text-white px-[25px] py-[12px] font-medium flex items-center justify-center gap-[10px]">
                <span>Try Now</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Step 2 */}
          <div className="w-full md:w-[424px]">
            <div className="bg-[#F8FAFC] rounded-2xl p-12 h-[459px] flex flex-col justify-center">
              <h2 className="font-poppins text-[28.27px] leading-[24.74px] font-medium w-[330.08px] h-[25px]">02</h2>
              <h3 className="text-2xl font-semibold mb-4">
                Our AI Photographer "Aaria" get to work
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Aaria creates a private, personalized model just for you—ensuring headshots
                that reflect your unique style and identity.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="w-full md:w-[424px]">
            <div className="grid grid-cols-5 gap-2 mb-8">
              {thirdSectionImages.map((imgPath, index) => (
                <div key={index} className={imageBoxStyle}>
                  {index === 9 ? (
                    <Image 
                      src="/google-photos-icon.png"
                      alt="Google Photos"
                      width={85}
                      height={85}
                      className="w-[85px] h-[85px]"
                    />
                  ) : index === 8 ? (
                    <Image 
                      src="/instagram-icon.png"
                      alt="Instagram"
                      width={85}
                      height={85}
                      className="w-[85px] h-[85px]"
                    />
                  ) : (
                    <Image 
                      src={imgPath}
                      alt={`Step 3 image ${index + 1}`}
                      width={85}
                      height={85}
                      className="w-[85px] h-[85px] object-cover"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h2 className="font-poppins text-[28.27px] leading-[24.74px] font-medium w-[330.08px] h-[25px]">03</h2>
              <h3 className="font-poppins text-[21.2px] leading-[24.74px] font-medium">Download favorite Headshots</h3>
              <p className="text-gray-600 text-base leading-relaxed mb-8">
                You'll receive a variety of styles, giving you the perfect Headshots to
                elevate your business professional profile.
              </p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadshotSteps;