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
import { useCallback, useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { useTranslations } from 'next-intl';

interface ClientContentProps {
  models: any[];
  trainModelUrl: string;
  user: any;
  handleRedirect?: boolean;
}

function Sidebar({ user, isOpen, onClose }: { user: User; isOpen: boolean; onClose: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const supabase = createClientComponentClient<Database>();
  const t = useTranslations('sidebar');

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
      name: t('dashboard'),
      icon: Home,
      href: "/",
      isActive: pathname === "/"
    },
    {
      name: t('myHeadshots'),
      icon: ImageIcon,
      href: "/overview",
      isActive: pathname === "/overview"
    },
    {
      name: t('photoEditorTools'),
      icon: Edit3,
      href: "/free-tools/background-remover",
      isActive: pathname === "/free-tools/background-remover"
    },
    {
      name: t('aiImageGenerator'),
      icon: Edit3,
      href: "/",
      isActive: pathname === "/free-tools"
    },
    {
      name: isLoggingOut ? t('loggingOut') : t('logout'),
      icon: LogOut,
      href: "#",
      isActive: false,
      onClick: handleLogout
    }
  ];

  return (
    <aside className={`
      fixed lg:static lg:translate-x-0 z-30
      w-[300px] h-full bg-white shadow-lg
      transition-transform duration-300
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      {/* Sidebar Container */}
      <div className="flex flex-col h-full p-6">
        {/* Navigation Links */}
        <div className="space-y-2">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-200
                ${item.isActive 
                  ? 'bg-[#F7F3FF] text-[#7C3AED]' 
                  : 'text-gray-600 hover:bg-gray-50'
                }`}
              onClick={() => {
                if (item.onClick) item.onClick();
                onClose();
              }}
            >
              <item.icon className={`w-6 h-6 ${item.isActive ? 'text-[#7C3AED]' : 'text-gray-500'}`} />
              <span className="text-base font-medium">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default function ClientContent({ models, trainModelUrl, user, handleRedirect }: ClientContentProps) {
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const t = useTranslations('overview');

  useEffect(() => {
    if (handleRedirect) {
      const intendedPack = localStorage.getItem('intendedPack');
      if (intendedPack) {
        try {
          const packData = JSON.parse(intendedPack);
          if (packData.redirect) {
            router.push('/overview/packs');
          }
        } catch (error) {
          console.error('Error handling redirect:', error);
        }
      }
    }
  }, [handleRedirect, router]);

  return (
    <div className="flex h-screen bg-white">
      {/* Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar 
        user={user} 
        isOpen={isSidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4">
        {/* Mobile Menu Button */}
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

        {/* Content Container */}
        <div className="mx-auto">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-sm p-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <h1 className="text-2xl font-md text-gray-900">{t('myHeadshots')}</h1>
            </div>

            {/* Generate Images Banner */}
            <div className="bg-white rounded-xl p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <p className="text-[#7C3AED] text-lg font-medium mb-0">
                  {t('generateImagesMessage')}
                </p>
                <Link href={trainModelUrl}>
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto whitespace-nowrap"
                    style={{ 
                      background: 'linear-gradient(90deg, #8371FF -39.48%, #A077FE 32.07%, #01C7E4 100%)',
                      fontSize: '16px',
                      fontFamily: 'Jakarta Sans, sans-serif'
                    }}
                  >
                    {t('generateImages')}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Models List */}
            <ClientSideModelsList serverModels={models} />
          </div>
        </div>
      </main>
    </div>
  );
}