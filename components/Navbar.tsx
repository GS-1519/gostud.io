'use client';

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import NavItems from "./Navitems";
import UserMenu from "./UserMenu";
import final_Logo from '@/public/final_Logo.svg';
import { User } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase';
import { useTranslations } from 'next-intl';

interface UserMenuProps {
  user: {
    email: string;
  };
  credits: number;
}

const Navbar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [credits, setCredits] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const params = useParams();
  const locale = params?.locale || 'en';
  const t = useTranslations('navbar');

  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        const { data: creditsData, error } = await supabase
          .from('credits')
          .select('credits')
          .eq('user_id', user.id)
          .single();
  
        if (error) {
          console.log('Error fetching credits:', error);
        } else {
          setCredits(creditsData?.credits ?? 0);
        }
      }
    };
  
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN') {
          setUser(session?.user ?? null);
          router.refresh();
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setCredits(null);
          router.push('/');
          router.refresh();
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase, router]);

  // Create userMenuProps object
  const userMenuProps = user ? {
    user: {
      email: user.email || ''
    },
    credits: credits || 0
  } : null;

  const switchLanguage = (locale: string) => {
    const currentPath = pathname;
    if (currentPath) {
      router.push(currentPath.replace(/^\/[a-z]{2}/, `/${locale}`));
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 w-full z-40">
        <nav className="h-16 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between h-full px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
            {/* Logo Section */}
            <div className="flex-shrink-0">
              <Link href={user ? '/overview' : '/'} className="flex items-center">
                <Image 
                  src={final_Logo} 
                  alt="Studio.ai logo" 
                  width={100} 
                  height={40} 
                  className="w-[80px] sm:w-[100px] lg:w-[120px] h-auto" 
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation - Center */}
            <div className="hidden lg:flex items-center justify-center flex-1 ml-8">
              <NavItems user={user} />
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 relative z-[150]">
              {user && userMenuProps ? (
                <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                  <UserMenu 
                    user={userMenuProps.user}
                    credits={userMenuProps.credits}
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                  <Link href={`/${locale}/login`}>
                    <button className="bg-[#5B16FE] text-white font-semibold text-xs sm:text-sm lg:text-base py-1.5 sm:py-2 px-3 sm:px-4 lg:px-6 rounded-full hover:bg-[#4c12d3] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                      {t('loginButton')}
                    </button>
                  </Link>
                  
                  {/* Mobile Menu Button */}
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="lg:hidden inline-flex items-center justify-center p-1.5 sm:p-2 rounded-full text-gray-600 hover:text-[#5B16FE] hover:bg-gray-50 focus:outline-none transition-all duration-300"
                    aria-expanded="false"
                  >
                    <span className="sr-only">Open main menu</span>
                    {isMenuOpen ? (
                      <svg className="h-5 w-5 sm:h-6 sm:w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 sm:h-6 sm:w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden fixed top-16 left-0 right-0 w-full bg-white shadow-lg border-b border-gray-100 py-2 max-h-[calc(100vh-64px)] overflow-y-auto z-35">
            <div className="px-4 py-2">
              <NavItems isMobile user={user} />
            </div>
          </div>
        )}
      </div>
      <div className="h-16" />
    </>
  );
}

export default Navbar;
