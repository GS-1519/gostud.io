'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

const PhotosHero = () => {
  const t = useTranslations('photoTypes');

  const photos = [
    {
      title: t('types.vintageAmericana.title'),
      description: t('types.vintageAmericana.description'),
      image: '/Packs/Types/americana.jpg',
      link: '/photoshoot-packs/vintage-americana-photos'
    },
    {
      title: t('types.onesiePortraits.title'),
      description: t('types.onesiePortraits.description'),
      image: '/Packs/Types/onesis.jpg',
      link: '/photoshoot-packs/onesie-portraits'
    },
    {
      title: t('types.halloweenPhotos.title'),
      description: t('types.halloweenPhotos.description'),
      image: '/Packs/Types/halloween.jpg',
      link: '/photoshoot-packs/halloween-photos'
    },
    {
      title: t('types.birthdayParty.title'),
      description: t('types.birthdayParty.description'),
      image: '/Packs/Types/save.jpg',
      link: '/photoshoot-packs/birthday-party-save-the-date-photoshoot'
    },
    {
      title: t('types.artisticPortraits.title'),
      description: t('types.artisticPortraits.description'),
      image: '/Packs/Types/articis.jpg',
      link: '/photoshoot-packs/artistic-portraits'
    },
    {
      title: t('types.wrestlemaniaPhotos.title'),
      description: t('types.wrestlemaniaPhotos.description'),
      image: '/Packs/Types/wresmania.jpg',
      link: '/photoshoot-packs/wrestlemania-photos'
    },
    {
      title: t('types.redCarpet.title'),
      description: t('types.redCarpet.description'),
      image: '/Packs/Types/red-carpet.jpg',
      link: '/photoshoot-packs/actor-red-carpet-photos'
    },
    {
      title: t('types.gameOfThrones.title'),
      description: t('types.gameOfThrones.description'),
      image: '/Packs/Types/game-of-thoran.jpg',
      link: '/photoshoot-packs/game-of-thrones-portraits'
    },
    {
      title: t('types.kidsBirthday.title'),
      description: t('types.kidsBirthday.description'),
      image: '/Packs/Types/birthday.jpg',
      link: '/photoshoot-packs/kids-birthday-portraits'
    },
    {
      title: t('types.mythicalCreatures.title'),
      description: t('types.mythicalCreatures.description'),
      image: '/Packs/Types/myth.jpg',
      link: '/photoshoot-packs/mythical-creatures-portaits'
    },
    {
      title: t('types.onlineDating.title'),
      description: t('types.onlineDating.description'),
      image: '/Packs/Types/dating.jpg',
      link: '/photoshoot-packs/online-dating-profile-photos'
    },
    {
      title: t('types.petPhotography.title'),
      description: t('types.petPhotography.description'),
      image: '/Packs/Types/dog.jpg',
      link: '/photoshoot-packs/pet-photography-dog'
    },
    {
      title: t('types.popColor.title'),
      description: t('types.popColor.description'),
      image: '/Packs/Types/bold.jpg',
      link: '/photoshoot-packs/pop-color-photos'
    },
    {
      title: t('types.youtubeThumbnails.title'),
      description: t('types.youtubeThumbnails.description'),
      image: '/Packs/Types/youtube.jpg',
      link: '/photoshoot-packs/youtube-thumbnail-photos'
    },
    {
      title: t('types.actressPortraits.title'),
      description: t('types.actressPortraits.description'),
      image: '/Packs/Types/botnical.jpg',
      link: '/photoshoot-packs/botanical-photos'
    },
    {
      title: t('types.dreamlandKids.title'),
      description: t('types.dreamlandKids.description'),
      image: '/Packs/Types/dreamland.jpg',
      link: '/photoshoot-packs/4dreamland-kids-photos'
    },
    {
      title: t('types.babyDoodles.title'),
      description: t('types.babyDoodles.description'),
      image: '/Packs/Types/doll.jpg',
      link: '/photoshoot-packs/baby-doodles-photos'
    },
    {
      title: t('types.birthdayMagic.title'),
      description: t('types.birthdayMagic.description'),
      image: '/Packs/Types/magic.jpg',
      link: '/photoshoot-packs/birthday-magic-photos'
    },
    {
      title: t('types.personalBrand.title'),
      description: t('types.personalBrand.description'),
      image: '/Packs/Types/branded.jpg',
      link: '/photoshoot-packs/branding-photography'
    },
    {
      title: t('types.casualPhotography.title'),
      description: t('types.casualPhotography.description'),
      image: '/Packs/Types/casual.jpg',
      link: '/photoshoot-packs/casual-photos'
    },
    {
      title: t('types.casualCollection.title'),
      description: t('types.casualCollection.description'),
      image: '/Packs/Types/CC.jpg',
      link: '/photoshoot-packs/casualcollection-photos'
    },
    {
      title: t('types.catMagic.title'),
      description: t('types.catMagic.description'),
      image: '/Packs/Types/cat.jpg',
      link: '/photoshoot-packs/catmeowgic-photos'
    },
    {
      title: t('types.cyberpunk.title'),
      description: t('types.cyberpunk.description'),
      image: '/Packs/Types/cyber.jpg',
      link: '/photoshoot-packs/cyberpunk-photos'
    },
    {
      title: t('types.hanukkahMiracle.title'),
      description: t('types.hanukkahMiracle.description'),
      image: '/Packs/Types/hakkuka.jpg',
      link: '/photoshoot-packs/hanukka-miracle-photos'
    },
    {
      title: t('types.happyKid.title'),
      description: t('types.happyKid.description'),
      image: '/Packs/Types/happy.jpg',
      link: '/photoshoot-packs/happy-kid-photos'
    },
    {
      title: t('types.influencer.title'),
      description: t('types.influencer.description'),
      image: '/Packs/Types/infulencer.jpg',
      link: '/photoshoot-packs/influencer-photos'
    },
    {
      title: t('types.meIconic.title'),
      description: t('types.meIconic.description'),
      image: '/Packs/Types/me.jpg',
      link: '/photoshoot-packs/me-iconic-photos'
    },
    {
      title: t('types.merryChristmas.title'),
      description: t('types.merryChristmas.description'),
      image: '/Packs/Types/merry.jpg',
      link: '/photoshoot-packs/merry-christmas-photos'
    },
    {
      title: t('types.playfulCasual.title'),
      description: t('types.playfulCasual.description'),
      image: '/Packs/Types/playful.jpg',
      link: '/photoshoot-packs/playful-casual-photos'
    },
    {
      title: t('types.podcaster.title'),
      description: t('types.podcaster.description'),
      image: '/Packs/Types/podcast.jpg',
      link: '/photoshoot-packs/podcaster-photos'
    },
    {
      title: t('types.romanticMaternity.title'),
      description: t('types.romanticMaternity.description'),
      image: '/Packs/Types/maternity.jpg',
      link: '/photoshoot-packs/romantic-maternity-photos'
    },
    {
      title: t('types.socialMedia.title'),
      description: t('types.socialMedia.description'),
      image: '/Packs/Types/social-media.jpg',
      link: '/photoshoot-packs/social-media-photos'
    },
    {
      title: t('types.timeMachine.title'),
      description: t('types.timeMachine.description'),
      image: '/Packs/Types/machin.jpg',
      link: '/photoshoot-packs/time-machine-photos'
    },
    {
      title: t('types.timelessStudio.title'),
      description: t('types.timelessStudio.description'),
      image: '/Packs/Types/timeless.jpg',
      link: '/photoshoot-packs/timeless-studio-photos'
    },
    {
      title: t('types.telAvivFashion.title'),
      description: t('types.telAvivFashion.description'),
      image: '/Packs/Types/tlv.jpg',
      link: '/photoshoot-packs/TLV-fashion-photos'
    },
    {
      title: t('types.wildFriends.title'),
      description: t('types.wildFriends.description'),
      image: '/Packs/Types/wild.jpg',
      link: '/photoshoot-packs/wild-friends-photos'
    },
    {
      title: t('types.winterWonderland.title'),
      description: t('types.winterWonderland.description'),
      image: '/Packs/Types/wonder.jpg',
      link: '/photoshoot-packs/winter-wonderland-photos'
    },
    {
      title: t('types.workFromHome.title'),
      description: t('types.workFromHome.description'),
      image: '/Packs/Types/WHF.jpg',
      link: '/photoshoot-packs/work-from-home-photos'
    },
    {
      title: t('types.vintagePack.title'),
      description: t('types.vintagePack.description'),
      image: '/Packs/Types/vintage.jpg',
      link: '/photoshoot-packs/vintage-pack-photos'
    },
    {
      title: t('types.professionalTattoos.title'),
      description: t('types.professionalTattoos.description'),
      image: '/Packs/Types/tattos.jpg',
      link: '/photoshoot-packs/professional-tattoos-portraits'
    },
    {
      title: t('types.annieLeibovitz.title'),
      description: t('types.annieLeibovitz.description'),
      image: '/Packs/Types/annie.jpg',
      link: '/photoshoot-packs/annie-headshot'
    },
    {
      title: t('types.barbie.title'),
      description: t('types.barbie.description'),
      image: '/Packs/Types/barbie.jpg',
      link: '/photoshoot-packs/barbie-headshot'
    },
    {
      title: t('types.vikingPortraits.title'),
      description: t('types.vikingPortraits.description'),
      image: '/Packs/Types/vings.jpg',
      link: '/photoshoot-packs/viking-portraits'
    },
    {
      title: t('types.marvelClass.title'),
      description: t('types.marvelClass.description'),
      image: '/Packs/Types/miarval.jpg',
      link: '/photoshoot-packs/meiravclass-headshot'
    },
  ];

  const [showAll, setShowAll] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const visibleHeadshots = showAll ? photos : photos.slice(0, 6);

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

export default PhotosHero;
