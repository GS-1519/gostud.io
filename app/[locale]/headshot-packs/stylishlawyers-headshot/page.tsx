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
import { stylishLawyersConfig } from '@/config/gallery-configs/stylish-lawyers';
import StylishLawyerHero from "@/components/StylisLawyers";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Stylish Lawyer Photography | Modern Legal Portraits',
  description: 'Create sophisticated and stylish portraits perfect for modern law professionals.',
  keywords: 'stylish lawyer headshots, modern legal portraits, contemporary law firm photos, sophisticated attorney headshots, professional legal photography',
  openGraph: {
    title: 'Stylish Lawyer Photography | Modern Legal Portraits',
    description: 'Create sophisticated and stylish portraits with AI',
    type: 'website',
    images: [{
      url: '/og/stylish-lawyers.jpg',
      width: 1200,
      height: 630,
      alt: 'Stylish Lawyer Photography'
    }],
  }
}

export default async function StylishLawyersPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return <ClientRedirect />;
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div>
        <div id="ai-headshots" className="w-full">
          <StylishLawyerHero />
        </div>
        <div>
          <ExplainerSection />
          <PackHeadshotGallery {...stylishLawyersConfig} />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}