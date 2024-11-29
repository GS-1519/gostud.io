import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'

import ReviewSection from "@/components/HeadshotReviewSection";
import PricingSection from "@/components/PricingSection";
import DataSecuritySection from "@/components/container";
import FAQSection from "@/components/Question";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import LibraryHero from "@/components/LibraryHero";
import Tools from "@/components/Tools";
import WhiteHero from "@/components/WhiteHero";
import FreeCard from "@/components/freecard";
import Usage from "@/components/Usage";
import BlackHero from "@/components/BlackHero";
import AbstractHero from "@/components/AbstractHero";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Free Abstract Background Generator | Creative Photography Backgrounds',
  description: 'Create stunning abstract backgrounds for creative photography. Generate unique patterns and textures with our AI-powered tool.',
  keywords: 'abstract background, creative background, artistic background, photography background, AI background generator',
  openGraph: {
    title: 'Free Abstract Background Generator',
    description: 'Create stunning abstract backgrounds for creative photography',
    images: [{
      url: '/og/abstract-background.jpg',
      width: 1200,
      height: 630,
      alt: 'Abstract Background Generator'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Abstract Background Generator',
    description: 'Create stunning abstract backgrounds for creative photography',
    images: ['/og/abstract-background.jpg']
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
            <AbstractHero/>
          </div>
          <div id="ai-headshots">
            <FreeCard backgroundImage="/Background10.png" />
          </div>
          <div id="ai-headshots">
          <Usage backgroundImage="/Background11.png" />
          </div>
          {/* <div id="ai-headshots">
          <Tools/>
          </div> */}
       
          
          
          <div id="faq">
            <FAQSection />
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