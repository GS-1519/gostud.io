'use client';

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NavItems({ isMobile = false }) {
  const [showPhotosDropdown, setShowPhotosDropdown] = useState(false);
  const [showHeadshotsDropdown, setShowHeadshotsDropdown] = useState(false);
  const [showToolsDropdown, setShowToolsDropdown] = useState(false);

  const photoPages = [
    { href: '/photos/americana-photos', label: 'Americana Photos' },
    { href: '/photos/everyday-onesie-photos', label: 'Onesie Photos' },
    { href: '/photos/halloween-photos', label: 'Halloween Photos' },
    { href: '/photos/helmut-newton-photos', label: 'Helmut Newton Photos' },
    { href: '/photos/jcrew-photos', label: 'J.Crew Photos' },
    { href: '/photos/dating-photos', label: 'Dating Profile Photos' },
    { href: '/photos/realtor-photos', label: 'Realtor Photos' },
    { href: '/photos/artistic-photos', label: 'Artistic Photos' },
    { href: '/photos/wrestlemania-photos', label: 'Wrestlemania Photos' },
    { href: '/photos/red-carpet-photos', label: 'Red Carpet Photos' }
  ];

  const headshotPages = [
    { href: '/headshot-types/linkedin-headshot', label: 'LinkedIn Headshots' },
    { href: '/headshot-types/doctor-headshot', label: 'Doctor Headshots' },
    { href: '/headshot-types/lawyer-headshot', label: 'Lawyer Headshots' },
    { href: '/headshot-types/glamour-headshot', label: 'Glamour Headshots' },
    { href: '/headshot-types/bold-color-headshot', label: 'Bold Color Headshots' },
    { href: '/headshot-types/tattoos-headshot', label: 'Tattoo Headshots' },
    { href: '/headshot-types/annie-headshot', label: 'Annie Leibovitz Style' },
    { href: '/headshot-types/barbie-headshot', label: 'Barbie Style' },
    { href: '/headshot-types/viking-headshot', label: 'Viking Style' }
  ];

  const toolPages = [
    { href: '/free-tools/background-library', label: 'Background Library' },
    { href: '/free-tools/black-background', label: 'Black Background' },
    { href: '/free-tools/grey-background', label: 'Grey Background' },
    { href: '/free-tools/red-background', label: 'Red Background' },
    { href: '/free-tools/white-background', label: 'White Background' },
  ];

  const linkClass = `text-gray-700 font-semibold text-sm px-3 font-jakarta hover:text-purple-600 transition duration-300 ${
    isMobile ? 'block py-2' : ''
  }`;

  const dropdownClass = `${
    isMobile 
      ? 'w-full bg-white py-2' 
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
    <div className={`${isMobile ? 'flex flex-col w-full' : 'flex items-center space-x-4'}`}>
      <div 
        className="relative"
        onMouseEnter={() => handleMouseEnter(setShowHeadshotsDropdown)}
        onMouseLeave={() => handleMouseLeave(setShowHeadshotsDropdown)}
      >
        <button 
          className={linkClass}
          onClick={() => handleClick(setShowHeadshotsDropdown, showHeadshotsDropdown)}
        >
          AI Headshots {isMobile ? (showHeadshotsDropdown ? '▼' : '▶') : ''}
        </button>
        <AnimatePresence>
          {showHeadshotsDropdown && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
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
