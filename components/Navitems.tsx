'use client';

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function NavItems({ isMobile = false }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const linkClass = `text-gray-700 font-semibold text-sm px-3 font-jakarta hover:text-purple-600 transition duration-300 ${
    isMobile ? 'block py-2' : ''
  }`;

  const toolPages = [
    { href: '/free-tools/background-library', label: 'Background Library' },
    { href: '/free-tools/background-remover', label: 'Background Remover' },
    
  ];

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 300); // 300ms delay before closing
  };

  // Mobile menu for tools
  if (isMobile) {
    return (
      <div className="flex flex-col w-full space-y-2">
        <Link href="/headshot-packs" className={linkClass}>
          Headshot Packs
        </Link>

        <Link href="/photoshoot-packs" className={linkClass}>
          Photoshoot Packs
        </Link>

        <div className="pl-3">
          <div className={linkClass}>Free Tools</div>
          <div className="pl-4 mt-1 space-y-1">
            {toolPages.map((tool, index) => (
              <Link 
                key={index} 
                href={tool.href} 
                className="block text-sm text-gray-600 hover:text-purple-600 py-1"
              >
                {tool.label}
              </Link>
            ))}
          </div>
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

  // Desktop menu
  return (
    <div className="flex items-center space-x-4">
      <Link href="/headshot-packs" className={linkClass}>
        Headshot Packs
      </Link>

      <Link href="/photoshoot-packs" className={linkClass}>
        Photoshoot Packs
      </Link>

      <div 
        ref={dropdownRef}
        className="relative" 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button className={`${linkClass} flex items-center`}>
          Free Tools
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showDropdown && (
          <div 
            className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="py-1">
              {toolPages.map((tool, index) => (
                <Link
                  key={index}
                  href={tool.href}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-purple-600"
                >
                  {tool.label}
                </Link>
              ))}
            </div>
          </div>
        )}
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
