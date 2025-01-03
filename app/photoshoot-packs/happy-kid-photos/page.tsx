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
import { happyKidConfig } from '@/config/gallery-configs/happy-kid';

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Happy Kid Photography | Joyful Children Portraits',
  description: 'Create delightful portraits of happy children. Perfect for family albums, school photos, and capturing precious childhood moments.',
  keywords: 'kid photography, children portraits, happy kids, family photos, school pictures, childhood memories, joyful portraits, child photography',
  openGraph: {
    title: 'Happy Kid Photography | Joyful Children Portraits',
    description: 'Create magical portraits of happy children with AI',
    type: 'website',
    images: [{
      url: '/og/happy-kid.jpg',
      width: 1200,
      height: 630,
      alt: 'Happy Kid Photography'
    }],
  }
}

export default async function HappyKidPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return <ClientRedirect />;
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div>
        <div id="ai-headshots" className="w-full">
          <PackHero config={heroConfigs['happy-kid']} />
        </div>
        <div>
          <ExplainerSection />
          <PackHeadshotGallery {...happyKidConfig} />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}
