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

import WrestlemaniaHero from "@/components/WrestlemaniaHero";
import WrestlemaniaHeadshotHero from "@/components/Wrestlemania-Headshots";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Professional Wrestling Portrait Photography | Wrestlemania Style',
  description: 'Create powerful wrestling-inspired portraits with AI photography. Perfect for wrestling enthusiasts, performers, and sports entertainment.',
  keywords: 'wrestling portraits, wrestlemania style, sports photography, wrestling photos, action portraits, entertainment photography',
  openGraph: {
    title: 'Professional Wrestling Portrait Photography | Wrestlemania Style',
    description: 'Create powerful wrestling-inspired portraits with our AI studio',
    type: 'website',
    images: [{
      url: '/og/wrestlemania-photos.jpg',
      width: 1200,
      height: 630,
      alt: 'Wrestling Style Portrait Photography'
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
        <WrestlemaniaHero/>
      </div>
      <div>
        <ExplainerSection />
        <WrestlemaniaHeadshotHero />
        <ReviewSection />
        <Banner />
        <Footer/>
      </div>
    </div>
  </div>
  );
}