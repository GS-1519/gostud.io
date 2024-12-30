import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'

import ReviewSection from "@/components/HeadshotReviewSection";
import ExplainerSection from "@/components/ExplainerSection";

import Footer from "@/components/Footer";
import Banner from "@/components/Banner";

import BarbieHero from "@/components/BarbieHero";
import BarbieHeadshotHero from "@/components/Barbie-Headshots";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Barbie-Style Portrait Photography | Stylized Fashion Photos',
  description: 'Transform your photos with our Barbie-inspired AI photography. Create stunning, stylized portraits with a perfect blend of fashion and fantasy.',
  keywords: 'barbie style photos, fashion photography, stylized portraits, aesthetic pictures, pink photography, doll-like photos',
  openGraph: {
    title: 'Barbie-Style Portrait Photography | Stylized Fashion Photos',
    description: 'Create stunning Barbie-inspired portraits with our AI photography studio',
    type: 'website',
    images: [{
      url: '/og/barbie-photos.jpg',
      width: 1200,
      height: 630,
      alt: 'Barbie-Style Portrait Photography'
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
          <BarbieHero />
        </div>
        <div>
          <ExplainerSection />
          <BarbieHeadshotHero/>
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}