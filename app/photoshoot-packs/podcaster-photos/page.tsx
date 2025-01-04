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
import { podcasterConfig } from '@/config/gallery-configs/podcaster';

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Podcaster Photography | Professional Audio Creator Portraits',
  description: 'Create professional podcaster portraits. Perfect for show artwork, media kits, and building your audio brand.',
  keywords: 'podcaster photos, audio creator, show artwork, media kit, podcast branding, professional portraits, audio professional, podcast marketing',
  openGraph: {
    title: 'Podcaster Photography | Professional Audio Creator Portraits',
    description: 'Create professional podcaster portraits with AI',
    type: 'website',
    images: [{
      url: '/og/podcaster.jpg',
      width: 1200,
      height: 630,
      alt: 'Podcaster Photography'
    }],
  }
}

export default async function PodcasterPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return <ClientRedirect />;
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div>
        <div id="ai-headshots" className="w-full">
          <PackHero config={heroConfigs['podcaster']} />
        </div>
        <div>
          <ExplainerSection />
          <PackHeadshotGallery {...podcasterConfig} />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}
