'use client'
import { useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function ClientRedirect() {
  const router = useRouter();
  const pathname = usePathname();
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (hasRedirected.current) return; // Prevent multiple redirects
    
    try {
      // Get the stored pack info first
      const intendedPack = localStorage.getItem('intendedPack');
      console.log('IntendedPack:', intendedPack); // Debug log

      // If we have intendedPack, always go to packs
      if (intendedPack) {
        console.log('Redirecting to packs because of intendedPack'); // Debug log
        hasRedirected.current = true;
        router.push('/overview/packs');
        localStorage.removeItem('intendedPack'); // Clean up
        return;
      }

      // Check if we're on a pack page
      const isPackPage = pathname?.includes('/photoshoot-packs/') || 
                        pathname?.includes('/headshot-packs/') || 
                        pathname?.includes('/red-carpet') || 
                        pathname?.includes('/americana');
      
      console.log('IsPackPage:', isPackPage, 'Pathname:', pathname); // Debug log

      hasRedirected.current = true;
      if (isPackPage) {
        console.log('Redirecting to packs because on pack page'); // Debug log
        router.push('/overview/packs');
      } else {
        console.log('Redirecting to overview'); // Debug log
        router.push('/overview');
      }
    } catch (error) {
      console.error('Redirect error:', error);
      hasRedirected.current = true;
      router.push('/overview');
    }
  }, [router, pathname]);

  // Show loading state while redirecting
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
    </div>
  );
} 