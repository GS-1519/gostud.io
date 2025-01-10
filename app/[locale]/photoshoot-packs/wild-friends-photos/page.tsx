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
import { wildFriendsConfig } from '@/config/gallery-configs/wild-friends';

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Wild Friends Photography | Pet and Animal Portraits',
  description: 'Create magical portraits with your pets and animal friends. Perfect for capturing the special bond with your furry companions.',
  keywords: 'pet photos, animal portraits, pet photography, animal photography, pet portraits, wild friends, pet memories, animal companions',
  openGraph: {
    title: 'Wild Friends Photography | Pet and Animal Portraits',
    description: 'Create magical pet portraits with AI',
    type: 'website',
    images: [{
      url: '/og/wild-friends.jpg',
      width: 1200,
      height: 630,
      alt: 'Wild Friends Photography'
    }],
  }
}

export default async function WildFriendsPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return <ClientRedirect />;
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div>
        <div id="ai-headshots" className="w-full">
          <PackHero config={heroConfigs['wild-friends']} />
        </div>
        <div>
          <ExplainerSection />
          <PackHeadshotGallery {...wildFriendsConfig} />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}
