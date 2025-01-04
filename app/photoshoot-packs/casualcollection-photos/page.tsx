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
import { casualCollectionConfig } from '@/config/gallery-configs/casual-collection';

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Casual Collection Photography | Lifestyle Portrait Series',
  description: 'Create a diverse collection of casual, lifestyle portraits. Perfect for social media content creators, personal branding, and maintaining a consistent online presence.',
  keywords: 'casual collection, lifestyle portraits, photo series, content creation, personal branding, social media photos, lifestyle photography, portrait collection',
  openGraph: {
    title: 'Casual Collection Photography | Lifestyle Portrait Series',
    description: 'Create your perfect casual portrait collection with AI',
    type: 'website',
    images: [{
      url: '/og/casual-collection.jpg',
      width: 1200,
      height: 630,
      alt: 'Casual Collection Photography'
    }],
  }
}

export default async function CasualCollectionPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return <ClientRedirect />;
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div>
        <div id="ai-headshots" className="w-full">
          <PackHero config={heroConfigs['casual-collection']} />
        </div>
        <div>
          <ExplainerSection />
          <PackHeadshotGallery {...casualCollectionConfig} />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}
