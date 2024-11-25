'use client';

import Image from 'next/image';
import Link from 'next/link';

const TypesHero = () => {
  const headshots = [
    {
      title: 'Model Headshots',
      description: 'Professional AI-generated model headshots without expensive equipment or photographers',
      image: '/linkdln.jpg',
    },
    {
      title: 'Corporate Headshots',
      description: 'Professional business headshots for your business needs',
      image: '/prof.jpg',
    },
    {
      title: 'LinkedIn Headshots',
      description: '25% of HeadshotPro customers report purchasing AI headshots to use on LinkedIn. Get a professional profile picture for LinkedIn using HeadshotPro.',
      image: '/retaol.jpg',
    },
    {
      title: 'Executive Headshots',
      description: 'Professional AI-generated headshots for executives, ready in just 2 hours or less. Pick from a wide variety of background and clothing options.',
      image: '/girl.svg',
    },
    {
      title: 'Eras Headshots',
      description: 'Get AI-generated headshots for your medical residency application, done in 2 hours or less.',
      image: '/gamlour.jpg',
    },
    {
      title: 'Actor Headshots',
      description: 'Affordable headshots for aspiring actors, generated with AI. Get a variety of looks to showcase your range.',
      image: '/spekar.jpg',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1E293B] mb-4">
          AI Headshots for Professionals
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Hundreds of business professionals of all kinds use HeadshotPro every day to generate a professional headshot they can use at work.
        </p>
      </div>

      {/* Grid of Headshot Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {headshots.map((headshot, index) => (
          <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="relative w-full h-[300px]">
              <Image
                src={headshot.image}
                alt={headshot.title}
                fill
                className="object-cover"
                priority={index < 2}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#1E293B] mb-2">
                {headshot.title}
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                {headshot.description}
              </p>
              <Link 
                href="#" 
                className="block text-center py-2 px-4 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                Learn more
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TypesHero;
