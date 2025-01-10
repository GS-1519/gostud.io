import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ClientRedirect from "@/components/ClientRedirect";
import type { Metadata } from 'next'
import Works from "@/components/Works";
import Why from "@/components/Why";
import ReviewSection from "@/components/HeadshotReviewSection";
import ExplainerSection from "@/components/ExplainerSection";

import Footer from "@/components/Footer";
import Banner from "@/components/Banner";

import GamesHero from "@/components/GamesHero";
import GameOfThronesHeadshotHero from "@/components/Games-Of-Thrones-Headshots";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Game of Thrones Style Portrait Photography | Fantasy Photos',
  description: 'Create epic Game of Thrones inspired portraits with AI photography. Perfect for fantasy themes, character portraits, and dramatic photos.',
  keywords: 'game of thrones style, fantasy portraits, medieval photos, character photography, dramatic portraits, themed photography',
  openGraph: {
    title: 'Game of Thrones Style Portrait Photography | Fantasy Photos',
    description: 'Create epic Game of Thrones inspired portraits with our AI studio',
    type: 'website',
    images: [{
      url: '/og/got-photos.jpg',
      width: 1200,
      height: 630,
      alt: 'Game of Thrones Style Photography'
    }],
  }
}

export default async function GameOfThronesPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return <ClientRedirect />;
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div>
        <div id="ai-headshots" className="w-full">
          <GamesHero />
        </div>
        <div>
          <ExplainerSection />
          <GameOfThronesHeadshotHero />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}