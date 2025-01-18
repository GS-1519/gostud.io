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
import { influencerConfig } from '@/config/gallery-configs/influencer';

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Influencer Photography | Professional Social Media Portraits',
  description: 'Create stunning influencer-style portraits. Perfect for social media, personal branding, and building a professional online presence.',
  keywords: 'influencer photos, social media portraits, personal branding, content creator, instagram photos, professional portraits, digital presence, influencer style',
  openGraph: {
    title: 'Influencer Photography | Professional Social Media Portraits',
    description: 'Create stunning influencer-style portraits with AI',
    type: 'website',
    images: [{
      url: '/og/influencer.jpg',
      width: 1200,
      height: 630,
      alt: 'Influencer Photography'
    }],
  }
}

export default async function InfluencerPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return <ClientRedirect />;
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div>
        <div id="ai-headshots" className="w-full">
          <PackHero config={heroConfigs['influencer']} />
        </div>
        <div>
          <ExplainerSection />
          <PackHeadshotGallery {...influencerConfig} />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}
