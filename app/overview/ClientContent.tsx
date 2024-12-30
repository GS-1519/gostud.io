'use client';

import { 
  Home,
  Image as ImageIcon,
  Edit3,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter, usePathname } from 'next/navigation';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import ClientSideModelsList from "@/components/realtime/ClientSideModelsList";
import { Database } from '@/types/supabase';
import { useCallback, useState } from 'react';
import { User } from '@supabase/supabase-js';

type ClientContentProps = {
  models: Array<Database['public']['Tables']['models']['Row'] & {
    samples: Database['public']['Tables']['samples']['Row'][]
  }>;
  trainModelUrl: string;
  user: User;
};

function Sidebar({ user, isOpen, onClose }: { user: User; isOpen: boolean; onClose: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const supabase = createClientComponentClient<Database>();

  const handleLogout = useCallback(async () => {
    if (isLoggingOut) return;
    
    setIsLoggingOut(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsLoggingOut(false);
    }
  }, [router, supabase.auth, isLoggingOut]);

  const navItems = [
    {
      name: "Dashboard",
      icon: Home,
      href: "/",
      isActive: pathname === "/"
    },
    {
      name: "My Headshots",
      icon: ImageIcon,
      href: "/overview",
      isActive: pathname === "/overview"
    },
    {
      name: "Photo Editor Tools",
      icon: Edit3,
      href: "/free-tools/background-remover",
      isActive: pathname === "/free-tools/background-remover"
    },
    {
      name: "AI Image Generator",
      icon: Edit3,
      href: "/free-tools",
      isActive: pathname === "/free-tools/background-remover"
    }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-20"
          onClick={onClose}
        />
      )}
      
      <div className={`
        fixed lg:static lg:translate-x-0 z-30
        w-[240px] h-full border-r border-gray-200 px-2 py-3 bg-white
        transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="space-y-2">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 p-2 rounded-lg transition-colors duration-200
                ${item.isActive 
                  ? 'bg-[#F7F3FF]' 
                  : 'hover:bg-gray-100'
                }`}
            >
              <div className="flex items-center gap-2">
                <item.icon 
                  className={`w-5 h-5 ${
                    item.isActive 
                      ? 'text-[#7C3AED]' 
                      : 'text-gray-500'
                  }`} 
                />
                <span className={`${
                  item.isActive 
                    ? 'text-[#7C3AED] font-medium' 
                    : 'text-gray-700'
                }`}>
                  {item.name}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="absolute bottom-4 w-[220px]">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 text-gray-700 w-full transition-colors duration-200
              ${isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <LogOut className="w-5 h-5" />
            <span>{isLoggingOut ? 'Logging out...' : 'Log Out'}</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default function ClientContent({ models, trainModelUrl, user }: ClientContentProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-white">
      <Sidebar 
        user={user} 
        isOpen={isSidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
          {/* Mobile Header with Menu Button */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
              <h1 className="text-2xl font-md text-gray-900">My Headshots</h1>
            </div>
            <div className="mt-4 p-4 sm:p-6 bg-[#F7F3FF] rounded-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-[#7C3AED] text-lg">
                    Start generating images, Aaria is here to generate your photos!
                  </p>
                </div>
                <Link href={trainModelUrl} className="sm:ml-4">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto"
                    style={{ 
                      background: 'linear-gradient(90deg, #8371FF -39.48%, #A077FE 32.07%, #01C7E4 100%)',
                      fontSize: '16px',
                      fontFamily: 'Jakarta Sans, sans-serif'
                    }}
                  >
                    Train model
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <ClientSideModelsList serverModels={models} />
        </div>
      </main>
    </div>
  );
} 