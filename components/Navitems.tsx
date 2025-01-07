'use client';

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { User } from '@supabase/auth-helpers-nextjs';

interface NavItemsProps {
  isMobile?: boolean;
  user?: User | null;
}

export default function NavItems({ isMobile = false, user }: NavItemsProps) {
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Handle click outside for mobile
  useEffect(() => {
    if (!isMobile) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsToolsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isMobile]);

  const handleMouseEnter = () => {
    if (!isMobile) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setIsToolsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      timeoutRef.current = setTimeout(() => {
        setIsToolsOpen(false);
      }, 150); // 150ms delay before closing
    }
  };

  const handleToolsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMobile) {
      setIsToolsOpen(!isToolsOpen);
    }
  };

  const loggedInNavItems = (
    <>
      <Link 
        href="/headshot-packs" 
        className={`text-gray-700 font-semibold text-sm px-3 font-jakarta hover:text-purple-600 transition duration-300 ${isMobile ? 'block py-2' : ''}`}
      >
        Headshot Packs
      </Link>
      
      <Link 
        href="/photoshoot-packs" 
        className={`text-gray-700 font-semibold text-sm px-3 font-jakarta hover:text-purple-600 transition duration-300 ${isMobile ? 'block py-2' : ''}`}
      >
        Photoshoot Packs
      </Link>

      <div 
        ref={dropdownRef}
        className={`${isMobile ? 'relative' : 'relative group'}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button 
          className={`text-gray-700 font-semibold text-sm px-3 font-jakarta hover:text-purple-600 transition duration-300 ${isMobile ? 'block py-2 w-full text-left' : ''}`}
          onClick={handleToolsClick}
        >
          Free Tools
        </button>
        <div 
          className={`
            ${isMobile ? 'relative mt-1 ml-4' : 'absolute left-0 mt-0.5 w-48'}
            ${isToolsOpen ? 'block' : 'hidden'}
          `}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className={`
            ${!isMobile ? 'pt-2 pb-2 bg-white rounded-lg shadow-lg' : ''}
          `}>
            <Link 
              href="/free-tools/background-library" 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation();
                if (isMobile) setIsToolsOpen(false);
              }}
            >
              Background Library
            </Link>
            <Link 
              href="/free-tools/background-remover" 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation();
                if (isMobile) setIsToolsOpen(false);
              }}
            >
              Background Remover
            </Link>
          </div>
        </div>
      </div>
    </>
  );

  // Additional items only for non-logged-in users
  const nonLoggedInItems = (
    <>
      <Link 
        href="/#testimonial" 
        className={`text-gray-700 font-semibold text-sm px-3 font-jakarta hover:text-purple-600 transition duration-300 ${isMobile ? 'block py-2' : ''}`}
      >
        Testimonial
      </Link>

      <Link 
        href="/#pricing" 
        className={`text-gray-700 font-semibold text-sm px-3 font-jakarta hover:text-purple-600 transition duration-300 ${isMobile ? 'block py-2' : ''}`}
      >
        Pricing
      </Link>

      <Link 
        href="/#faq" 
        className={`text-gray-700 font-semibold text-sm px-3 font-jakarta hover:text-purple-600 transition duration-300 ${isMobile ? 'block py-2' : ''}`}
      >
        FAQ
      </Link>
    </>
  );

  return (
    <nav className={`${isMobile ? 'flex flex-col space-y-1' : 'flex items-center gap-8'}`}>
      {loggedInNavItems}
      {!user && nonLoggedInItems}
    </nav>
  );
}
