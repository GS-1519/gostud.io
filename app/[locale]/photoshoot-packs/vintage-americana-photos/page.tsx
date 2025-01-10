import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ClientRedirect from "@/components/ClientRedirect";
import type { Metadata } from 'next'

import ReviewSection from "@/components/HeadshotReviewSection";
import ExplainerSection from "@/components/ExplainerSection";

import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import AmericanaHero from "@/components/AmericanaHero";
import AmericanoHeadshotHero from "@/components/Americano-HeadshotsHero";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Americana Style Portrait Photography | Classic American Photos',
  description: 'Create authentic Americana-style portraits with AI photography. Capture the classic American spirit in professional, timeless photos.',
  keywords: 'americana photography, american style photos, classic portraits, vintage americana, traditional headshots, patriotic photos',
  openGraph: {
    title: 'Americana Style Portrait Photography | Classic American Photos',
    description: 'Create authentic Americana-style portraits with our AI photography studio',
    type: 'website',
    images: [{
      url: '/og/americana-photos.jpg',
      width: 1200,
      height: 630,
      alt: 'Americana Style Photography'
    }],
  }
}

export default async function LinkedInPhotos() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return <ClientRedirect />;
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div>
        <div id="ai-headshots" className="w-full">
          <AmericanaHero />
        </div>
        <div>
          <ExplainerSection />
          <AmericanoHeadshotHero />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}