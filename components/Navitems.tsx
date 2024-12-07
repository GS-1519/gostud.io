'use client';

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NavItems({ isMobile = false }) {
  const [showPhotosDropdown, setShowPhotosDropdown] = useState(false);
  const [showHeadshotsDropdown, setShowHeadshotsDropdown] = useState(false);
  const [showToolsDropdown, setShowToolsDropdown] = useState(false);

  const photoPages = [
    { href: '/photos/vintage-americana-photos', label: 'Americana Photos' },
    { href: '/photos/onesie-portraits', label: 'Onesie Photos' },
    { href: '/photos/halloween-photos', label: 'Halloween Photos' },
    { href: '/photos/helmut-newton-photos', label: 'Helmut Newton Photos' },
    { href: '/photos/jcrew-photos', label: 'J.Crew Photos' },
    { href: '/photos/birthday-party-save-the-date-photoshoot', label: 'Dating Profile Photos' },
    { href: '/photos/artistic-portraits', label: 'Artistic Photos' },
    { href: '/photos/wrestlemania-photos', label: 'Wrestlemania Photos' },
    { href: '/photos/actor-red-carpet-photos', label: 'Red Carpet Photos' },
    { href: '/photos/game-of-thrones-portraits', label: 'game-of-thrones' },
    { href: '/photos/kids-birthday-portraits', label: 'kids-birthday-portraits' },
    { href: '/photos/mythical-creatures-portaits', label: 'mythical-creatures-portaits' },
    { href: '/photos/online-dating-profile-photos', label: 'online-dating-profile' },
    { href: '/photos/pet-photography-dog', label: 'pet-photography' },
    { href: '/photos/pop-color-photos', label: 'pop-color-photos' },
    { href: '/photos/youtube-thumbnail-photos', label: 'youtube-thumbnail-photos' },

  ];

  const headshotPages = [
    { href: '/headshot-types/doctor-headshot', label: 'Doctor Headshots' },
    { href: '/headshot-types/lawyer-headshot', label: 'Lawyer Headshots' },
    { href: '/headshot-types/Actor-headshot', label: 'Glamour Headshots' },
    { href: '/headshot-types/professional-tattoos-portraits', label: 'Tattoo Headshots' },
    { href: '/headshot-types/annie-headshot', label: 'Annie Leibovitz Style' },
    { href: '/headshot-types/barbie-headshot', label: 'Barbie Style' },
    { href: '/headshot-types/viking-portraits', label: 'Viking Style' },
    { href: '/headshot-types/realtor-headshot', label: 'realtor Style' },
    { href: '/headshot-types/TED-speaker-headshot', label: 'speaker Style' },

  ];

  const toolPages = [
    { href: '/free-tools/background-library', label: 'Background Library' },
    { href: '/free-tools/black-background', label: 'Black Background' },
    { href: '/free-tools/grey-background', label: 'Grey Background' },
    { href: '/free-tools/red-background', label: 'Red Background' },
    { href: '/free-tools/white-background', label: 'White Background' },
    { href: '/free-tools/abstract-background', label: 'abstract Background' },
    { href: '/free-tools/christmas-background', label: 'christmas Background' },
  ];

  const linkClass = `text-gray-700 font-semibold text-sm px-3 font-jakarta hover:text-purple-600 transition duration-300 ${
    isMobile ? 'block py-2' : ''
  }`;

  const dropdownClass = `${
    isMobile 
      ? 'w-full bg-white py-2 relative'
      : 'absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 mt-1 z-50 min-w-[200px]'
  }`;

  const handleMouseEnter = (setter: (value: boolean) => void) => {
    if (!isMobile) setter(true);
  };

  const handleMouseLeave = (setter: (value: boolean) => void) => {
    if (!isMobile) setter(false);
  };

  const handleClick = (setter: (value: boolean) => void, currentValue: boolean) => {
    if (isMobile) setter(!currentValue);
  };

  return (
    <div className={`${isMobile ? 'flex flex-col w-full space-y-2' : 'flex items-center space-x-4'}`}>
      <div 
        className={`relative ${isMobile ? 'w-full' : ''}`}
        onMouseEnter={() => handleMouseEnter(setShowHeadshotsDropdown)}
        onMouseLeave={() => handleMouseLeave(setShowHeadshotsDropdown)}
      >
        <button 
          className={`${linkClass} ${isMobile ? 'w-full text-left' : ''}`}
          onClick={() => handleClick(setShowHeadshotsDropdown, showHeadshotsDropdown)}
        >
          AI Headshots {isMobile ? (showHeadshotsDropdown ? '▼' : '▶') : ''}
        </button>
        <AnimatePresence>
          {showHeadshotsDropdown && (
            <motion.div 
              initial={{ opacity: 0, y: isMobile ? 0 : -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: isMobile ? 0 : -10 }}
              className={dropdownClass}
            >
              {headshotPages.map((page) => (
                <Link 
                  key={page.href} 
                  href={page.href} 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                >
                  {page.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div 
        className="relative"
        onMouseEnter={() => handleMouseEnter(setShowPhotosDropdown)}
        onMouseLeave={() => handleMouseLeave(setShowPhotosDropdown)}
      >
        <button 
          className={linkClass}
          onClick={() => handleClick(setShowPhotosDropdown, showPhotosDropdown)}
        >
          AI Photos {isMobile ? (showPhotosDropdown ? '▼' : '▶') : ''}
        </button>
        <AnimatePresence>
          {showPhotosDropdown && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={dropdownClass}
            >
              {photoPages.map((page) => (
                <Link 
                  key={page.href} 
                  href={page.href} 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                >
                  {page.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div 
        className="relative"
        onMouseEnter={() => handleMouseEnter(setShowToolsDropdown)}
        onMouseLeave={() => handleMouseLeave(setShowToolsDropdown)}
      >
        <button 
          className={linkClass}
          onClick={() => handleClick(setShowToolsDropdown, showToolsDropdown)}
        >
          Free Tools {isMobile ? (showToolsDropdown ? '▼' : '▶') : ''}
        </button>
        <AnimatePresence>
          {showToolsDropdown && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={dropdownClass}
            >
              {toolPages.map((page) => (
                <Link 
                  key={page.href} 
                  href={page.href} 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                >
                  {page.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Link href="/#testimonial" className={linkClass}>
        Testimonial
      </Link>
      <Link href="/#pricing" className={linkClass}>
        Pricing
      </Link>
      <Link href="/#faq" className={linkClass}>
        FAQ
      </Link>
    </div>
  );
}
