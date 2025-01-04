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
import { brandingPhotographyConfig } from '@/config/gallery-configs/branding-photography';

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Professional Branding Photography | AI-Powered Personal Brand Portraits',
  description: 'Elevate your personal brand with professional AI-powered photography. Perfect for entrepreneurs, influencers, and professionals looking to stand out in their industry.',
  keywords: 'personal branding, professional photography, brand portraits, business photography, corporate headshots, influencer photos, entrepreneur photography, professional image',
  openGraph: {
    title: 'Professional Branding Photography | AI-Powered Personal Brand Portraits',
    description: 'Transform your professional image with AI-powered branding photography',
    type: 'website',
    images: [{
      url: '/og/branding-photography.jpg',
      width: 1200,
      height: 630,
      alt: 'Professional Branding Photography'
    }],
  }
}

export default async function BrandingPhotographyPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return <ClientRedirect />;
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div>
        <div id="ai-headshots" className="w-full">
          <PackHero config={heroConfigs['branding-photography']} />
        </div>
        <div>
          <ExplainerSection />
          <PackHeadshotGallery {...brandingPhotographyConfig} />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}