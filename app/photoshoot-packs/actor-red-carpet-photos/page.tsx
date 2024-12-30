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

import CarpetHero from "@/components/CarpetHero";
import RedcarpetHeadshotHero from "@/components/Redcarpet-Headshots";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Glamorous Red Carpet Photography | Celebrity-Style Portraits',
  description: 'Create stunning red carpet-worthy photos with our AI photography. Get professional, celebrity-style portraits perfect for special events and formal occasions.',
  keywords: 'red carpet photos, celebrity style photography, formal portraits, event photography, glamour shots, professional headshots',
  openGraph: {
    title: 'Glamorous Red Carpet Photography | Celebrity-Style Portraits',
    description: 'Create stunning red carpet-worthy photos with our AI photography studio',
    type: 'website',
    images: [{
      url: '/og/red-carpet-photos.jpg',
      width: 1200,
      height: 630,
      alt: 'Red Carpet Photography'
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
          <CarpetHero />
        </div>
        <div>
          <ExplainerSection />
          <RedcarpetHeadshotHero />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}