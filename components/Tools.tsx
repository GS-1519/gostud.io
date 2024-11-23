import React from 'react';
import Image from 'next/image';

interface WorksProps {
  image1?: string;
  image2?: string;
  image3?: string;
}

const Tools = ({ image1 = '/Frame.png', image2 = '/Group1.png', image3 = '/Group3.png' }: WorksProps) => {
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
    <div className="flex justify-center items-center w-full py-8">
      <section className="w-full sm:w-[1276px] min-h-[790.92px] rounded-[60px] bg-white p-4 sm:p-12">
        {/* Header */}
        <div className="text-center mb-[20px] px-4 sm:px-0">
          <h2 className="text-xl sm:text-2xl font-medium mb-4 text-[#0A1727CC]">MORE TOOLS</h2>
          <div className="max-w-[1000px] mx-auto">
            <h3 className="text-2xl sm:text-4xl md:text-[48px] font-bold flex flex-col gap-4">
              <div>
                <span className="bg-gradient-to-r from-[#837FFF] to-[#4AC2F5] bg-clip-text text-transparent">
                  Explore GoStudio.ai
                </span>
                <span className="text-black"> and get </span>
              </div>
              <div className="text-black">
              your professional headshot today
              </div>
            </h3>
          </div>
          <p className="text-gray-600 mt-6 text-lg max-w-[800px] mx-auto">
            3 easy step to get your professional photo ready to elevate your brand.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-[20px] mt-[20px] px-4 sm:px-0">
          {steps.map((step) => (
            <div key={step.id} className="relative">
              <div>
                {/* Step Image Container */}
                <div className="w-full h-[376px] sm:h-[266.92px] rounded-[11.86px] overflow-hidden relative mb-4 sm:mb-6">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Step Title and Icon */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    <Image 
                      src={step.icon}
                      alt=""
                      width={30}
                      height={30}
                      className="mr-2"
                    />
                    <span className="text-black font-semibold">{step.id}/</span>
                  </div>
                  <h4 className="font-bold text-lg">{step.title}</h4>
                </div>

                {/* Step Description */}
                <p className="text-gray-600 text-base">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-[40px] px-4 sm:px-0">
          <button className="w-full sm:w-[269px] h-[48px] bg-[#5B16FE] text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity flex items-center justify-center mx-auto">
            Get Started
            <span className="ml-2">→</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Tools;