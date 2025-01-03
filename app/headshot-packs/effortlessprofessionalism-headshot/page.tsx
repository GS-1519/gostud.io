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
import { effortlessProfessionalismConfig } from '@/config/gallery-configs/effortless-professionalism';
import ProfessionalismHero from "@/components/ProfessionalismHero";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Effortless Professional Photography | Natural Business Portraits',
  description: 'Create naturally professional portraits that blend casual confidence with business polish.',
  keywords: 'professional headshots, natural business photos, casual professional portraits, modern corporate photography, relaxed business headshots',
  openGraph: {
    title: 'Effortless Professional Photography | Natural Business Portraits',
    description: 'Create naturally professional portraits with AI',
    type: 'website',
    images: [{
      url: '/og/effortless-professional.jpg',
      width: 1200,
      height: 630,
      alt: 'Effortless Professional Photography'
    }],
  }
}

export default async function EffortlessProfessionalPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return <ClientRedirect />;
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div>
        <div id="ai-headshots" className="w-full">
        <ProfessionalismHero/>
        </div>
        <div>
          <ExplainerSection />
          <PackHeadshotGallery {...effortlessProfessionalismConfig} />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}