'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const TypesHero = () => {
  const headshots = [
    {
      title: 'Doctor Headshots',
      description: 'Professional medical portraits for healthcare professionals, doctors, and medical practices.',
      image: '/Packs/Types/doctor.jpg',
      link: '/headshot-packs/doctor-headshot'
    },
    {
      title: 'Lawyer Headshots',
      description: 'Professional portraits for legal professionals and law firms.',
      image: '/Packs/Types/lawyer.jpg',
      link: '/headshot-packs/lawyer-headshot'
    },
    {
      title: 'Actor Headshots',
      description: 'Create stunning glamour portraits perfect for fashion, beauty, and professional modeling portfolios.',
      image: '/Packs/Types/glamour.jpg',
      link: '/headshot-packs/actor-headshot'
    },
    {
      title: 'Professional Tattoo Portraits',
      description: 'Showcase your tattoos with professional portraits that highlight your artistic expression.',
      image: '/Packs/Types/tattos.jpg',
      link: '/headshot-packs/professional-tattoos-portraits'
    },
    {
      title: 'Annie Leibovitz Style',
      description: 'Dramatic portraits inspired by Annie Leibovitz\'s iconic photography style.',
      image: '/Packs/Types/annie.jpg',
      link: '/headshot-packs/annie-headshot'
    },
    {
      title: 'Barbie Style',
      description: 'Fun and stylish Barbie-inspired portrait photography.',
      image: '/Packs/Types/barbie.jpg',
      link: '/headshot-packs/barbie-headshot'
    },
    {
      title: 'Viking Portraits',
      description: 'Powerful Viking-inspired portraits perfect for historical themes and fantasy shoots.',
      image: '/Packs/Types/vings.jpg',
      link: '/headshot-packs/viking-portraits'
    },
    {
      title: 'Realtor Style',
      description: 'Professional portraits for real estate professionals.',
      image: '/Packs/Types/realtro.jpg',
      link: '/headshot-packs/realtor-headshot'
    },
    {
      title: 'TED Speaker Style',
      description: 'Professional portraits for speakers and presenters.',
      image: '/Packs/Types/speaker.jpg',
      link: '/headshot-packs/ted-speaker-headshot'
    },
    {
      title: 'Business Casual Headshots',
      description: 'Classic and stylish portraits inspired by J.Crew\'s aesthetic',
      image: '/Packs/Types/Jcrew.jpg',
      link: '/headshot-packs/business-casual-headshots'
    },
    {
      title: 'Model Headshots',
      description: 'Sleek and provocative portraits inspired by Helmut Newton\'s style',
      image: '/Packs/Types/helmut.jpg',
      link: '/headshot-packs/model-headshots'
    },
  ];

  const [showAll, setShowAll] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const visibleHeadshots = showAll ? headshots : headshots.slice(0, 6);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4]">
          AI Headshots for Professionals
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Hundreds of business professionals of all kinds use HeadshotPro every day to generate a professional headshot they can use at work.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleHeadshots.map((headshot, index) => (
          <Link href={headshot.link} key={index}>
            <div 
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative w-full h-[300px] p-4">
                <Image
                  src={headshot.image}
                  alt={headshot.title}
                  fill
                  className="object-contain transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  priority={index < 2}
                />
              </div>
              <div className="p-6 bg-gradient-to-r from-[#8371FF]/5 via-[#A077FE]/5 to-[#01C7E4]/5">
                <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                  hoveredIndex === index ? 'bg-clip-text text-transparent bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4]' : 'text-[#1E293B]'
                }`}>
                  {headshot.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {headshot.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-16">
        <button
          onClick={() => setShowAll(!showAll)}
          className="bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4] text-white px-10 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          {showAll ? 'Show Less' : 'See All Styles'}
        </button>
      </div>
    </div>
  );
};

export default TypesHero;
