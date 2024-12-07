import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DatingHero  from "@/components/DatingHero";
import type { Metadata } from 'next'
import Works from "@/components/Works";
import Why from "@/components/Why";
import ReviewSection from "@/components/HeadshotReviewSection";

import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import DatingHeadshotHero from "@/components/Dating-Headshots";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Professional Dating Profile Photography | Natural Portrait Sessions',
  description: 'Create authentic dating profile photos with AI photography. Perfect for dating apps, online profiles, and natural professional portraits.',
  keywords: 'dating profile photos, online dating photography, profile pictures, natural portraits, dating app photos, authentic headshots',
  openGraph: {
    title: 'Professional Dating Profile Photography | Natural Portrait Sessions',
    description: 'Create authentic dating profile photos with our AI photography studio',
    type: 'website',
    images: [{
      url: '/og/dating-photos.jpg',
      width: 1200,
      height: 630,
      alt: 'Professional Dating Profile Photography'
    }],
  },
  alternates: {
    canonical: 'https://www.gostudio.ai/photos/dating-photos'
  }
}

export default async function DatingPhotos() {
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
            <DatingHero />
          </div>
          <Works/>
          <Why/>
          <div id="testimonial">
            <DatingHeadshotHero/>
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