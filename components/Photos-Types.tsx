'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const PhotosHero = () => {
  const photos = [
    {
      title: 'Americana Photos',
      description: 'Professional headshots with an Americana twist, ideal for LinkedIn and business networking',
      image: '/Packs/Types/americana.jpg',
      link: '/photos/americana-photos'
    },
    {
      title: 'Onesie Photos',
      description: 'Adorable portraits for babies and toddlers',
      image: '/Packs/Types/onesis.jpg',
      link: '/photos/everyday-onesie-photos'
    },
    {
      title: 'Halloween Photos',
      description: 'Spooky and fun portraits for Halloween enthusiasts',
      image: '/Packs/Types/halloween.jpg',
      link: '/photos/halloween-photos'
    },
    {
      title: 'Helmut Newton Photos',
      description: 'Sleek and provocative portraits inspired by Helmut Newton\'s style',
      image: '/Packs/Types/helmut.jpg',
      link: '/photos/helmut-newton-photos'
    },
    {
      title: 'J.Crew Photos',
      description: 'Classic and stylish portraits inspired by J.Crew\'s aesthetic',
      image: '/Packs/Types/jcrew.jpg',
      link: '/photos/jcrew-photos'
    },
    {
      title: 'Dating Profile Photos',
      description: 'Natural, authentic portraits for dating profiles',
      image: '/Packs/Types/dating.jpg',
      link: '/photos/dating-photos'
    },
    {
      title: 'Realtor Photos',
      description: 'Professional portraits for real estate professionals',
      image: '/Packs/Types/realtro.jpg',
      link: '/photos/realtor-photos'
    },
    {
      title: 'Artistic Photos',
      description: 'Creative and artistic portrait photography',
      image: '/Packs/Types/articis.jpg',
      link: '/photos/artistic-photos'
    },
    {
      title: 'Wrestlemania Photos',
      description: 'Dynamic wrestling-inspired portraits capturing strength and character',
      image: '/Packs/Types/wresmania.jpg',
      link: '/photos/wrestlemania-photos'
    },
    {
      title: 'Red Carpet Photos',
      description: 'Glamorous and sophisticated portraits inspired by the red carpet',
      image: '/Packs/Types/red-carpet.jpg',
      link: '/photos/red-carpet-photos'
    },
   
  
  ];

  const [showAll, setShowAll] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const visibleHeadshots = showAll ? photos : photos.slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4]">
          Professional AI Photo Styles
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Choose from our diverse collection of AI-powered photo styles to create your perfect professional portrait
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

export default PhotosHero;
