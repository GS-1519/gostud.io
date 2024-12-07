import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'
import Works from "@/components/Works";
import Why from "@/components/Why";
import ReviewSection from "@/components/HeadshotReviewSection";

import Footer from "@/components/Footer";
import Banner from "@/components/Banner";

import YoutubeHero from "@/components/YoutubeHero";
import YoutubeHeadshotHero from "@/components/Youtube-Headshots";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'YouTube Thumbnail & Reaction Photos | Content Creator Photography',
  description: 'Create engaging YouTube thumbnail and reaction photos with AI photography. Perfect for content creators, vloggers, and social media influencers.',
  keywords: 'youtube thumbnails, reaction photos, content creator photography, vlogger photos, social media portraits, influencer photography',
  openGraph: {
    title: 'YouTube Thumbnail & Reaction Photos | Content Creator Photography',
    description: 'Create engaging YouTube photos with our AI photography studio',
    type: 'website',
    images: [{
      url: '/og/youtube-reaction-photos.jpg',
      width: 1200,
      height: 630,
      alt: 'YouTube Content Creator Photography'
    }],
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
            <YoutubeHero/>
          </div>
          <Works
           image1="/Group4.png"
            image2="/Group5.png"
          />
          <Why imageSet="tubefram" />
          <div id="testimonial">
            <YoutubeHeadshotHero/>
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