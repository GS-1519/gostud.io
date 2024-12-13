'use client';

import Link from "next/link";
import { useState } from "react";
import { User } from '@supabase/auth-helpers-nextjs';

interface NavItemsProps {
  isMobile?: boolean;
  user?: User | null;
}

export default function NavItems({ isMobile = false, user }: NavItemsProps) {
  // Only these three items should be visible for logged-in users
  const loggedInNavItems = (
    <>
      <Link 
        href="/headshot-packs" 
        className="text-gray-700 font-semibold text-sm px-3 font-jakarta hover:text-purple-600 transition duration-300"
      >
        Headshot Packs
      </Link>
      
      <Link 
        href="/photoshoot-packs" 
        className="text-gray-700 font-semibold text-sm px-3 font-jakarta hover:text-purple-600 transition duration-300"
      >
        Photoshoot Packs
      </Link>

      <div className="relative group">
        <button className="text-gray-700 font-semibold text-sm px-3 font-jakarta hover:text-purple-600 transition duration-300">
          Free Tools
        </button>
        <div className="absolute hidden group-hover:block left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
          <Link 
            href="/free-tools/background-library" 
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Background Library
          </Link>
          <Link 
            href="/free-tools/background-remover" 
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
        className="text-gray-700 font-semibold text-sm px-3 font-jakarta hover:text-purple-600 transition duration-300"
      >
        Testimonial
      </Link>

      <Link 
        href="/#pricing" 
        className="text-gray-700 font-semibold text-sm px-3 font-jakarta hover:text-purple-600 transition duration-300"
      >
        Pricing
      </Link>

      <Link 
        href="/#faq" 
        className="text-gray-700 font-semibold text-sm px-3 font-jakarta hover:text-purple-600 transition duration-300"
      >
        FAQ
      </Link>
    </>
  );

  return (
    <nav className={`flex ${isMobile ? 'flex-col' : 'items-center gap-8'}`}>
      {loggedInNavItems}
      {!user && nonLoggedInItems} {/* Show additional items only when user is NOT logged in */}
    </nav>
  );
}
