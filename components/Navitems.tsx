'use client';

import Link from "next/link";
import { useState } from "react";
import { User } from '@supabase/auth-helpers-nextjs';

interface NavItemsProps {
  isMobile?: boolean;
  user?: User | null;
}

export default function NavItems({ isMobile = false, user }: NavItemsProps) {
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  // Only these three items should be visible for logged-in users
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

      <div className={`${isMobile ? 'relative' : 'relative group'}`}>
        <button 
          className={`text-gray-700 font-semibold text-sm px-3 font-jakarta hover:text-purple-600 transition duration-300 ${isMobile ? 'block py-2 w-full text-left' : ''}`}
          onClick={() => isMobile && setIsToolsOpen(!isToolsOpen)}
        >
          Free Tools
        </button>
        <div className={`
          ${isMobile ? 'relative mt-1 ml-4' : 'absolute hidden group-hover:block left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50'}
          ${isMobile && isToolsOpen ? 'block' : isMobile ? 'hidden' : ''}
        `}>
          <Link 
            href="/free-tools/background-library" 
            className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${isMobile ? 'rounded-md' : ''}`}
          >
            Background Library
          </Link>
          <Link 
            href="/free-tools/background-remover" 
            className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${isMobile ? 'rounded-md' : ''}`}
          >
            Background Remover
          </Link>
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
