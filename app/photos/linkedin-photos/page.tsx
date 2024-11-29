import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'
import Works from "@/components/Works";
import Why from "@/components/Why";
import ReviewSection from "@/components/HeadshotReviewSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/Question";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";

import LinkedlnHero from "@/components/LinkedlnHero";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Professional LinkedIn Headshots | AI-Powered Business Portraits',
  description: 'Create professional LinkedIn profile photos in minutes. Get AI-powered business headshots that make you stand out. Perfect for executives, entrepreneurs, and professionals.',
  keywords: 'linkedin headshots, professional profile picture, business portrait, corporate headshot, AI headshot, professional photo',
  openGraph: {
    title: 'Professional LinkedIn Headshots | AI-Powered Business Portraits',
    description: 'Create professional LinkedIn profile photos that make you stand out',
    type: 'website',
    images: [{
      url: '/og/linkedin-headshots.jpg',
      width: 1200,
      height: 630,
      alt: 'Professional LinkedIn Headshots'
    }],
  },
  alternates: {
    canonical: 'https://www.gostudio.ai/photos/linkedin-photos'
  }
}

export default async function LinkedInPhotos() {
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
            <LinkedlnHero/>
          </div>
          <Works
          image3="/Group2.png"
          />
          <Why imageSet="Group7" />
          <div id="testimonial">
            <ReviewSection/>
          </div>
          <div id="pricing">
            <PricingSection user={user} />
          </div>
        
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