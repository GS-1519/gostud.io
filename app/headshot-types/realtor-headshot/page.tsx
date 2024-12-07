import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'
import Works from "@/components/Works";
import Why from "@/components/Why";
import ReviewSection from "@/components/HeadshotReviewSection";


import Footer from "@/components/Footer";
import Banner from "@/components/Banner";

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
  },
  alternates: {
    canonical: 'https://www.gostudio.ai/photos/realtor-photos'
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
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[82px]">
        <div className="w-full max-w-[1276px] mx-auto space-y-12">
          <div id="ai-headshots">
            <RealtorHero/>
          </div>
          <Works
          image3="/speak.png"
          image2="/ted.png"
          />
          <Why imageSet="Group8" />
          <div id="testimonial">
            <RealtorHeadshotHero/>
          </div>
          <div id="testimonial">
            <ReviewSection/>
          </div>
          
        
          
          <div>
            <Banner/>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}