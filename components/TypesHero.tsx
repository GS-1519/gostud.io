'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const TypesHero = () => {
  const headshots = [
    {
      title: 'LinkedIn Headshots',
      description: 'Professional AI-generated headshots perfect for LinkedIn profiles and business networking.',
      image: '/Packs/Types/linkdin.jpg',
      link: '/headshot-types/linkedin-headshot'
    },
    {
      title: 'Doctor Headshots',
      description: 'Professional medical portraits for healthcare professionals, doctors, and medical practices.',
      image: '/Packs/Types/doctor.jpg',
      link: '/headshot-types/doctor-headshot'
    },
    {
      title: 'Lawyer Headshots',
      description: 'Professional portraits for legal professionals and law firms.',
      image: '/Packs/Types/lawyer.jpg',
      link: '/headshot-types/lawyer-headshot'
    },
    {
      title: 'Glamour-headshot',
      description: 'Create stunning glamour portraits perfect for fashion, beauty, and professional modeling portfolios.',
      image: '/Packs/Types/glamour.jpg',
      link: '/headshot-types/glamour-headshot'
    },
    {
      title: 'Bold Color-headshot',
      description: 'Striking portraits with bold, vibrant colors for modern professionals and creatives.',
      image: '/Packs/Types/bold.jpg',
      link: '/headshot-types/bold-color-headshot'
    },
    {
      title: 'Tattoo-headshot',
      description: 'Showcase your tattoos with professional portraits that highlight your artistic expression.',
      image: '/Packs/Types/tattos.jpg',
      link: '/headshot-types/tattoos-headshot'
    },
    {
      title: 'Annie Leibovitz Style',
      description: 'Dramatic portraits inspired by Annie Leibovitz\'s iconic photography style.',
      image: '/Packs/Types/annie.jpg',
      link: '/headshot-types/annie-headshot'
    },
    {
      title: 'Barbie Style',
      description: 'Fun and stylish Barbie-inspired portrait photography.',
      image: '/Packs/Types/barbie.jpg',
      link: '/headshot-types/barbie-headshot'
    },
    {
      title: 'Viking Style',
      description: 'Powerful Viking-inspired portraits perfect for historical themes and fantasy shoots.',
      image: '/Packs/Types/vings.jpg',
      link: '/headshot-types/viking-headshot'
    },
    {
      title: 'Botanical-headshot',
      description: 'Elegant portraits with botanical and natural elements for a fresh, organic look.',
      image: '/Packs/Types/botnical.jpg',
      link: '/headshot-types/botanical-headshot'
    },
    {
      title: 'Halloween-headshot',
      description: 'Spooky and creative Halloween-themed portraits perfect for seasonal content.',
      image: '/Packs/Types/halloween.jpg',
      link: '/headshot-types/halloween-headshot'
    },
    {
      title: 'Wrestlemania Style',
      description: 'Dynamic wrestling-inspired portraits capturing strength and character.',
      image: '/Packs/Types/wresmania.jpg',
      link: '/headshot-types/wrestlemania-headshot'
    },
    {
      title: 'Wednesday Addams Style',
      description: 'Gothic and mysterious portraits inspired by Wednesday Addams.',
      image: '/Packs/Types/wednesday.jpg',
      link: '/headshot-types/wednesday-addams-headshot'
    },
    {
      title: 'J.Crew Style',
      description: 'Classic and preppy portraits with J.Crew-inspired styling.',
      image: '/Packs/Types/jcrew.jpg',
      link: '/headshot-types/jcrew-headshot'
    },
   
    {
      title: 'Kids Birthday-headshot',
      description: 'Magical birthday portraits for children\'s celebrations and memories.',
      image: '/Packs/Types/birthday.jpg',
      link: '/headshot-types/kids-birthday-headshot'
    },
    {
      title: 'Americana Style',
      description: 'Classic American-inspired portraits with a timeless feel.',
      image: '/Packs/Types/americana.jpg',
      link: '/headshot-types/americana-headshot'
    },
    {
      title: 'Onesie-headshot',
      description: 'Fun and comfortable portraits in your favorite onesie.',
      image: '/Packs/Types/onesis.jpg',
      link: '/headshot-types/everyday-onesie-headshot'
    }
  ];

  const [showAll, setShowAll] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const visibleHeadshots = showAll ? headshots : headshots.slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4]">
          AI Headshots for Professionals
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Hundreds of business professionals of all kinds use HeadshotPro every day to generate a professional headshot they can use at work.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {visibleHeadshots.map((headshot, index) => (
          <Link href={headshot.link} key={index}>
            <div 
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative w-full h-[400px] p-4">
                <Image
                  src={headshot.image}
                  alt={headshot.title}
                  fill
                  className="object-contain transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 2}
                />
              </div>
              <div className="p-8 bg-gradient-to-r from-[#8371FF]/5 via-[#A077FE]/5 to-[#01C7E4]/5">
                <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
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
