import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'
import Works from "@/components/Works";
import Why from "@/components/Why";
import ReviewSection from "@/components/HeadshotReviewSection";

import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import ExplainerSection from "@/components/ExplainerSection";

import ArtisticHero from "@/components/ArtisticHero";
import ArtisticHeadshotHero from "@/components/Artistic-Headshots";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Creative Artistic Portrait Photography | Fine Art Photos',
  description: 'Transform your portraits into stunning fine art photography with AI. Create unique, artistic photos that capture emotion and creativity.',
  keywords: 'artistic photography, fine art portraits, creative photos, artistic headshots, contemporary portraits, artistic style photos',
  openGraph: {
    title: 'Creative Artistic Portrait Photography | Fine Art Photos',
    description: 'Create unique artistic portraits with our AI photography studio',
    type: 'website',
    images: [{
      url: '/og/artistic-photos.jpg',
      width: 1200,
      height: 630,
      alt: 'Artistic Portrait Photography'
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
          <ArtisticHero/>
        </div>
        <div>
          <ExplainerSection />
          <ArtisticHeadshotHero />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
    
  );
}