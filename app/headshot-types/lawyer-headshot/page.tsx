import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'
import Works from "@/components/Works";
import Why from "@/components/Why";
import ReviewSection from "@/components/HeadshotReviewSection";

import Footer from "@/components/Footer";
import Banner from "@/components/Banner";

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
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[82px]">
        <div className="w-full max-w-[1276px] mx-auto space-y-12">
          <div id="ai-headshots">
            <LawyerHero/>
          </div>
          <Works
          
          />
          <Why imageSet="Group9" />
          <div id="testimonial">
            <LawyerHeadshotHero/>
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