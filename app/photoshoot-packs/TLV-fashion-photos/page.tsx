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
import { tlvFashionConfig } from '@/config/gallery-configs/tlv-fashion';

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Tel Aviv Fashion Photography | Urban Style Portraits',
  description: 'Create stunning Tel Aviv-inspired fashion portraits. Perfect for capturing the vibrant, modern style of the city.',
  keywords: 'tel aviv fashion, urban style, fashion photography, city portraits, modern fashion, street style, israeli fashion, urban photography',
  openGraph: {
    title: 'Tel Aviv Fashion Photography | Urban Style Portraits',
    description: 'Create stunning Tel Aviv fashion portraits with AI',
    type: 'website',
    images: [{
      url: '/og/tlv-fashion.jpg',
      width: 1200,
      height: 630,
      alt: 'Tel Aviv Fashion Photography'
    }],
  }
}

export default async function TLVFashionPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return <ClientRedirect />;
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div>
        <div id="ai-headshots" className="w-full">
          <PackHero config={heroConfigs['tlv-fashion']} />
        </div>
        <div>
          <ExplainerSection />
          <PackHeadshotGallery {...tlvFashionConfig} />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}
