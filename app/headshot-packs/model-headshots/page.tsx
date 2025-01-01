import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ClientRedirect from "@/components/ClientRedirect";
import type { Metadata } from 'next'
import Works from "@/components/Works";
import Why from "@/components/Why";
import ReviewSection from "@/components/HeadshotReviewSection";

import Footer from "@/components/Footer";
import Banner from "@/components/Banner";

import NewtonHero from "@/components/NewtonHero";
import HelmutHeadshotHero from "@/components/Helmut-Headshots";
import ExplainerSection from "@/components/ExplainerSection";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Professional Model Headshots | Fashion & Portfolio Photography',
  description: 'Create stunning model headshots and portfolio images with our AI photography studio. Perfect for aspiring models, actors, and fashion professionals.',
  keywords: 'model headshots, fashion photography, portfolio photos, modeling photography, professional model photos, fashion portraits, model portfolio',
  openGraph: {
    title: 'Professional Model Headshots | Fashion & Portfolio Photography',
    description: 'Create stunning model headshots and portfolio images with our AI photography studio',
    type: 'website',
    images: [{
      url: '/og/model-headshots.jpg',
      width: 1200,
      height: 630,
      alt: 'Professional Model Headshot Examples'
    }],
  },
}

export default async function ModelPhotos() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return <ClientRedirect />;
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div>
        <div id="ai-headshots" className="w-full">
          <NewtonHero />
        </div>
        <div>
          <ExplainerSection />
          <HelmutHeadshotHero />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}