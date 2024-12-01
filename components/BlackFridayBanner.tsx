'use client'

import { useState } from 'react'
import Link from 'next/link'

const BlackFridayBanner = () => {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 right-0 w-full bg-black text-white z-[60]">
      <div className="max-w-7xl mx-auto px-3 py-2 flex items-center justify-between">
        <div className="flex-1" />
        <div className="text-center flex items-center space-x-2">
          <span className="hidden sm:inline">🎉</span>
          <p className="text-sm sm:text-base font-medium">
            <span className="hidden sm:inline">Black Friday Sale! </span>
            <span className="text-violet-400">50% OFF</span>
            <span className="hidden sm:inline"> on all AI Headshots</span>
          </p>
          <Link 
            href="/login" 
            className="ml-2 text-xs sm:text-sm bg-violet-600 hover:bg-violet-700 text-white px-3 py-1 rounded-full transition-colors"
          >
            Claim Now
          </Link>
        </div>
        <div className="flex-1 flex justify-end">
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-white p-1"
            aria-label="Close banner"
          >
            {/* <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg> */}
          </button>
        </div>
      </div>
    </div>
  )
}

export default BlackFridayBanner 