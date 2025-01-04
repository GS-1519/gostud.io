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
import { winterWonderlandConfig } from '@/config/gallery-configs/winter-wonderland';

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Winter Wonderland Photography | Magical Snow Portraits',
  description: 'Create enchanting winter wonderland portraits. Perfect for capturing the magic of the snowy season.',
  keywords: 'winter photos, snow portraits, winter wonderland, seasonal photography, snow pictures, winter magic, holiday photos, winter scenes',
  openGraph: {
    title: 'Winter Wonderland Photography | Magical Snow Portraits',
    description: 'Create enchanting winter portraits with AI',
    type: 'website',
    images: [{
      url: '/og/winter-wonderland.jpg',
      width: 1200,
      height: 630,
      alt: 'Winter Wonderland Photography'
    }],
  }
}

export default async function WinterWonderlandPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return <ClientRedirect />;
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div>
        <div id="ai-headshots" className="w-full">
          <PackHero config={heroConfigs['winter-wonderland']} />
        </div>
        <div>
          <ExplainerSection />
          <PackHeadshotGallery {...winterWonderlandConfig} />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}
