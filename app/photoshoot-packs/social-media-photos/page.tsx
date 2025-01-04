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
import { socialMediaConfig } from '@/config/gallery-configs/social-media';

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Social Media Photography | Professional Online Portraits',
  description: 'Create stunning social media portraits. Perfect for all platforms, personal branding, and building a strong online presence.',
  keywords: 'social media photos, online portraits, digital presence, personal branding, profile pictures, platform-ready, social photography, online presence',
  openGraph: {
    title: 'Social Media Photography | Professional Online Portraits',
    description: 'Create stunning social media portraits with AI',
    type: 'website',
    images: [{
      url: '/og/social-media.jpg',
      width: 1200,
      height: 630,
      alt: 'Social Media Photography'
    }],
  }
}

export default async function SocialMediaPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return <ClientRedirect />;
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div>
        <div id="ai-headshots" className="w-full">
          <PackHero config={heroConfigs['social-media']} />
        </div>
        <div>
          <ExplainerSection />
          <PackHeadshotGallery {...socialMediaConfig} />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}
