import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'

import ReviewSection from "@/components/HeadshotReviewSection";
import ExplainerSection from "@/components/ExplainerSection";

import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import BotanicalHero from "@/components/BotanicalHero";
import BotanicalHeadshotHero from "@/components/Botnical-Headshot";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Botanical Portrait Photography | Nature-Inspired Professional Photos',
  description: 'Create elegant portraits with botanical and natural elements using AI photography. Perfect for organic, natural-looking professional photos.',
  keywords: 'botanical photography, nature portraits, garden photos, floral photography, natural headshots, organic portraits',
  openGraph: {
    title: 'Botanical Portrait Photography | Nature-Inspired Professional Photos',
    description: 'Create elegant botanical portraits with our AI photography studio',
    type: 'website',
    images: [{
      url: '/og/botanical-photos.jpg',
      width: 1200,
      height: 630,
      alt: 'Botanical Portrait Photography'
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
        <BotanicalHero/>
      </div>
      <div>
        <ExplainerSection />
        <BotanicalHeadshotHero />
        <ReviewSection />
        <Banner />
        <Footer/>
      </div>
    </div>
  </div>
  );
}