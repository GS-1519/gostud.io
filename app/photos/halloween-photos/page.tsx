import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'
import Works from "@/components/Works";
import Why from "@/components/Why";
import ReviewSection from "@/components/HeadshotReviewSection";

import Footer from "@/components/Footer";
import Banner from "@/components/Banner";

import HalloweenHero from "@/components/HalloweenHero";
import HalloweenHeadshotHero from "@/components/Halloween-Headshots";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Creative Halloween Portrait Photography | Spooky Photo Sessions',
  description: 'Create unique Halloween-themed portraits with AI photography. Perfect for costumes, parties, and seasonal social media content.',
  keywords: 'halloween photos, costume photography, spooky portraits, themed photoshoot, halloween headshots, seasonal photos',
  openGraph: {
    title: 'Creative Halloween Portrait Photography | Spooky Photo Sessions',
    description: 'Create unique Halloween-themed portraits with our AI photography studio',
    type: 'website',
    images: [{
      url: '/og/halloween-photos.jpg',
      width: 1200,
      height: 630,
      alt: 'Halloween Portrait Photography'
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
            <HalloweenHero/>
            
          </div>
          <Works
          
          
          image2="/Frame27.png"
          image3="/Frame28.png"
          />
          <Why imageSet="Group28" />
          <div id="testimonial">
            <HalloweenHeadshotHero/>
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