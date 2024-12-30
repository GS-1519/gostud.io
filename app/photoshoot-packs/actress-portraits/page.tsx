import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'

import ReviewSection from "@/components/HeadshotReviewSection";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import WednesdayHero from "@/components/WednesdayHero";
import WednesdayHeadshotHero from "@/components/Wednesday-Headshots";
import ExplainerSection from "@/components/ExplainerSection";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Wednesday Addams Style Portrait Photography | Gothic Photos',
  description: 'Create mysterious and gothic portraits inspired by Wednesday Addams with AI photography. Perfect for dark aesthetic and character portraits.',
  keywords: 'wednesday addams style, gothic portraits, dark photography, character photos, mysterious portraits, themed photography',
  openGraph: {
    title: 'Wednesday Addams Style Portrait Photography | Gothic Photos',
    description: 'Create mysterious Wednesday Addams-inspired portraits with our AI studio',
    type: 'website',
    images: [{
      url: '/og/wednesday-addams-photos.jpg',
      width: 1200,
      height: 630,
      alt: 'Wednesday Addams Style Photography'
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
          <WednesdayHero/>
        </div>
        <div>
          <ExplainerSection />
          <WednesdayHeadshotHero />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}
  