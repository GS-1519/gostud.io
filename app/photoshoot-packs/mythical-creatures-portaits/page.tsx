import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'

import ReviewSection from "@/components/HeadshotReviewSection";
import ExplainerSection from "@/components/ExplainerSection";

import Footer from "@/components/Footer";
import Banner from "@/components/Banner";


import MythHero from "@/components/MythHero";
import MythicalHeadshotHero from "@/components/Mytical-Headshots";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Fantasy & Mythical Portrait Photography | Creative Character Photos',
  description: 'Create enchanting fantasy and mythical portraits with AI photography. Perfect for character portraits, cosplay, and creative storytelling.',
  keywords: 'fantasy photography, mythical portraits, character photos, cosplay photography, creative portraits, fantasy headshots',
  openGraph: {
    title: 'Fantasy & Mythical Portrait Photography | Creative Character Photos',
    description: 'Create enchanting fantasy portraits with our AI photography studio',
    type: 'website',
    images: [{
      url: '/og/mythical-photos.jpg',
      width: 1200,
      height: 630,
      alt: 'Fantasy Portrait Photography'
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
          <MythHero/>
        </div>
        <div>
          <ExplainerSection />
          <MythicalHeadshotHero/>
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}