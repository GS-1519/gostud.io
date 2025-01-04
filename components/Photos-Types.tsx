'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const PhotosHero = () => {
  const photos = [
    {
      title: 'Vintage Americana Photos',
      description: 'Professional headshots with an Americana twist, ideal for LinkedIn and business networking',
      image: '/Packs/Types/americana.jpg',
      link: '/photoshoot-packs/vintage-americana-photos'
    },
    {
      title: 'Onesie Portraits',
      description: 'Adorable portraits for babies and toddlers',
      image: '/Packs/Types/onesis.jpg',
      link: '/photoshoot-packs/onesie-portraits'
    },
    {
      title: 'Halloween Photos',
      description: 'Spooky and fun portraits for Halloween enthusiasts',
      image: '/Packs/Types/halloween.jpg',
      link: '/photoshoot-packs/halloween-photos'
    },
   
    {
      title: 'Birthday Party Save The Date',
      description: 'Natural, authentic portraits for dating profiles',
      image: '/Packs/Types/save.jpg',
      link: '/photoshoot-packs/birthday-party-save-the-date-photoshoot'
    },
    {
      title: 'Artistic Portraits',
      description: 'Creative and artistic portrait photography',
      image: '/Packs/Types/articis.jpg',
      link: '/photoshoot-packs/artistic-portraits'
    },
    {
      title: 'Wrestlemania Photos',
      description: 'Dynamic wrestling-inspired portraits capturing strength and character',
      image: '/Packs/Types/wresmania.jpg',
      link: '/photoshoot-packs/wrestlemania-photos'
    },
    {
      title: 'Actor Red Carpet Photos',
      description: 'Glamorous and sophisticated portraits inspired by the red carpet',
      image: '/Packs/Types/red-carpet.jpg',
      link: '/photoshoot-packs/actor-red-carpet-photos'
    },
    {
      title: 'Game of Thrones Portraits',
      description: 'Fantasy-inspired portraits in the style of Game of Thrones',
      image: '/Packs/Types/game-of-thoran.jpg',
      link: '/photoshoot-packs/game-of-thrones-portraits'
    },
    {
      title: 'Kids Birthday Portraits',
      description: 'Capturing special moments for children\'s birthdays',
      image: '/Packs/Types/birthday.jpg',
      link: '/photoshoot-packs/kids-birthday-portraits'
    },
    {
      title: 'Mythical Creatures Portraits',
      description: 'Fantasy-inspired portraits featuring mythical creatures',
      image: '/Packs/Types/myth.jpg',
      link: '/photoshoot-packs/mythical-creatures-portaits'
    },
    {
      title: 'Online Dating Profile Photos',
      description: 'Perfect portraits for online dating profiles',
      image: '/Packs/Types/dating.jpg',
      link: '/photoshoot-packs/online-dating-profile-photos'
    },
    {
      title: 'Pet Photography',
      description: 'Professional portraits for pets',
      image: '/Packs/Types/dog.jpg',
      link: '/photoshoot-packs/pet-photography-dog'
    },
    {
      title: 'Pop Color Photos',
      description: 'Vibrant portraits with pop art influence',
      image: '/Packs/Types/bold.jpg',
      link: '/photoshoot-packs/pop-color-photos'
    },
    {
      title: 'YouTube Thumbnail Photos',
      description: 'Eye-catching portraits perfect for YouTube thumbnails',
      image: '/Packs/Types/youtube.jpg',
      link: '/photoshoot-packs/youtube-thumbnail-photos'
    },
   {
    title: 'Actress Portraits',
    description: 'Vibrant and detailed photographs of plants and flowers',
    image: '/Packs/Types/botnical.jpg',
    link: '/photoshoot-packs/botanical-photos'
  },
  {
    title: 'Dreamland Kids Photos',
    description: 'Magical and whimsical portraits for children in dreamlike settings',
    image: '/Packs/Types/dreamland.jpg',
    link: '/photoshoot-packs/4dreamland-kids-photos'
  },
  {
    title: 'Baby Doodles',
    description: 'Transform your baby photos into adorable doodle-style portraits. Perfect for nursery art and birth announcements.',
    image: '/Packs/Types/doll.jpg',
    link: '/photoshoot-packs/baby-doodles-photos'
  },
  {
    title: 'Birthday Magic',
    description: 'Create enchanting birthday portraits perfect for celebrations, invitations, and special occasions.',
    image: '/Packs/Types/magic.jpg',
    link: '/photoshoot-packs/birthday-magic-photos'
  },
  {
    title: 'Personal Brand Photography',
    description: 'Professional photography solutions designed to elevate your personal brand and create a consistent visual presence.',
    image: '/Packs/Types/branded.jpg',
    link: '/photoshoot-packs/branding-photography'
  },
  {
    title: 'Casual Photography',
    description: 'Natural and relaxed portraits perfect for social media and casual professional needs.',
    image: '/Packs/Types/casual.jpg',
    link: '/photoshoot-packs/casual-photos'
  },
  {
    title: 'Casual Collection',
    description: 'Create a diverse series of casual, lifestyle portraits perfect for maintaining a consistent online presence.',
    image: '/Packs/Types/CC.jpg',
    link: '/photoshoot-packs/casualcollection-photos'
  },
  {
    title: 'Cat Magic',
    description: 'Transform your cat photos into magical portraits that capture their unique personality and charm.',
    image: '/Packs/Types/cat.jpg',
    link: '/photoshoot-packs/catmeowgic-photos'
  },

{
  title: 'Cyberpunk',
  description: 'Transform into a stunning cyberpunk character with futuristic digital art styles.',
  image: '/Packs/Types/cyber.jpg',
  link: '/photoshoot-packs/cyberpunk-photos'
},
{
  title: 'Hanukkah Miracle',
  description: 'Create beautiful Hanukkah-themed portraits that capture the magic of the Festival of Lights.',
  image: '/Packs/Types/hakkuka.jpg',
  link: '/photoshoot-packs/hanukka-miracle-photos'
},
{
  title: 'Happy Kid',
  description: 'Create delightful portraits of happy children that capture their pure joy and innocence.',
  image: '/Packs/Types/happy.jpg',
  link: '/photoshoot-packs/happy-kid-photos'
},
{
  title: 'Influencer',
  description: 'Create stunning influencer-style portraits perfect for social media and content creation.',
  image: '/Packs/Types/infulencer.jpg',
  link: '/photoshoot-packs/influencer-photos'
},
{
  title: 'Me Iconic',
  description: 'Create your own iconic portrait style that makes you stand out from the crowd.',
  image: '/Packs/Types/me.jpg',
  link: '/photoshoot-packs/me-iconic-photos'
},
// Add these to your headshots array
{
  title: 'Merry Christmas',
  description: 'Create magical Christmas portraits that capture the joy and warmth of the holiday season.',
  image: '/Packs/Types/merry.jpg',
  link: '/photoshoot-packs/merry-christmas-photos'
},
{
  title: 'Playful Casual',
  description: 'Create fun and natural casual portraits that show your playful side.',
  image: '/Packs/Types/playful.jpg',
  link: '/photoshoot-packs/playful-casual-photos'
},
{
  title: 'Podcaster',
  description: 'Create professional podcaster portraits that help build your audio brand.',
  image: '/Packs/Types/podcast.jpg',
  link: '/photoshoot-packs/podcaster-photos'
},
{
  title: 'Romantic Maternity',
  description: 'Create beautiful and romantic maternity portraits that celebrate the magic of pregnancy.',
  image: '/Packs/Types/maternity.jpg',
  link: '/photoshoot-packs/romantic-maternity-photos'
},
{
  title: 'Social Media',
  description: 'Create stunning portraits optimized for all social media platforms.',
  image: '/Packs/Types/social-media.jpg',
  link: '/photoshoot-packs/social-media-photos'
},
// Add these to your headshots array
{
  title: 'Time Machine',
  description: 'Travel through time with stunning historical portraits and period-themed photos.',
  image: '/Packs/Types/machin.jpg',
  link: '/photoshoot-packs/time-machine-photos'
},
{
  title: 'Timeless Studio',
  description: 'Create elegant studio portraits with a timeless, professional appeal.',
  image: '/Packs/Types/timeless.jpg',
  link: '/photoshoot-packs/timeless-studio-photos'
},
{
  title: 'Tel Aviv Fashion',
  description: 'Create stunning Tel Aviv-inspired fashion portraits with urban style.',
  image: '/Packs/Types/tlv.jpg',
  link: '/photoshoot-packs/TLV-fashion-photos'
},
{
  title: 'Wild Friends',
  description: 'Create magical portraits with your pets and animal companions.',
  image: '/Packs/Types/wild.jpg',
  link: '/photoshoot-packs/wild-friends-photos'
},
{
  title: 'Winter Wonderland',
  description: 'Create enchanting winter wonderland portraits in magical snow scenes.',
  image: '/Packs/Types/wonder.jpg',
  link: '/photoshoot-packs/winter-wonderland-photos'
},
{
  title: 'Work From Home',
  description: 'Create professional work-from-home portraits for remote work.',
  image: '/Packs/Types/WHF.jpg',
  link: '/photoshoot-packs/work-from-home-photos'
},
{
  title: 'Vintage Pack',
  description: 'Create beautiful vintage-style portraits with timeless retro aesthetics and classic throwback appeal.',
  image: '/Packs/Types/vintage.jpg',
  link: '/photoshoot-packs/vintage-pack-photos'
},
  ];

  const [showAll, setShowAll] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const visibleHeadshots = showAll ? photos : photos.slice(0, 6);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4]">
          Professional AI Photo Styles
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Choose from our diverse collection of AI-powered photo styles to create your perfect professional portrait.
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
          {showAll ? 'Show Less' : 'See All Styles'}
        </button>
      </div>
    </div>
  );
};

export default PhotosHero;
