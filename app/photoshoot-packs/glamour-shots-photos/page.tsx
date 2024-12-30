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

import GlamourHero from "@/components/GlamourHero";
import GlamourHeadshotHero from "@/components/Photoshots-Headshot";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'AI Product Photography Studio | Professional Product Photos in Minutes',
  description: 'Transform your product photography with AI. Get studio-quality product photos instantly. Professional results at a fraction of the cost of traditional photo studios.',
  keywords: 'AI product photography, product photo studio, professional product photos, AI photo studio, e-commerce photography',
  openGraph: {
    title: 'AI Product Photography Studio | Professional Product Photos in Minutes',
    description: 'Transform your product photography with AI. Get studio-quality product photos instantly.',
    type: 'website',
    images: ['/og.png'],
  }
}

export default async function glamour() {
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
        <GlamourHero/>
      </div>
      <div>
        <ExplainerSection />
        <GlamourHeadshotHero />
        <ReviewSection />
        <Banner />
        <Footer/>
      </div>
    </div>
  </div>
  );
}