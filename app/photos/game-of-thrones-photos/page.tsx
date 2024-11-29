import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'
import Works from "@/components/Works";
import Why from "@/components/Why";
import ReviewSection from "@/components/HeadshotReviewSection";

import Footer from "@/components/Footer";
import Banner from "@/components/Banner";

import GamesHero from "@/components/GamesHero";
import GameOfThronesHeadshotHero from "@/components/Games-Of-Thrones-Headshots";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Game of Thrones Style Portrait Photography | Fantasy Photos',
  description: 'Create epic Game of Thrones inspired portraits with AI photography. Perfect for fantasy themes, character portraits, and dramatic photos.',
  keywords: 'game of thrones style, fantasy portraits, medieval photos, character photography, dramatic portraits, themed photography',
  openGraph: {
    title: 'Game of Thrones Style Portrait Photography | Fantasy Photos',
    description: 'Create epic Game of Thrones inspired portraits with our AI studio',
    type: 'website',
    images: [{
      url: '/og/got-photos.jpg',
      width: 1200,
      height: 630,
      alt: 'Game of Thrones Style Photography'
    }],
  },
  alternates: {
    canonical: 'https://www.gostudio.ai/photos/game-of-thrones-photos'
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
            <GamesHero/>
          </div>
          <Works
          image2="/Frame16.png"
          image3="/Frame17.png"
          />
          <Why imageSet="Group20" />
          <div id="testimonial">
            <GameOfThronesHeadshotHero/>
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