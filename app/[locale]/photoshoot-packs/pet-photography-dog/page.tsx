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

import DogHero from "@/components/DogHero";
import DogHeadshotHero from "@/components/Dog-Headshots";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Professional Pet Portrait Photography | Dog Photo Sessions',
  description: 'Create beautiful dog portraits with AI photography. Perfect for pet owners, dog lovers, and professional pet photography.',
  keywords: 'dog photos, pet portraits, animal photography, professional pet photos, dog photography, pet headshots',
  openGraph: {
    title: 'Professional Pet Portrait Photography | Dog Photo Sessions',
    description: 'Create beautiful dog portraits with our AI photography studio',
    type: 'website',
    images: [{
      url: '/og/dog-photos.jpg',
      width: 1200,
      height: 630,
      alt: 'Professional Dog Photography'
    }],
  }
}

export default async function DogPhotos() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return <ClientRedirect />;
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div>
        <div id="ai-headshots" className="w-full">
          <DogHero />
        </div>
        <div>
          <ExplainerSection />
          <DogHeadshotHero />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}