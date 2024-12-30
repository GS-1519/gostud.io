import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'

import ReviewSection from "@/components/HeadshotReviewSection";

import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import ExplainerSection from "@/components/ExplainerSection";

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
    <div>
      <div id="ai-headshots" className="w-full">
        <YoutubeHero/>
      </div>
      <div>
        <ExplainerSection />
        <YoutubeHeadshotHero/>
        <ReviewSection />
        <Banner />
        <Footer/>
      </div>
    </div>
  </div>
  );
}