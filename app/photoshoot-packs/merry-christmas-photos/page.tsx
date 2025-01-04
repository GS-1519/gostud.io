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
import { merryChristmasConfig } from '@/config/gallery-configs/merry-christmas';

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Merry Christmas Photography | Festive Holiday Portraits',
  description: 'Create magical Christmas portraits. Perfect for holiday cards, family memories, and sharing the joy of the season.',
  keywords: 'christmas photos, holiday portraits, festive photography, christmas cards, seasonal photos, holiday memories, christmas portraits, festive pictures',
  openGraph: {
    title: 'Merry Christmas Photography | Festive Holiday Portraits',
    description: 'Create magical Christmas portraits with AI',
    type: 'website',
    images: [{
      url: '/og/merry-christmas.jpg',
      width: 1200,
      height: 630,
      alt: 'Merry Christmas Photography'
    }],
  }
}

export default async function MerryChristmasPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return <ClientRedirect />;
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div>
        <div id="ai-headshots" className="w-full">
          <PackHero config={heroConfigs['merry-christmas']} />
        </div>
        <div>
          <ExplainerSection />
          <PackHeadshotGallery {...merryChristmasConfig} />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}
