import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ClientRedirect from "@/components/ClientRedirect";
import type { Metadata } from 'next'
import ExplainerSection from "@/components/ExplainerSection";
import ReviewSection from "@/components/HeadshotReviewSection";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import { heroConfigs } from '@/config/hero-configs';
import PackHero from '@/components/shared/PackHero';
import PackHeadshotGallery from '@/components/shared/PackHeadshotGallery';
import { timelessStudioConfig } from '@/config/gallery-configs/timeless-studio';

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Timeless Studio Photography | Classic Professional Portraits',
  description: 'Create elegant studio portraits with a timeless appeal. Perfect for professional headshots and classic photography.',
  keywords: 'studio photos, timeless portraits, professional photography, classic portraits, elegant headshots, studio lighting, professional headshots, classic style',
  openGraph: {
    title: 'Timeless Studio Photography | Classic Professional Portraits',
    description: 'Create elegant studio portraits with AI',
    type: 'website',
    images: [{
      url: '/og/timeless-studio.jpg',
      width: 1200,
      height: 630,
      alt: 'Timeless Studio Photography'
    }],
  }
}

export default async function TimelessStudioPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return <ClientRedirect />;
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div>
        <div id="ai-headshots" className="w-full">
          <PackHero config={heroConfigs['timeless-studio']} />
        </div>
        <div>
          <ExplainerSection />
          <PackHeadshotGallery {...timelessStudioConfig} />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}
