import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'
import Works from "@/components/Works";
import Why from "@/components/Why";
import ReviewSection from "@/components/HeadshotReviewSection";
import ExplainerSection from "@/components/ExplainerSection";

import Footer from "@/components/Footer";
import Banner from "@/components/Banner";

import BirthdayHero from "@/components/BirthdayHero";
import BirthdayHeadshotHero from "@/components/Birthday-Headshots";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Professional Kids Birthday Photography | Memorable Celebration Photos',
  description: 'Capture magical birthday moments with our AI-powered kids photography. Create professional, fun-filled photos perfect for celebrations and memories.',
  keywords: 'kids birthday photos, children photography, birthday photoshoot, celebration pictures, party photos, child portraits',
  openGraph: {
    title: 'Professional Kids Birthday Photography | Memorable Celebration Photos',
    description: 'Create magical birthday photos with our AI photography studio',
    type: 'website',
    images: [{
      url: '/og/kids-birthday-photos.jpg',
      width: 1200,
      height: 630,
      alt: 'Kids Birthday Photography'
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
          <BirthdayHero/>
        </div>
        <div>
          <ExplainerSection />
          <BirthdayHeadshotHero />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}