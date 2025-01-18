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
import { romanticMaternityConfig } from '@/config/gallery-configs/romantic-maternity';

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Romantic Maternity Photography | Beautiful Pregnancy Portraits',
  description: 'Create beautiful and romantic maternity portraits. Perfect for capturing the magic of pregnancy and celebrating new life.',
  keywords: 'maternity photos, pregnancy portraits, romantic photography, pregnancy photos, maternity shoot, pregnancy memories, baby bump, maternity portraits',
  openGraph: {
    title: 'Romantic Maternity Photography | Beautiful Pregnancy Portraits',
    description: 'Create beautiful maternity portraits with AI',
    type: 'website',
    images: [{
      url: '/og/romantic-maternity.jpg',
      width: 1200,
      height: 630,
      alt: 'Romantic Maternity Photography'
    }],
  }
}

export default async function RomanticMaternityPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return <ClientRedirect />;
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div>
        <div id="ai-headshots" className="w-full">
          <PackHero config={heroConfigs['romantic-maternity']} />
        </div>
        <div>
          <ExplainerSection />
          <PackHeadshotGallery {...romanticMaternityConfig} />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}
