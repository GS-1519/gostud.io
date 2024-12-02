import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface WorksProps {
  image1?: string;
  image2?: string;
  image3?: string;
}

const Works = ({ image1 = '/Frame.png', image2 = '/Group1.png', image3 = '/Group3.png' }: WorksProps) => {
  const steps = [
    {
      id: '01',
      title: 'Upload a few photos',
      description: 'Upload a few photos of yourself to let AI learn about you.',
      icon: '/icon.png',
      image: image1
    },
    {
      id: '02',
      title: 'AI trained personally for you',
      description: 'AI creates a private, personalized model just for you—ensuring headshots that reflect your unique style and identity.',
      icon: '/icon1.png',
      image: image2
    },
    {
      id: '03',
      title: 'Download favorite Headshots',
      description: "You'll receive a variety of backgrounds, poses, and styles, giving you the perfect AI-crafted Headshots to elevate your business professional profile.",
      icon: '/icon2.png',
      image: image3
    }
  ];

  return (
    <div className="flex justify-center items-center w-full py-4 sm:py-6 md:py-8">
      <section className="w-full max-w-[1276px] min-h-[600px] sm:min-h-[790.92px] rounded-[20px] sm:rounded-[30px] md:rounded-[60px] bg-white p-4 sm:p-6 md:p-8 lg:p-12">
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10 px-3 sm:px-4 md:px-6">
          <h2 className="text-base sm:text-lg md:text-xl font-medium mb-3 sm:mb-4 text-[#0A1727CC]">
            HOW IT WORKS
          </h2>
          <div className="max-w-[1000px] mx-auto">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-bold flex flex-col gap-2 sm:gap-3">
              <div>
                <span className="bg-gradient-to-r from-[#837FFF] to-[#4AC2F5] bg-clip-text text-transparent">
                  3 easy steps to get your
                </span>
              </div>
              <div>
                <span className="bg-gradient-to-r from-[#837FFF] to-[#4AC2F5] bg-clip-text text-transparent">
                  studio quality profile
                </span>
              </div>
            </h3>
          </div>
          <p className="text-gray-600 mt-4 sm:mt-5 text-sm sm:text-base md:text-lg max-w-[800px] mx-auto px-2">
            3 easy step to get your professional photo ready to elevate your brand.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mt-6 sm:mt-8 px-3 sm:px-4 md:px-6">
          {steps.map((step) => (
            <div key={step.id} className="bg-white rounded-lg p-3 sm:p-4">
              <div className="w-full h-[200px] sm:h-[220px] md:h-[250px] rounded-lg overflow-hidden relative mb-4">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center">
                  <Image 
                    src={step.icon}
                    alt=""
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  <span className="text-black font-semibold text-sm">{step.id}/</span>
                </div>
                <h4 className="font-bold text-sm sm:text-base">{step.title}</h4>
              </div>

              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-8 sm:mt-12 lg:mt-16">
          <Link 
            href="/get-started" 
            className="inline-block bg-[#5B16FE] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg hover:bg-opacity-90 transition-all"
          >
            Get Your Headshot now →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Works;