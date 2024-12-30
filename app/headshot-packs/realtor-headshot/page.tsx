import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'

import ReviewSection from "@/components/HeadshotReviewSection";


import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import ExplainerSection from "@/components/ExplainerSection";

import RealtorHero from "@/components/RealtorHero";
import RealtorHeadshotHero from "@/components/Realtor-Headshots";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Professional Real Estate Agent Headshots | Realtor Photography',
  description: 'Create professional realtor headshots that build trust and credibility. AI-powered photos perfect for real estate websites, business cards, and marketing materials.',
  keywords: 'realtor headshots, real estate agent photos, professional realtor pictures, real estate photography, agent portraits',
  openGraph: {
    title: 'Professional Real Estate Agent Headshots | Realtor Photography',
    description: 'Create professional realtor headshots that build trust and credibility',
    type: 'website',
    images: [{
      url: '/og/realtor-photos.jpg',
      width: 1200,
      height: 630,
      alt: 'Professional Realtor Headshots'
    }],
  }
}

export default async function DoctorPhotos() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/overview");
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div>
        <div id="ai-headshots" className="w-full">
          <RealtorHero />
        </div>
        <div>
          <ExplainerSection />
          <RealtorHeadshotHero />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}