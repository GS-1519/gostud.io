import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'
import Works from "@/components/Works";
import Why from "@/components/Why";
import ReviewSection from "@/components/HeadshotReviewSection";
import ExplainerSection from "@/components/ExplainerSection";


import Banner from "@/components/Banner";

import OnesieHero from "@/components/OnesieHero";
import OnesiesHeadshotHero from "@/components/Onesies-headshots";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Fun Onesie Portrait Photography | Casual Comfort Photos',
  description: 'Create playful and comfortable portraits in your favorite onesie with AI photography. Perfect for casual, fun-loving personalities.',
  keywords: 'onesie photos, casual portraits, fun photography, comfortable photoshoot, playful pictures, unique portraits',
  openGraph: {
    title: 'Fun Onesie Portrait Photography | Casual Comfort Photos',
    description: 'Create playful onesie portraits with our AI photography studio',
    type: 'website',
    images: [{
      url: '/og/onesie-photos.jpg',
      width: 1200,
      height: 630,
      alt: 'Onesie Portrait Photography'
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
          <OnesieHero />
        </div>
        <div>
          <ExplainerSection />
          <OnesiesHeadshotHero />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}