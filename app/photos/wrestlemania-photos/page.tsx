import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'
import Works from "@/components/Works";
import Why from "@/components/Why";
import ReviewSection from "@/components/HeadshotReviewSection";

import Footer from "@/components/Footer";
import Banner from "@/components/Banner";

import WrestlemaniaHero from "@/components/WrestlemaniaHero";
import WrestlemaniaHeadshotHero from "@/components/Wrestlemania-Headshots";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Professional Wrestling Portrait Photography | Wrestlemania Style',
  description: 'Create powerful wrestling-inspired portraits with AI photography. Perfect for wrestling enthusiasts, performers, and sports entertainment.',
  keywords: 'wrestling portraits, wrestlemania style, sports photography, wrestling photos, action portraits, entertainment photography',
  openGraph: {
    title: 'Professional Wrestling Portrait Photography | Wrestlemania Style',
    description: 'Create powerful wrestling-inspired portraits with our AI studio',
    type: 'website',
    images: [{
      url: '/og/wrestlemania-photos.jpg',
      width: 1200,
      height: 630,
      alt: 'Wrestling Style Portrait Photography'
    }],
  },
  alternates: {
    canonical: 'https://www.gostudio.ai/photos/wrestlemania-photos'
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
            <WrestlemaniaHero/>
          </div>
          <Works
          
          
          image2="/Frame8.png"
          image3="/Frame23.png"
          />
          <Why imageSet="Group24" />
          <div id="testimonial">
            <WrestlemaniaHeadshotHero/>
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