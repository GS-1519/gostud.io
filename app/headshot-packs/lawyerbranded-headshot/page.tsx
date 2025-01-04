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
import { lawyerBrandedConfig } from '@/config/gallery-configs/lawyer-branded';
import LawyerHeadshotHero from "@/components/LawyerHeadshotHero";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Lawyer Branded Photography | Professional Legal Portraits',
  description: 'Create professional legal portraits perfect for law firms and legal professionals.',
  keywords: 'lawyer headshots, legal portraits, attorney photos, law firm photography, professional legal headshots, corporate law photos',
  openGraph: {
    title: 'Lawyer Branded Photography | Professional Legal Portraits',
    description: 'Create professional legal portraits with AI',
    type: 'website',
    images: [{
      url: '/og/lawyer-branded.jpg',
      width: 1200,
      height: 630,
      alt: 'Lawyer Branded Photography'
    }],
  }
}

export default async function LawyerBrandedPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return <ClientRedirect />;
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div>
        <div id="ai-headshots" className="w-full">
          <LawyerHeadshotHero />
        </div>
        <div>
          <ExplainerSection />
          <PackHeadshotGallery {...lawyerBrandedConfig} />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}