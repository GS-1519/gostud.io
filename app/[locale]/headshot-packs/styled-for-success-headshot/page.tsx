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
import { styledForSuccessConfig } from '@/config/gallery-configs/styled-for-success';
import StyleHero from "@/components/StyleHero";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Styled for Success Photography | Professional Portrait Sessions',
  description: 'Create professionally styled portraits that exude confidence and success.',
  keywords: 'styled headshots, success portraits, professional styling, business photography, fashion headshots, polished portraits, styled photography',
  openGraph: {
    title: 'Styled for Success Photography | Professional Portrait Sessions',
    description: 'Create professionally styled portraits with AI',
    type: 'website',
    images: [{
      url: '/og/styled-for-success.jpg',
      width: 1200,
      height: 630,
      alt: 'Styled for Success Photography'
    }],
  }
}

export default async function StyledForSuccessPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return <ClientRedirect />;
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div>
        <div id="ai-headshots" className="w-full">
          <StyleHero />
        </div>
        <div>
          <ExplainerSection />
          <PackHeadshotGallery {...styledForSuccessConfig} />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}