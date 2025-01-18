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
import { vintagePackConfig } from '@/config/gallery-configs/vintage-pack';

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Vintage Photography | Retro Style Portraits',
  description: 'Create beautiful vintage-style portraits. Perfect for retro aesthetics and classic throwback photos.',
  keywords: 'vintage photos, retro portraits, classic photography, old-school style, vintage filters, retro aesthetics, nostalgic photos, throwback portraits',
  openGraph: {
    title: 'Vintage Photography | Retro Style Portraits',
    description: 'Create beautiful vintage-style portraits with AI',
    type: 'website',
    images: [{
      url: '/og/vintage-pack.jpg',
      width: 1200,
      height: 630,
      alt: 'Vintage Photography'
    }],
  }
}

export default async function VintagePackPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return <ClientRedirect />;
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div>
        <div id="ai-headshots" className="w-full">
          <PackHero config={heroConfigs['vintage-pack']} />
        </div>
        <div>
          <ExplainerSection />
          <PackHeadshotGallery {...vintagePackConfig} />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}
