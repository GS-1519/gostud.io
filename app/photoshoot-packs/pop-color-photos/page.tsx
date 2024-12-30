import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'
import Works from "@/components/Works";
import Why from "@/components/Why";
import ReviewSection from "@/components/HeadshotReviewSection";

import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import ColorHero from "@/components/ColorHero";
import BoldHeadshotHero from "@/components/Bold-Headshots";
import ExplainerSection from "@/components/ExplainerSection";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Vibrant Color Portrait Photography | Bold Professional Photos',
  description: 'Create striking portraits with bold, vibrant colors using AI photography. Perfect for modern professionals, creatives, and social media influencers.',
  keywords: 'color photography, vibrant portraits, bold photos, colorful headshots, modern portraits, creative photography',
  openGraph: {
    title: 'Vibrant Color Portrait Photography | Bold Professional Photos',
    description: 'Create striking portraits with bold, vibrant colors using our AI studio',
    type: 'website',
    images: [{
      url: '/og/bold-color-photos.jpg',
      width: 1200,
      height: 630,
      alt: 'Bold Color Portrait Photography'
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
        <ColorHero/>
      </div>
      <div>
        <ExplainerSection />
        <BoldHeadshotHero/>
        <ReviewSection />
        <Banner />
        <Footer/>
      </div>
    </div>
  </div>
  );
}