import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ClientRedirect from "@/components/ClientRedirect";
import { redirect } from "next/navigation";

import type { Metadata } from 'next'
import Works from "@/components/Works";
import Why from "@/components/Why";
import ReviewSection from "@/components/HeadshotReviewSection";
import ExplainerSection from "@/components/ExplainerSection";

import Footer from "@/components/Footer";
import Banner from "@/components/Banner";

import TattoHero from "@/components/TattoHero";
import TattooHeadshotHero from "@/components/Tattoo-Headshots";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Artistic Tattoo Style Portrait Photography | Alternative Photos',
  description: 'Create unique tattoo-inspired portraits with AI photography. Perfect for artists, alternative styles, and creative expression.',
  keywords: 'tattoo style portraits, alternative photography, artistic photos, creative portraits, edgy headshots, tattoo artist photography',
  openGraph: {
    title: 'Artistic Tattoo Style Portrait Photography | Alternative Photos',
    description: 'Create unique tattoo-inspired portraits with our AI photography studio',
    type: 'website',
    images: [{
      url: '/og/tattoo-style-photos.jpg',
      width: 1200,
      height: 630,
      alt: 'Tattoo Style Portrait Photography'
    }],
  }
}

export default async function TattooPhotos() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return <ClientRedirect />;
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div>
        <div id="ai-headshots" className="w-full">
          <TattoHero />
        </div>
        <div>
          <ExplainerSection />
          <TattooHeadshotHero />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}