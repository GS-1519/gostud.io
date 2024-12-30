import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'

import ReviewSection from "@/components/HeadshotReviewSection";

import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import ExplainerSection from "@/components/ExplainerSection";

import LawyerHero from "@/components/LawyerHero";
import LawyerHeadshotHero from "@/components/LawyerHeadshotHero";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Professional Attorney Headshots | Legal Professional Photography',
  description: 'Create professional lawyer headshots that convey trust and expertise. AI-powered photos perfect for law firm websites, legal directories, and professional profiles.',
  keywords: 'lawyer headshots, attorney photos, legal professional pictures, law firm photography, professional lawyer portraits',
  openGraph: {
    title: 'Professional Attorney Headshots | Legal Professional Photography',
    description: 'Create professional lawyer headshots that convey trust and expertise',
    type: 'website',
    images: [{
      url: '/og/lawyer-photos.jpg',
      width: 1200,
      height: 630,
      alt: 'Professional Lawyer Headshots'
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
        <LawyerHero/>
      </div>
      <div>
        <ExplainerSection />
        <LawyerHeadshotHero/>
        <ReviewSection />
        <Banner />
        <Footer/>
      </div>
    </div>
  </div>
  );
}