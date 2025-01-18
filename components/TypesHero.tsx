'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

const TypesHero = () => {
  const t = useTranslations('headshots');

  const headshots = [
    {
      title: t('types.doctor.title'),
      description: t('types.doctor.description'),
      image: '/Packs/Types/doctor.jpg',
      link: '/headshot-packs/doctor-headshot'
    },
    {
      title: t('types.lawyer.title'),
      description: t('types.lawyer.description'),
      image: '/Packs/Types/lawyer.jpg',
      link: '/headshot-packs/lawyer-headshot'
    },
    {
      title: t('types.actor.title'),
      description: t('types.actor.description'),
      image: '/Packs/Types/glamour.jpg',
      link: '/headshot-packs/actor-headshot'
    },
    {
      title: t('types.realtor.title'),
      description: t('types.realtor.description'),
      image: '/Packs/Types/realtro.jpg',
      link: '/headshot-packs/realtor-headshot'
    },
    {
      title: t('types.tedSpeaker.title'),
      description: t('types.tedSpeaker.description'),
      image: '/Packs/Types/speaker.jpg',
      link: '/headshot-packs/ted-speaker-headshot'
    },
    {
      title: t('types.businessCasual.title'),
      description: t('types.businessCasual.description'),
      image: '/Packs/Types/Jcrew.jpg',
      link: '/headshot-packs/business-casual-headshots'
    },

    {
      title: t('types.styledSuccess.title'),
      description: t('types.styledSuccess.description'),
      image: '/Packs/Types/sucess.jpg',
      link: '/headshot-packs/stylishlawyers-headshot'
    },
  
    {
      title: t('types.partnersCollection.title'),
      description: t('types.partnersCollection.description'),
      image: '/Packs/Types/partner.jpg',
      link: '/headshot-packs/partners-headshots'
    },
    {
      title: t('types.lawyerBranded.title'),
      description: t('types.lawyerBranded.description'),
      image: '/Packs/Types/branded.jpg',
      link: '/headshot-packs/lawyer-headshot'
    },
    {
      title: t('types.effortlessProfessionalism.title'),
      description: t('types.effortlessProfessionalism.description'),
      image: '/Packs/Types/effortless.jpg',
      link: '/headshot-packs/effortlessprofessionalism-headshot'
    },
  ];

  const [showAll, setShowAll] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const visibleHeadshots = showAll ? headshots : headshots.slice(0, 6);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4]">
          {t('title')}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t('subtitle')}
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
              <div className="relative w-full h-[400px]">
                <Image
                  src={headshot.image}
                  alt={headshot.title}
                  fill
                  className="object-cover"
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
          {showAll ? t('showLess') : t('showMore')}
        </button>
      </div>
    </div>
  );
};

export default TypesHero;
