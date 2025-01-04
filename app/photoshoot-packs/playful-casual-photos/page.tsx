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
import PackHeadshotGallery from "@/components/shared/PackHeadshotGallery";
import { playfulCasualConfig } from '@/config/gallery-configs/playful-casual';

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Playful Casual Photography | Fun Lifestyle Portraits',
  description: 'Create fun and playful casual portraits. Perfect for social media, personal branding, and showing your fun side.',
  keywords: 'playful photos, casual portraits, fun photography, lifestyle photos, personal branding, social media pictures, candid shots, natural portraits',
  openGraph: {
    title: 'Playful Casual Photography | Fun Lifestyle Portraits',
    description: 'Create fun and playful portraits with AI',
    type: 'website',
    images: [{
      url: '/og/playful-casual.jpg',
      width: 1200,
      height: 630,
      alt: 'Playful Casual Photography'
    }],
  }
}

export default async function PlayfulCasualPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return <ClientRedirect />;
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div>
        <div id="ai-headshots" className="w-full">
          <PackHero config={heroConfigs['playful-casual']} />
        </div>
        <div>
          <ExplainerSection />
          <PackHeadshotGallery {...playfulCasualConfig} />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}
