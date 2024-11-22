import React from 'react';
import Image from 'next/image';

interface WorksProps {
  image1?: string;
  image2?: string;
  image3?: string;
}

const Tools = ({ image1 = '/Group.png', image2 = '/Group1.png', image3 = '/Group3.png' }: ToolsProps) => {
  const steps = [
    {
      id: '01',
      title: 'Upload a few photos',
      description: 'Upload a few photos of yourself to let AI learn about you.',
      icon: '📁',
      image: image1
    },
    {
      id: '02',
      title: 'AI trained personally for you',
      description: 'AI creates a private, personalized model just for you—ensuring headshots that reflect your unique style and identity.',
      icon: '🤖',
      image: image2
    },
    {
      id: '03',
      title: 'Download favorite Headshots',
      description: "You'll receive a variety of backgrounds, poses, and styles, giving you the perfect AI-crafted Headshots to elevate your business professional profile.",
      icon: '⬇️',
      image: image3
    }
  ];

  return (
    <div className="flex justify-center items-center w-full py-8">
      <section className="w-full sm:w-[1276px] min-h-[790.92px] rounded-[60px] bg-white p-4 sm:p-12">
        {/* Header */}
        <div className="text-center mb-[20px] px-4 sm:px-0">
          <h2 className="text-xl sm:text-2xl font-medium mb-4 text-[#0A1727CC]">HOW IT WORKS</h2>
          <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              3 easy steps to get your
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              studio quality profile.
            </span>
          </h3>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-[20px] mt-[20px] px-4 sm:px-0">
          {steps.map((step) => (
            <div key={step.id} className="relative">
              {/* Card */}
              <div >
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
                  <div className="flex items-center text-purple-600">
                    {step.id === '01' && (
                      <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
                      </svg>
                    )}
                    {step.id === '02' && (
                      <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21 3H3C2 3 1 4 1 5v14c0 1.1.9 2 2 2h18c1 0 2-1 2-2V5c0-1-1-2-2-2zM5 17l3.5-4.5 2.5 3.01L14.5 11l4.5 6H5z"/>
                      </svg>
                    )}
                    {step.id === '03' && (
                      <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                      </svg>
                    )}
                    <span className="font-semibold">{step.id}/</span>
                  </div>
                  <h4 className="font-semibold">{step.title}</h4>
                </div>

                {/* Step Description */}
                <p className="text-gray-600 text-sm">{step.description}</p>
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