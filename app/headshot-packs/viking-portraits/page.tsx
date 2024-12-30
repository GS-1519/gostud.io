import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DatingHero  from "@/components/DatingHero";
import type { Metadata } from 'next'
import Works from "@/components/Works";
import Why from "@/components/Why";
import ReviewSection from "@/components/HeadshotReviewSection";
import ExplainerSection from "@/components/ExplainerSection";

import Footer from "@/components/Footer";
import Banner from "@/components/Banner";

import VikingsHero from "@/components/VikingsHero";
import VikingHeadshotHero from "@/components/Viking-Headshots";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Viking Style Portrait Photography | Nordic Warrior Photos',
  description: 'Create powerful Viking-inspired portraits with AI photography. Perfect for historical themes, fantasy shoots, and unique character portraits.',
  keywords: 'viking photos, nordic portraits, warrior photography, historical portraits, fantasy photos, character photography',
  openGraph: {
    title: 'Viking Style Portrait Photography | Nordic Warrior Photos',
    description: 'Create powerful Viking-inspired portraits with our AI photography studio',
    type: 'website',
    images: [{
      url: '/og/viking-photos.jpg',
      width: 1200,
      height: 630,
      alt: 'Viking Style Photography'
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
          <VikingsHero />
        </div>
        <div>
          <ExplainerSection />
          <VikingHeadshotHero/>
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}