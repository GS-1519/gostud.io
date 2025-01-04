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
import { catMagicConfig } from '@/config/gallery-configs/cat-magic';

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Cat Magic Photography | Enchanting Pet Portraits',
  description: 'Transform your cat photos into magical portraits. Perfect for pet parents, social media, and creating memorable keepsakes of your feline friends.',
  keywords: 'cat portraits, pet photography, cat photos, pet portraits, feline photography, cat magic, pet memories, animal portraits',
  openGraph: {
    title: 'Cat Magic Photography | Enchanting Pet Portraits',
    description: 'Create magical portraits of your feline friends with AI',
    type: 'website',
    images: [{
      url: '/og/cat-magic.jpg',
      width: 1200,
      height: 630,
      alt: 'Cat Magic Photography'
    }],
  }
}

export default async function CatMagicPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return <ClientRedirect />;
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div>
        <div id="ai-headshots" className="w-full">
          <PackHero config={heroConfigs['cat-magic']} />
        </div>
        <div>
          <ExplainerSection />
          <PackHeadshotGallery {...catMagicConfig} />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}
