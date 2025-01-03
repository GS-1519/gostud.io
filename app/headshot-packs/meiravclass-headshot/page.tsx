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
import { meiravClassConfig } from '@/config/gallery-configs/meirav-class';
import MarvelClassHero from "@/components/MarvelClass";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Meirav Class Photography | Professional Portrait Sessions',
  description: 'Create stunning professional portraits with the Meirav signature style.',
  keywords: 'meirav class photos, professional portraits, signature style photography, modern headshots, artistic portraits, professional photography',
  openGraph: {
    title: 'Meirav Class Photography | Professional Portrait Sessions',
    description: 'Create stunning professional portraits with AI',
    type: 'website',
    images: [{
      url: '/og/meirav-class.jpg',
      width: 1200,
      height: 630,
      alt: 'Meirav Class Photography'
    }],
  }
}

export default async function MeiravClassPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return <ClientRedirect />;
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div>
        <div id="ai-headshots" className="w-full">
          <MarvelClassHero />
        </div>
        <div>
          <ExplainerSection />
          <PackHeadshotGallery {...meiravClassConfig} />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}