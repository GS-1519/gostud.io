import React from 'react';
import { DollarSign, Clock, Layers, User } from 'lucide-react';
import Link from 'next/link';

const ComparisonPage = () => {
  const comparisonData = [
    { 
      label: 'Value for money', 
      icon: DollarSign, 
      goStudio: '$19', 
      studio: '$200', 
      color: 'bg-green-500' 
    },
    { 
      label: 'Save time', 
      icon: Clock, 
      goStudio: '30 minutes', 
      studio: '2-3 days', 
      color: 'bg-gray-500' 
    },
    { 
      label: 'Variety', 
      icon: Layers, 
      goStudio: '30 headshots', 
      studio: '4-5 headshots', 
      color: 'bg-red-400' 
    },
    { 
      label: 'More choices', 
      icon: User, 
      goStudio: '20 styles', 
      studio: '1 style', 
      color: 'bg-purple-500' 
    },
  ];

  return (
    <div className="w-full bg-white py-8 md:py-16">
      {/* Mobile Card Container */}
      <div className="md:hidden mx-4 bg-white rounded-[24px] p-6 shadow-lg">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <h2 className="text-center text-[#1E293B]/60 text-base font-semibold font-jakarta">
            SAVE MONEY AND TIME
          </h2>
          <p className="text-center text-[#1E293B] text-sm">
            Aaria ensures you're ready for every professional moment. From resumes to LinkedIn, we make your headshots shine effortlessly.
          </p>
        </div>

        {/* Table Headers */}
        <div className="grid grid-cols-2 mb-6">
          <div className="text-[#8371FF] font-medium">
            Go Studio.ai
          </div>
          <div className="text-[#1E293B] font-medium">
            Studio Photoshoot
          </div>
        </div>

        {/* Comparison Rows */}
        <div className="space-y-6">
          {comparisonData.map((item, index) => (
            <div key={index} className="space-y-4 pb-6 border-b border-[#1E293B]/10 last:border-none">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full ${item.color} flex items-center justify-center`}>
                  <item.icon className="text-white" size={16} />
                </div>
                <span className="text-[#1E293B] text-base">{item.label}</span>
              </div>
              <div className="grid grid-cols-2">
                <div className="text-[#1E293B] text-base">{item.goStudio}</div>
                <div className="text-[#1E293B]/60 text-base">{item.studio}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Button */}
        <div className="mt-6">
          <Link href="/login" className="w-full">
            <button className="w-full h-12 px-6 rounded-full bg-[#7C3AED] text-white flex items-center justify-center gap-2">
              Explore More
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </Link>
        </div>
      </div>

      {/* Desktop Version - Hidden on Mobile */}
      <div className="hidden md:block max-w-[992px] mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-4 mb-8 md:mb-12 px-4">
          <h2 className="text-center text-[#1E293B]/60 text-base font-semibold font-jakarta">
            SAVE MONEY AND TIME
          </h2>
          <p className="text-center text-[#1E293B] text-sm md:text-lg max-w-[358px] md:max-w-none">
            Aaria ensures you're ready for every professional moment. From resumes to LinkedIn, we make your headshots shine effortlessly.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-[358px] md:max-w-[992px] mx-auto px-4">
          {/* Table Headers */}
          <div className="grid grid-cols-2 md:grid-cols-3 mb-8 md:mb-12">
            <div className="hidden md:block"></div>
            <div className="font-semibold text-[#8371FF]">
              Go Studio.ai
            </div>
            <div className="font-semibold text-[#1E293B]">
              Studio Photoshoot
            </div>
          </div>

          {/* Comparison Rows */}
          <div className="space-y-8 md:space-y-12">
            {comparisonData.map((item, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-0 border-b border-[#1E293B]/10 pb-8 md:pb-12">
                {/* Label - Full width on mobile */}
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${item.color} flex items-center justify-center`}>
                    <item.icon className="text-white" size={16} />
                  </div>
                  <span className="text-[#1E293B] text-base md:text-lg">{item.label}</span>
                </div>
                
                {/* Values - Grid on mobile */}
                <div className="grid grid-cols-2 mt-4 md:mt-0">
                  <div className="text-[#1E293B] text-base md:text-lg">{item.goStudio}</div>
                  <div className="text-[#1E293B]/60 text-base md:text-lg">{item.studio}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center mt-8 md:mt-12 px-4">
          <Link href="/login" className="w-full md:w-auto">
            <button className="w-full md:w-auto h-12 px-6 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white flex items-center justify-center gap-2 transition-colors">
              Explore More
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComparisonPage;
