'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Add this interface above your component
interface TeamPhoto {
  src: string;
  alt: string;
  large?: boolean;
}

const TeamSection = () => {
  const teamPhotos: TeamPhoto[][] = [
    [
      { src: "/team/img1.1.png", alt: "Man in suit with beard" },
      { src: "/team/img2.2.png", alt: "Woman with curly hair" }
    ],
    [
      { src: "/team/img4.png", alt: "Woman in black blazer", large: true }
    ],
    [
      { src: "/team/img.png", alt: "Woman in business attire" },
      { src: "/team/img5.png", alt: "Man with glasses" }
    ],
    [
      { src: "/team/img6.png", alt: "Man in suit and tie", large: true }
    ],
    [
      { src: "/team/img7.7.png", alt: "Man in casual attire" },
      { src: "/team/img8.png", alt: "Professional woman" }
    ]
  ];

  return (
    <div className="w-full bg-white py-[24px] px-[24px]">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="w-[304px] h-[48px] text-center mx-auto font-poppins font-medium text-[32px] leading-[48px]">
            WHY <span>GOSTUDIO.AI?</span>
          </h2>
          <p className="text-[16px] leading-[24px] text-[#161C2D]/60 max-w-[790px] mx-auto text-center">
            Create a unified, professional look for your team with studio-quality headshots, effortlessly crafted by Aaria. We deliver 
            polished portraits that reflect your company's values. No costly photo shoots—just seamless, high-quality results.
          </p>
        </div>

        {/* Team Photos Grid */}
        <div 
          className="bg-[#F4F2FF] rounded-[24px] p-4 sm:p-8 max-w-[1024px] mx-auto relative overflow-x-auto"
          style={{
            boxShadow: '15px 13px 4px 0px #E6DBFF'
          }}
        >
          <div className="flex items-center gap-2 mb-6">
            <span 
              className="bg-black text-white text-sm rounded-[6px] inline-flex items-center"
              style={{
                width: '154.18px',
                height: '37.4px',
                padding: '8.2px 12.3px',
                gap: '10.25px'
              }}
            >
              Team Headshots
            </span>
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M3.33334 8H12.6667M12.6667 8L8.00001 3.33333M12.6667 8L8.00001 12.6667" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="flex gap-2 sm:gap-[8.64px] flex-nowrap">
            {teamPhotos.map((column, columnIndex) => (
              <div key={columnIndex} className="flex-shrink-0 sm:flex-1">
                {column.map((photo: TeamPhoto, photoIndex) => (
                  <div 
                    key={photoIndex} 
                    className={`relative overflow-hidden mb-4`}
                    style={{
                      width: photo?.large 
                        ? 'min(242.66px, calc(100vw - 48px))' 
                        : 'min(146.25px, calc(100vw - 48px))',
                      height: photo?.large 
                        ? 'min(305.67px, calc((100vw - 48px) * 1.26))' 
                        : 'min(146.25px, calc(100vw - 48px))',
                      borderRadius: photo?.large ? '9.43px' : '13.5px',
                      padding: photo?.large ? '13.82px' : '0px',
                      boxShadow: '0px 2.27px 59.08px -4.54px #0C0C0D26',
                      transform: !photo?.large ? 'rotate(180deg)' : 'none'
                    }}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      style={{
                        transform: !photo.large ? 'rotate(180deg)' : 'none'
                      }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Try Now Button */}
        <div className="flex justify-center mt-8">
          <Link href="/login">
            <button 
              className="w-[269px] h-[48px] rounded-[49px] flex items-center justify-center gap-[10px] hover:opacity-90 transition-opacity text-[16px] leading-[24px] font-medium text-white bg-[#5B16FE]"
              style={{
                background: '#5B16FE',
                padding: '12px 25px'
              }}
            >
              Try Now
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 20 20" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M4.16666 10H15.8333M15.8333 10L10 4.16669M15.8333 10L10 15.8334" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeamSection; 