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
import { meIconicConfig } from '@/config/gallery-configs/me-iconic';

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Me Iconic Photography | Signature Style Portraits',
  description: 'Create your own iconic portrait style. Perfect for personal branding, social media influencers, and those wanting to stand out with a unique look.',
  keywords: 'iconic portraits, signature style, personal branding, unique photography, influencer photos, standout portraits, personal style, branded photography',
  openGraph: {
    title: 'Me Iconic Photography | Signature Style Portraits',
    description: 'Create your own iconic portrait style with AI',
    type: 'website',
    images: [{
      url: '/og/me-iconic.jpg',
      width: 1200,
      height: 630,
      alt: 'Me Iconic Photography'
    }],
  }
}

export default async function MeIconicPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return <ClientRedirect />;
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div>
        <div id="ai-headshots" className="w-full">
          <PackHero config={heroConfigs['me-iconic']} />
        </div>
        <div>
          <ExplainerSection />
          <PackHeadshotGallery {...meIconicConfig} />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}
