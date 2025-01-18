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
import { casualPhotosConfig } from '@/config/gallery-configs/casual-photos';

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Casual Portrait Photography | Natural & Relaxed AI Photos',
  description: 'Create natural, relaxed portraits with our AI photography. Perfect for social media, personal branding, and casual professional needs with an approachable style.',
  keywords: 'casual portraits, relaxed photography, natural photos, lifestyle photography, social media photos, approachable headshots, personal branding, casual professional',
  openGraph: {
    title: 'Casual Portrait Photography | Natural & Relaxed AI Photos',
    description: 'Create natural, approachable portraits with AI photography',
    type: 'website',
    images: [{
      url: '/og/casual-photos.jpg',
      width: 1200,
      height: 630,
      alt: 'Casual Portrait Photography'
    }],
  }
}

export default async function CasualPhotosPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return <ClientRedirect />;
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div>
        <div id="ai-headshots" className="w-full">
          <PackHero config={heroConfigs['casual-photos']} />
        </div>
        <div>
          <ExplainerSection />
          <PackHeadshotGallery {...casualPhotosConfig} />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}
