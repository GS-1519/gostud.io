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
import { partnersConfig } from '@/config/gallery-configs/partners';
import PartnerHero from "@/components/PartnerHero";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Partner Photography | Professional Business Portraits',
  description: 'Create professional partner portraits perfect for business and corporate settings.',
  keywords: 'partner headshots, business portraits, corporate photos, professional photography, executive headshots, company portraits, partner photography',
  openGraph: {
    title: 'Partner Photography | Professional Business Portraits',
    description: 'Create professional partner portraits with AI',
    type: 'website',
    images: [{
      url: '/og/partners.jpg',
      width: 1200,
      height: 630,
      alt: 'Partner Photography'
    }],
  }
}

export default async function PartnersPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return <ClientRedirect />;
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div>
        <div id="ai-headshots" className="w-full">
          <PartnerHero />
        </div>
        <div>
          <ExplainerSection />
          <PackHeadshotGallery {...partnersConfig} />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}