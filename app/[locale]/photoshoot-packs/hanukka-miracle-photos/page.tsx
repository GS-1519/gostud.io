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
import { hanukkahMiracleConfig } from '@/config/gallery-configs/hanukkah-miracle';

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Hanukkah Miracle Portraits | Festival of Lights Photography',
  description: 'Create beautiful Hanukkah-themed portraits. Perfect for holiday cards, family celebrations, and capturing the magic of the Festival of Lights.',
  keywords: 'hanukkah portraits, jewish holiday photos, festival of lights, holiday photography, family celebrations, hanukkah cards, jewish traditions, holiday memories',
  openGraph: {
    title: 'Hanukkah Miracle Portraits | Festival of Lights Photography',
    description: 'Create magical Hanukkah portraits with AI',
    type: 'website',
    images: [{
      url: '/og/hanukkah-miracle.jpg',
      width: 1200,
      height: 630,
      alt: 'Hanukkah Miracle Photography'
    }],
  }
}

export default async function HanukkahMiraclePage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return <ClientRedirect />;
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div>
        <div id="ai-headshots" className="w-full">
          <PackHero config={heroConfigs['hanukkah-miracle']} />
        </div>
        <div>
          <ExplainerSection />
          <PackHeadshotGallery {...hanukkahMiracleConfig} />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}
