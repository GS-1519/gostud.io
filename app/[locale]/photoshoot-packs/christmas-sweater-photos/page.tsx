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

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Christmas Sweater Portraits | Festive Holiday Photos',
  description: 'Create fun and festive Christmas sweater portraits. Perfect for holiday cards, office parties, and spreading seasonal cheer.',
  keywords: 'christmas sweater, holiday photos, festive portraits, ugly sweater, christmas cards, holiday party, seasonal photos, festive photography',
  openGraph: {
    title: 'Christmas Sweater Portraits | Festive Holiday Photos',
    description: 'Create fun Christmas sweater portraits with AI',
    type: 'website',
    images: [{
      url: '/og/christmas-sweater.jpg',
      width: 1200,
      height: 630,
      alt: 'Christmas Sweater Portrait Photography'
    }],
  }
}

export default async function ChristmasSweaterPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return <ClientRedirect />;
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div>
        <div id="ai-headshots" className="w-full">
          <PackHero config={heroConfigs['christmas-sweater']} />
        </div>
        <div>
          <ExplainerSection />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}
