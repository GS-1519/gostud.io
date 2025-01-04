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
import { dreamlandKidsConfig } from '@/config/gallery-configs/dreamland-kids';

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Dreamland Kids Photography | Magical Children Portraits',
  description: 'Create magical and whimsical portraits for children in dreamlike settings. Perfect for capturing imagination and creating enchanting memories.',
  keywords: 'kids portraits, children photography, magical portraits, dreamlike photos, whimsical photography, child portraits, fantasy photos',
  openGraph: {
    title: 'Dreamland Kids Photography | Magical Children Portraits',
    description: 'Create magical portraits for children with AI',
    type: 'website',
    images: [{
      url: '/og/dreamland-kids.jpg',
      width: 1200,
      height: 630,
      alt: 'Dreamland Kids Photography'
    }],
  }
}

export default async function DreamlandKidsPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return <ClientRedirect />;
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div>
        <div id="ai-headshots" className="w-full">
          <PackHero config={heroConfigs['dreamland-kids']} />
        </div>
        <div>
          <ExplainerSection />
          <PackHeadshotGallery {...dreamlandKidsConfig} />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}