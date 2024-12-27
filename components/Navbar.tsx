'use client';

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import NavItems from "./Navitems";
import UserMenu from "./UserMenu";
import final_Logo from '@/public/final_Logo.svg';
import { User } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase';

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

  const getUserMenuProps = (user: User | null, credits: number | null): UserMenuProps | null => {
    if (!user || !user.email) return null;
    return {
      user: { email: user.email },
      credits: credits ?? 0
    };
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 w-full z-40">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
            {/* Logo Section */}
            <div className="flex-shrink-0">
              <Link href={user ? '/overview' : '/'} className="flex items-center">
                <Image 
                  src={final_Logo} 
                  alt="Studio.ai logo" 
                  width={100} 
                  height={40} 
                  className="w-[100px] sm:w-[120px] h-auto" 
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation - Center */}
            <div className="hidden lg:flex items-center justify-center flex-1 ml-8">
              <div className="flex space-x-8">
                <NavItems user={user} />
              </div>
            </div>

            {/* Right Section - Auth/Menu */}
            <div className="flex items-center gap-3 sm:gap-4">
              {user ? (
                // User Menu
                (() => {
                  const userMenuProps = getUserMenuProps(user, credits);
                  return userMenuProps ? (
                    <div className="flex items-center">
                      <UserMenu {...userMenuProps} />
                    </div>
                  ) : null;
                })()
              ) : (
                // Login Button & Mobile Menu
                <div className="flex items-center gap-2 sm:gap-4">
                  <Link href="/login">
                    <button className="bg-[#5B16FE] text-white font-semibold text-sm sm:text-base py-2 px-4 sm:px-6 rounded-full hover:bg-[#4c12d3] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                      Login / Sign Up
                    </button>
                  </Link>
                  
                  {/* Mobile Menu Button */}
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="lg:hidden inline-flex items-center justify-center p-2 rounded-full text-gray-600 hover:text-[#5B16FE] hover:bg-gray-50 focus:outline-none transition-all duration-300"
                    aria-expanded="false"
                  >
                    <span className="sr-only">Open main menu</span>
                    {isMenuOpen ? (
                      <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
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
        {!user && isMenuOpen && (
          <div className="lg:hidden w-full bg-white backdrop-blur-lg bg-opacity-80 shadow-lg border-b border-gray-100 py-3">
            <div className="px-4 pt-2 pb-3 space-y-1">
              <NavItems isMobile />
            </div>
          </div>
        )}
      </div>
      <div className="h-[64px]" />
    </>
  );
}

export default Navbar;
