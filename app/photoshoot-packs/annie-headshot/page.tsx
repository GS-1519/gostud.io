import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ClientRedirect from "@/components/ClientRedirect";
import type { Metadata } from 'next'

import ReviewSection from "@/components/HeadshotReviewSection";

import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import ExplainerSection from "@/components/ExplainerSection";

import AnnieHero from "@/components/AnnieHero";
import AnnieHeadshotHero from "@/components/Annine-HeadshotsHero";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Annie Leibovitz Style Portrait Photography | Dramatic Professional Photos',
  description: 'Create stunning portraits inspired by Annie Leibovitz\'s iconic style. AI-powered photography that captures dramatic, editorial-quality images.',
  keywords: 'Annie Leibovitz style, editorial photography, dramatic portraits, professional photos, celebrity style photography, artistic headshots',
  openGraph: {
    title: 'Annie Leibovitz Style Portrait Photography | Dramatic Professional Photos',
    description: 'Create stunning Leibovitz-inspired portraits with our AI photography studio',
    type: 'website',
    images: [{
      url: '/og/annie-style-photos.jpg',
      width: 1200,
      height: 630,
      alt: 'Annie Leibovitz Style Photography'
    }],
  }
}

export default async function AnnieHeadshotPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return <ClientRedirect />;
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div>
        <div id="ai-headshots" className="w-full">
          <AnnieHero />
        </div>
        <div>
          <ExplainerSection />
          <AnnieHeadshotHero />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}