'use client'
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface PhotoCardProps {
  imageUrl: string;
  onClick: () => void;
  title: string;
}

interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
  packType: string;
  title: string;
}

interface PackImage {
  src: string;
  alt: string;
}

interface PackData {
  title: string;
  images: {
    Men: PackImage[];
    Women: PackImage[];
  };
}

// Small card with gradient border
const SmallCard: React.FC<{ imageUrl: string }> = ({ imageUrl }) => (
  <div 
    className="flex-shrink-0 w-[calc((100%-64px)/5)] aspect-[3/4] rounded-xl overflow-hidden bg-[#161C2D] transition-all duration-300 hover:scale-[1.02]"
    style={{
      boxShadow: '0px 4px 24px -1px rgba(0, 0, 0, 0.2)'
    }}
  >
    <div 
      className="w-full h-full group hover:before:content-[''] hover:before:absolute hover:before:inset-0 hover:before:rounded-xl hover:before:p-[6px] hover:before:bg-gradient-to-r hover:before:from-[#8371FF] hover:before:via-[rgba(160,119,254,0.8)] hover:before:to-[rgba(1,199,228,0.5)]"
    >
      <div className="relative h-full w-full bg-[#161C2D] rounded-xl overflow-hidden">
        <img 
          src={imageUrl} 
          alt="Pack preview"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
);

