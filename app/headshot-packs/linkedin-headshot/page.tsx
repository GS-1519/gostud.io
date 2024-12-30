import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'

import ReviewSection from "@/components/HeadshotReviewSection";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import LinkedlnHero from "@/components/LinkedlnHero";
import ExplainerSection from "@/components/ExplainerSection";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Professional LinkedIn Headshots | AI-Powered Business Portraits',
  description: 'Create professional LinkedIn profile photos in minutes. Get AI-powered business headshots that make you stand out.',
  keywords: 'linkedin headshots, professional profile picture, business portrait, corporate headshot',
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
    <div>
      <div id="ai-headshots" className="w-full">
        <LinkedlnHero />
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