import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NavItems({ isMobile = false }) {
  const [showPhotosDropdown, setShowPhotosDropdown] = useState(false);
  const [showToolsDropdown, setShowToolsDropdown] = useState(false);

  const linkClass = `text-gray-700 font-semibold text-sm px-3 font-jakarta hover:text-purple-600 transition duration-300 ${
    isMobile ? 'block py-2' : ''
  }`;

  const dropdownClass = `${
    isMobile 
      ? 'w-full bg-white py-2' 
      : 'absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 mt-1 z-50 min-w-[200px]'
  }`;

  const photoPages = [
    { href: '/photos/americana-photos', label: 'Americana Photos' },
    { href: '/photos/annie-photos', label: 'Annie Photos' },
    { href: '/photos/artistic-photos', label: 'Artistic Photos' },
    { href: '/photos/barbie-photos', label: 'Barbie Photos' },
    { href: '/photos/birthday-photos', label: 'Birthday Photos' },
    { href: '/photos/bold-color-photos', label: 'Bold Color Photos' },
    { href: '/photos/botanical-photos', label: 'Botanical Photos' },
    { href: '/photos/date-photos', label: 'Dating Photos' },
    { href: '/photos/doctor-photos', label: 'Doctor Photos' },
    { href: '/photos/glamour-shots-photos', label: 'Glamour Photos' },
    { href: '/photos/health-inspiration-photos', label: 'Health & Fitness' },
    { href: '/photos/helmut-newton-photos', label: 'Helmut Newton Style' },
    { href: '/photos/jcrew-photos', label: 'J.Crew Style' },
    { href: '/photos/lawyer-photos', label: 'Lawyer Photos' },
    { href: '/photos/linkedin-photos', label: 'LinkedIn Photos' },
    { href: '/photos/redcarpet', label: 'Red Carpet Photos' },
    { href: '/photos/speaker', label: 'Speaker Photos' },
    { href: '/photos/tattos', label: 'Tattoo Photos' },
    { href: '/photos/vikings', label: 'Vikings Photos' },
    { href: '/photos/wednesday-addams-photos', label: 'Wednesday Addams' },
    { href: '/photos/youtube', label: 'Youtube Photos' }
  ];

  const toolPages = [
    { href: '/free-tools/background-library', label: 'Background Library' },
    { href: '/free-tools/black-background', label: 'Black Background' },
    { href: '/free-tools/grey-background', label: 'Grey Background' },
    { href: '/free-tools/red-background', label: 'Red Background' },
    { href: '/free-tools/white-background', label: 'White Background' },
  ];

  const handleMouseEnter = (setter: (value: boolean) => void) => {
    if (!isMobile) {
      setter(true);
    }
  };

  const handleMouseLeave = (setter: (value: boolean) => void) => {
    if (!isMobile) {
      setter(false);
    }
  };

  const handleClick = (setter: (value: boolean) => void, currentValue: boolean) => {
    if (isMobile) {
      setter(!currentValue);
    }
  };

  return (
    <div className={`${isMobile ? 'flex flex-col w-full' : 'flex items-center space-x-4'}`}>
      <div 
        className="relative"
        onMouseEnter={() => handleMouseEnter(setShowPhotosDropdown)}
        onMouseLeave={() => handleMouseLeave(setShowPhotosDropdown)}
      >
        <button 
          className={linkClass}
          onClick={() => handleClick(setShowPhotosDropdown, showPhotosDropdown)}
        >
          Photos {isMobile ? (showPhotosDropdown ? '▼' : '▶') : ''}
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