// Slider component
const ImageSlider: React.FC<{ images: PackImage[] }> = ({ images }) => {
  return (
    <div className="w-full overflow-hidden">
      <div className="relative w-full">
        <div className="flex items-center">
          {/* First set of images */}
          <div 
            className="flex animate-marquee items-center gap-6 whitespace-nowrap"
            style={{ animation: 'marquee 30s linear infinite' }}
          >
            {images.map((img, i) => (
              <div 
                key={i}
                className="flex-shrink-0 w-[280px] h-[380px] rounded-xl overflow-hidden bg-[#161C2D] transition-all duration-300 hover:scale-[1.02]"
                style={{
                  boxShadow: '0px 4px 24px -1px rgba(0, 0, 0, 0.2)'
                }}
              >
                <div 
                  className="w-full h-full group hover:before:content-[''] hover:before:absolute hover:before:inset-0 hover:before:rounded-xl hover:before:p-[6px] hover:before:bg-gradient-to-r hover:before:from-[#8371FF] hover:before:via-[rgba(160,119,254,0.8)] hover:before:to-[rgba(1,199,228,0.5)]"
                >
                  <div className="relative h-full w-full bg-[#161C2D] rounded-xl overflow-hidden">
                    <img 
                      src={img.src} 
                      alt={img.alt}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error(`Failed to load image: ${img.src}`);
                        e.currentTarget.src = '/fallback-image.jpg'; // Optional: provide a fallback image
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Duplicate set */}
          <div 
            className="flex animate-marquee items-center gap-6 whitespace-nowrap"
            style={{ animation: 'marquee 30s linear infinite' }}
          >
            {images.map((img, i) => (
              <div 
                key={`${i}-duplicate`}
                className="flex-shrink-0 w-[280px] h-[380px] rounded-xl overflow-hidden bg-[#161C2D] transition-all duration-300 hover:scale-[1.02]"
                style={{
                  boxShadow: '0px 4px 24px -1px rgba(0, 0, 0, 0.2)'
                }}
              >
                <div 
                  className="w-full h-full group hover:before:content-[''] hover:before:absolute hover:before:inset-0 hover:before:rounded-xl hover:before:p-[6px] hover:before:bg-gradient-to-r hover:before:from-[#8371FF] hover:before:via-[rgba(160,119,254,0.8)] hover:before:to-[rgba(1,199,228,0.5)]"
                >
                  <div className="relative h-full w-full bg-[#161C2D] rounded-xl overflow-hidden">
                    <img 
                      src={img.src} 
                      alt={img.alt}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error(`Failed to load image: ${img.src}`);
                        e.currentTarget.src = '/fallback-image.jpg'; // Optional: provide a fallback image
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Overlay Component
const PackOverlay: React.FC<OverlayProps> = ({ isOpen, onClose, packType, title }) => {
  const [activeTab, setActiveTab] = useState<'Men' | 'Women'>('Women');

  if (!isOpen) return null;

  const packData: Record<string, PackData> = {
    doctor: {
      title: "Medical Professional",
      images: {
        Men: [
          { src: '/Packs/Doctor-photos/Man/man1.jpg', alt: 'Professional male doctor headshot' },
          { src: '/Packs/Doctor-photos/Man/man2.jpg', alt: 'Medical professional man portrait' },
          { src: '/Packs/Doctor-photos/Man/man3.jpg', alt: 'Healthcare professional headshot' },
          { src: '/Packs/Doctor-photos/Man/man4.jpg', alt: 'Man doctor profile photo' },
          { src: '/Packs/Doctor-photos/Man/man5.jpg', alt: 'Male physician headshot' },
          { src: '/Packs/Doctor-photos/Man/man6.jpg', alt: 'Man medical specialist photo' }
        ],
        Women: [
          { src: '/Packs/Doctor-photos/Women/women1.jpg', alt: 'Professional female doctor headshot' },
          { src: '/Packs/Doctor-photos/Women/women2.jpg', alt: 'Medical professional woman portrait' },
          { src: '/Packs/Doctor-photos/Women/women3.jpg', alt: 'Healthcare professional headshot' },
          { src: '/Packs/Doctor-photos/Women/women4.jpg', alt: 'Woman doctor profile photo' },
          { src: '/Packs/Doctor-photos/Women/women5.jpg', alt: 'Female physician headshot' },
          { src: '/Packs/Doctor-photos/Women/women6.jpg', alt: 'Woman medical specialist photo' }
        ]
      }
    },
    corporate: {
      title: "Corporate Headshot",
      images: {
        Men: [
          { src: '/Packs/corporate-photos/Man/man1.jpg', alt: 'Professional corporate headshot man' },
          { src: '/Packs/corporate-photos/Man/man2.jpg', alt: 'Business professional portrait man' },
          { src: '/Packs/corporate-photos/Man/man3.jpg', alt: 'Executive headshot man' },
          { src: '/Packs/corporate-photos/Man/man4.jpg', alt: 'Corporate leader portrait man' },
          { src: '/Packs/corporate-photos/Man/man5.jpg', alt: 'Business formal headshot man' },
          { src: '/Packs/corporate-photos/Man/man6.jpg', alt: 'Professional office portrait man' }
        ],
        Women: [
          { src: '/Packs/corporate-photos/Women/women1.jpg', alt: 'Professional corporate headshot woman' },
          { src: '/Packs/corporate-photos/Women/women2.jpg', alt: 'Business professional portrait woman' },
          { src: '/Packs/corporate-photos/Women/women3.jpg', alt: 'Executive headshot woman' },
          { src: '/Packs/corporate-photos/Women/women4.jpg', alt: 'Corporate leader portrait woman' },
          { src: '/Packs/corporate-photos/Women/women5.jpg', alt: 'Business formal headshot woman' },
          { src: '/Packs/corporate-photos/Women/women6.jpg', alt: 'Professional office portrait woman' }
        ]
      }
    },
    speaker: {
      title: "Speaker Pack",
      images: {
        Men: [
          { src: '/Packs/Speaker-photos/Man/man1.jpg', alt: 'Professional speaker man portrait' },
          { src: '/Packs/Speaker-photos/Man/man2.jpg', alt: 'Confident keynote speaker headshot' },
          { src: '/Packs/Speaker-photos/Man/man3.jpg', alt: 'Inspiring business speaker portrait' },
          { src: '/Packs/Speaker-photos/Man/man4.jpg', alt: 'Professional leadership photo' },
          { src: '/Packs/Speaker-photos/Man/man5.jpg', alt: 'Executive speaker portrait' },
          { src: '/Packs/Speaker-photos/Man/man6.jpg', alt: 'Motivational speaker headshot' }
        ],
        Women: [
          { src: '/Packs/Speaker-photos/Women/women1.jpg', alt: 'Professional speaker woman portrait' },
          { src: '/Packs/Speaker-photos/Women/women2.jpg', alt: 'Confident keynote speaker headshot' },
          { src: '/Packs/Speaker-photos/Women/women3.jpg', alt: 'Inspiring business speaker portrait' },
          { src: '/Packs/Speaker-photos/Women/women4.jpg', alt: 'Professional leadership photo' },
          { src: '/Packs/Speaker-photos/Women/women5.jpg', alt: 'Executive speaker portrait' },
          { src: '/Packs/Speaker-photos/Women/women6.jpg', alt: 'Motivational speaker headshot' }
        ]
      }
    },
    dating: {
      title: "Dating Profile",
      images: {
        Men: [
          { src: '/Packs/Dating-photo/Man/man1.jpg', alt: 'Professional dating profile photo for man' },
          { src: '/Packs/Dating-photo/Man/man2.jpg', alt: 'Natural dating profile photo for man' },
          { src: '/Packs/Dating-photo/Man/man3.jpg', alt: 'Casual dating profile photo for man' },
          { src: '/Packs/Dating-photo/Man/man4.jpg', alt: 'Authentic dating profile photo for man' },
          { src: '/Packs/Dating-photo/Man/man5.jpg', alt: 'Modern dating profile photo for man' },
          { src: '/Packs/Dating-photo/Man/man6.jpg', alt: 'Stylish dating profile photo for man' }
        ],
        Women: [
          { src: '/Packs/Dating-photo/Women/women1.jpg', alt: 'Professional dating profile photo for women' },
          { src: '/Packs/Dating-photo/Women/women2.jpg', alt: 'Natural dating profile photo for women' },
          { src: '/Packs/Dating-photo/Women/women3.jpg', alt: 'Casual dating profile photo for women' },
          { src: '/Packs/Dating-photo/Women/women4.jpg', alt: 'Authentic dating profile photo for women' },
          { src: '/Packs/Dating-photo/Women/women5.jpg', alt: 'Modern dating profile photo for women' },
          { src: '/Packs/Dating-photo/Women/women6.jpg', alt: 'Stylish dating profile photo for women' }
        ]
      }
    },
    redcarpet: {
      title: "Red Carpet",
      images: {
        Men: [
          { src: '/Packs/Redcarpat-photos/Man/man1.jpg', alt: 'Glamorous red carpet man portrait' },
          { src: '/Packs/Redcarpat-photos/Man/man2.jpg', alt: 'Elegant celebrity style headshot' },
          { src: '/Packs/Redcarpat-photos/Man/man3.jpg', alt: 'Sophisticated red carpet portrait' },
          { src: '/Packs/Redcarpat-photos/Man/man4.jpg', alt: 'Luxurious male celebrity photo' },
          { src: '/Packs/Redcarpat-photos/Man/man5.jpg', alt: 'Glamorous star portrait' },
          { src: '/Packs/Redcarpat-photos/Man/man6.jpg', alt: 'Elegant red carpet headshot' }
        ],
        Women: [
          { src: '/Packs/Redcarpat-photos/Women/women1.jpg', alt: 'Glamorous red carpet woman portrait' },
          { src: '/Packs/Redcarpat-photos/Women/women2.jpg', alt: 'Elegant celebrity style headshot' },
          { src: '/Packs/Redcarpat-photos/Women/women3.jpg', alt: 'Sophisticated red carpet portrait' },
          { src: '/Packs/Redcarpat-photos/Women/women4.jpg', alt: 'Luxurious female celebrity photo' },
          { src: '/Packs/Redcarpat-photos/Women/women5.jpg', alt: 'Glamorous star portrait' },
          { src: '/Packs/Redcarpat-photos/Women/women6.jpg', alt: 'Elegant red carpet headshot' }
        ]
      }
    },
    realtor: {
      title: "Real Estate Agent",
      images: {
        Men: [
          { src: '/Packs/Realtor-photos/Man/man1.jpg', alt: 'Professional realtor man portrait' },
          { src: '/Packs/Realtor-photos/Man/man2.jpg', alt: 'Real estate agent headshot' },
          { src: '/Packs/Realtor-photos/Man/man3.jpg', alt: 'Property specialist portrait' },
          { src: '/Packs/Realtor-photos/Man/man4.jpg', alt: 'Real estate professional photo' },
          { src: '/Packs/Realtor-photos/Man/man5.jpg', alt: 'Housing agent portrait' },
          { src: '/Packs/Realtor-photos/Man/man6.jpg', alt: 'Real estate broker headshot' }
        ],
        Women: [
          { src: '/Packs/Realtor-photos/Women/women1.jpg', alt: 'Professional realtor woman portrait' },
          { src: '/Packs/Realtor-photos/Women/women2.jpg', alt: 'Real estate agent headshot' },
          { src: '/Packs/Realtor-photos/Women/women3.jpg', alt: 'Property specialist portrait' },
          { src: '/Packs/Realtor-photos/Women/women4.jpg', alt: 'Real estate professional photo' },
          { src: '/Packs/Realtor-photos/Women/women5.jpg', alt: 'Housing agent portrait' },
          { src: '/Packs/Realtor-photos/Women/women6.jpg', alt: 'Real estate broker headshot' }
        ]
      }
    },
    boldcolors: {
      title: "Bold Colors",
      images: {
        Men: [
          { src: '/Packs/Bold-color/Man/man1.jpg', alt: 'Bold color man portrait' },
          { src: '/Packs/Bold-color/Man/man2.jpg', alt: 'Vibrant male headshot' },
          { src: '/Packs/Bold-color/Man/man3.jpg', alt: 'Dynamic man portrait' },
          { src: '/Packs/Bold-color/Man/man4.jpg', alt: 'Colorful male portrait' },
          { src: '/Packs/Bold-color/Man/man5.jpg', alt: 'Bold style man portrait' },
          { src: '/Packs/Bold-color/Man/man6.jpg', alt: 'Vivid male headshot' }
        ],
        Women: [
          { src: '/Packs/Bold-color/Women/women1.jpg', alt: 'Bold color woman portrait' },
          { src: '/Packs/Bold-color/Women/women2.jpg', alt: 'Vibrant female headshot' },
          { src: '/Packs/Bold-color/Women/women3.jpg', alt: 'Dynamic woman portrait' },
          { src: '/Packs/Bold-color/Women/women4.jpg', alt: 'Colorful female portrait' },
          { src: '/Packs/Bold-color/Women/women5.jpg', alt: 'Bold style woman portrait' },
          { src: '/Packs/Bold-color/Women/women6.jpg', alt: 'Vivid female headshot' }
        ]
      }
    },
    tattoo: {
      title: "Tattoo Artist",
      images: {
        Men: [
          { src: '/Packs/Tattos-photos/Man/man1.jpg', alt: 'Artistic tattooed man portrait' },
          { src: '/Packs/Tattos-photos/Man/man2.jpg', alt: 'Creative tattoo style headshot' },
          { src: '/Packs/Tattos-photos/Man/man3.jpg', alt: 'Modern tattooed portrait' },
          { src: '/Packs/Tattos-photos/Man/man4.jpg', alt: 'Artistic tattoo design photo' },
          { src: '/Packs/Tattos-photos/Man/man5.jpg', alt: 'Unique tattoo portrait' },
          { src: '/Packs/Tattos-photos/Man/man6.jpg', alt: 'Stylish tattoo headshot' }
        ],
        Women: [
          { src: '/Packs/Tattos-photos/Women/women1.jpg', alt: 'Artistic tattooed woman portrait' },
          { src: '/Packs/Tattos-photos/Women/women2.jpg', alt: 'Creative tattoo style headshot' },
          { src: '/Packs/Tattos-photos/Women/women3.jpg', alt: 'Modern tattooed portrait' },
          { src: '/Packs/Tattos-photos/Women/women4.jpg', alt: 'Artistic tattoo design photo' },
          { src: '/Packs/Tattos-photos/Women/women5.jpg', alt: 'Unique tattoo portrait' },
          { src: '/Packs/Tattos-photos/Women/women6.jpg', alt: 'Stylish tattoo headshot' }
        ]
      }
    },
    glamour: {
      title: "Glamour Shot",
      images: {
        Men: [
          { src: '/Packs/Glamour-photos/Man/man1.jpg', alt: 'Elegant glamour man portrait' },
          { src: '/Packs/Glamour-photos/Man/man2.jpg', alt: 'Sophisticated male headshot' },
          { src: '/Packs/Glamour-photos/Man/man3.jpg', alt: 'Luxurious man portrait' },
          { src: '/Packs/Glamour-photos/Man/man4.jpg', alt: 'High-fashion male photo' },
          { src: '/Packs/Glamour-photos/Man/man5.jpg', alt: 'Glamorous style man portrait' },
          { src: '/Packs/Glamour-photos/Man/man6.jpg', alt: 'Chic male headshot' }
        ],
        Women: [
          { src: '/Packs/Dating-photo/Women/women1.jpg', alt: 'Elegant glamour woman portrait' },
          { src: '/Packs/Dating-photo/Women/women2.jpg', alt: 'Sophisticated female headshot' },
          { src: '/Packs/Dating-photo/Women/women3.jpg', alt: 'Luxurious woman portrait' },
          { src: '/Packs/Dating-photo/Women/women4.jpg', alt: 'High-fashion female photo' },
          { src: '/Packs/Dating-photo/Women/women5.jpg', alt: 'Glamorous style woman portrait' },
          { src: '/Packs/Dating-photo/Women/women6.jpg', alt: 'Chic female headshot' }
        ]
      }
    },
    halloween: {
      title: "Halloween Theme",
      images: {
        Men: [
          { src: '/Packs/Halloween-photos/Man/man1.jpg', alt: 'Spooky halloween man portrait' },
          { src: '/Packs/Halloween-photos/Man/man2.jpg', alt: 'Mysterious male headshot' },
          { src: '/Packs/Halloween-photos/Man/man3.jpg', alt: 'Halloween themed man portrait' },
          { src: '/Packs/Halloween-photos/Man/man4.jpg', alt: 'Haunting male photo' },
          { src: '/Packs/Halloween-photos/Man/man5.jpg', alt: 'Gothic style man portrait' },
          { src: '/Packs/Halloween-photos/Man/man6.jpg', alt: 'Dark themed male headshot' }
        ],
        Women: [
          { src: '/Packs/Halloween-photos/Women/women1.jpg', alt: 'Spooky halloween woman portrait' },
          { src: '/Packs/Halloween-photos/Women/women2.jpg', alt: 'Mysterious female headshot' },
          { src: '/Packs/Halloween-photos/Women/women3.jpg', alt: 'Halloween themed woman portrait' },
          { src: '/Packs/Halloween-photos/Women/women4.jpg', alt: 'Haunting female photo' },
          { src: '/Packs/Halloween-photos/Women/women5.jpg', alt: 'Gothic style woman portrait' },
          { src: '/Packs/Halloween-photos/Women/women6.jpg', alt: 'Dark themed female headshot' }
        ]
      }
    },
    mythical: {
      title: "Mythical",
      images: {
        Men: [
          { src: '/Packs/Mythical-photos/Man/man1.jpg', alt: 'Enchanting mythical man portrait' },
          { src: '/Packs/Mythical-photos/Man/man2.jpg', alt: 'Magical male headshot' },
          { src: '/Packs/Mythical-photos/Man/man3.jpg', alt: 'Fantasy man portrait' },
          { src: '/Packs/Mythical-photos/Man/man4.jpg', alt: 'Ethereal male photo' },
          { src: '/Packs/Mythical-photos/Man/man5.jpg', alt: 'Mystical man portrait' },
          { src: '/Packs/Mythical-photos/Man/man6.jpg', alt: 'Legendary male headshot' }
        ],
        Women: [
          { src: '/Packs/Mythical-photos/Women/women1.jpg', alt: 'Enchanting mythical woman portrait' },
          { src: '/Packs/Mythical-photos/Women/women2.jpg', alt: 'Magical female headshot' },
          { src: '/Packs/Mythical-photos/Women/women3.jpg', alt: 'Fantasy woman portrait' },
          { src: '/Packs/Mythical-photos/Women/women4.jpg', alt: 'Ethereal female photo' },
          { src: '/Packs/Mythical-photos/Women/women5.jpg', alt: 'Mystical woman portrait' },
          { src: '/Packs/Mythical-photos/Women/women6.jpg', alt: 'Legendary female headshot' }
        ]
      }
    },
    barbie: {
      title: "Barbie Style",
      images: {
        Men: [],
        Women: [
          { src: '/Packs/Barbie-photos/Women/women1.jpg', alt: 'Barbie style woman portrait' },
          { src: '/Packs/Barbie-photos/Women/women2.jpg', alt: 'Pink themed female headshot' },
          { src: '/Packs/Barbie-photos/Women/women3.jpg', alt: 'Retro style woman portrait' },
          { src: '/Packs/Barbie-photos/Women/women4.jpg', alt: 'Vintage female photo' },
          { src: '/Packs/Barbie-photos/Women/women5.jpg', alt: 'Classic style woman portrait' },
          { src: '/Packs/Barbie-photos/Women/women6.jpg', alt: 'Retro female headshot' }
        ]
      }
    }
  };
  

  const currentPack = packData[packType] || packData.corporate;
  
  // Determine if Men tab should be disabled
  const hasMenImages = currentPack.images.Men && currentPack.images.Men.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
      <div 
        className="w-full md:w-[1270px] bg-[#161C2D] rounded-xl relative max-h-[90vh] overflow-y-auto"
        style={{ 
          height: 'auto',
          minHeight: '500px',
          padding: '24px 20px md:px-82px',
        }}
      >
        {/* Close button - Made more prominent and accessible on mobile */}
        <button 
          onClick={onClose} 
          className="absolute right-4 top-4 text-gray-400 hover:text-white p-2 z-50"
          aria-label="Close overlay"
        >
          <X size={28} />
        </button>

        {/* Title - Adjusted font size for mobile */}
        <h2 className="text-center text-2xl md:text-3xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-medium mb-4 mt-8 md:mt-0 px-4">
          {title}
        </h2>
        
        {/* Description - Adjusted padding for mobile */}
        <p className="text-center text-gray-300 mb-8 max-w-2xl mx-auto px-4 text-sm md:text-base">
          Explore the complete range of photography packs I've crafted just for you! Whether it's
          professional portraits or creative edits, I've got every style and need covered.
        </p>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab('Men')}
            disabled={!hasMenImages}
            className={`px-8 py-2 rounded-full transition-all ${
              activeTab === 'Men'
                ? 'bg-[#5B16FE] text-white'
                : 'text-white border border-gray-600 hover:bg-gray-800'
            } ${!hasMenImages ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Men
          </button>
          <button
            onClick={() => setActiveTab('Women')}
            className={`px-8 py-2 rounded-full transition-all ${
              activeTab === 'Women'
                ? 'bg-[#5B16FE] text-white'
                : 'text-white border border-gray-600 hover:bg-gray-800'
            }`}
          >
            Women
          </button>
        </div>

        {/* Image Slider */}
        <div className="mb-3 h-[400px] flex items-center">
          <ImageSlider images={currentPack.images[activeTab]} />
        </div>

        {/* Single Generate Button - Remove the second "Explore More" button */}
        <div className="flex justify-center mt-8 mb-8">
          <Link href="/login">
            <button className="w-[200px] sm:w-[269px] h-[40px] sm:h-[48px] bg-[#5B16FE] hover:bg-[#4F46E5] text-white rounded-full flex items-center justify-center gap-2 hover:opacity-90 transition-opacity font-poppins text-[13px] sm:text-[16px]">
              <span>Generate</span>
              <svg className="w-3 sm:w-5 h-3 sm:h-5" viewBox="0 0 20 20" fill="none">
                <path 
                  d="M4.16666 10H15.8333M15.8333 10L10 4.16669M15.8333 10L10 15.8334" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// PhotoCard Component for the main grid
const PhotoCard: React.FC<PhotoCardProps> = ({ imageUrl, onClick, title }) => (
  <div 
    className="relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer bg-[#161C2D] transition-all duration-300 hover:scale-[1.02]"
    onClick={onClick}
    style={{
      boxShadow: '0px 4px 24px -1px rgba(0, 0, 0, 0.2)'
    }}
  >
    <div 
      className="w-full h-full group hover:before:content-[''] hover:before:absolute hover:before:inset-0 hover:before:rounded-2xl hover:before:p-[6px] hover:before:bg-gradient-to-r hover:before:from-[#8371FF] hover:before:via-[rgba(160,119,254,0.8)] hover:before:to-[rgba(1,199,228,0.5)]"
    >
      <div className="relative h-full w-full bg-[#161C2D] rounded-2xl overflow-hidden">
        <img 
          src={imageUrl} 
          className="w-full h-full object-cover"
          alt={title}
        />
      </div>
    </div>
  </div>
);

// Main Component
const PhotographyGrid = () => {
  const [selectedPack, setSelectedPack] = useState<string | null>(null);
  const t = useTranslations('PhotographyGrid');

  const photos = [
    { imageUrl: '/pack/img1.png', type: 'corporate', title: 'Corporate Headshots' },
    { imageUrl: '/pack/img2.png', type: 'speaker', title: 'Speaker Pack' },
    { imageUrl: '/pack/img3.png', type: 'doctor', title: 'Medical Professional' },
    { imageUrl: '/pack/img4.png', type: 'realtor', title: 'Real Estate Agent' },
    { imageUrl: '/pack/img5.png', type: 'dating', title: 'Dating Profile' },
    { imageUrl: '/pack/img6.png', type: 'redcarpet', title: 'Red Carpet' },
    { imageUrl: '/pack/img7.png', type: 'boldcolors', title: 'Bold Colors' },
    { imageUrl: '/pack/img8.png', type: 'tattoo', title: 'Tattoo Artist' },
    { imageUrl: '/pack/img9.png', type: 'glamour', title: 'Glamour Shot' },
    { imageUrl: '/pack/img10.png', type: 'barbie', title: 'Barbie Style' },
    { imageUrl: '/pack/img11.png', type: 'halloween', title: 'Halloween Theme' },
    { imageUrl: '/pack/img12.png', type: 'mythical', title: 'Mythical' }
  ];

  return (
    <div className="w-full bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[82px] py-16">
        <div className="text-center mb-12">
          <h2 className="mx-auto max-w-[600px] mb-4 font-[500] text-[24px] sm:text-[32px] leading-[1.3] text-center">
            {t('title')}
          </h2>
          <p className="mx-auto max-w-[992px] font-[400] text-[16px] sm:text-[18px] leading-[1.5] tracking-[-0.04em] text-center text-[#161C2D] font-poppins">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4 lg:gap-6">
          {photos.map((photo, index) => (
            <PhotoCard
              key={index}
              imageUrl={photo.imageUrl}
              title={photo.title}
              onClick={() => setSelectedPack(photo.type)}
            />
          ))}
        </div>

        <PackOverlay
          isOpen={!!selectedPack}
          onClose={() => setSelectedPack(null)}
          packType={selectedPack || 'corporate'}
          title={photos.find(p => p.type === selectedPack)?.title || 'Photography Pack'}
        />

        <div className="flex justify-center mt-8">
          <Link href="/login">
            <button className="w-[200px] sm:w-[269px] h-[40px] sm:h-[48px] bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-full flex items-center justify-center gap-2 hover:opacity-90 transition-opacity font-poppins text-[13px] sm:text-[16px]">
              <span>{t('tryNow')}</span>
              <svg className="w-3 sm:w-5 h-3 sm:h-5" viewBox="0 0 20 20" fill="none">
                <path 
                  d="M4.16666 10H15.8333M15.8333 10L10 4.16669M15.8333 10L10 15.8334" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PhotographyGrid;