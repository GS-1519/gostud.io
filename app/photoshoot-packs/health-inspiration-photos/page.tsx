import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'

import ReviewSection from "@/components/HeadshotReviewSection";
import ExplainerSection from "@/components/ExplainerSection";

import Footer from "@/components/Footer";
import Banner from "@/components/Banner";

import HealthHero from "@/components/HealthHero";
import FitnessHeadshotHero from "@/components/Fitness-Headshots";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Professional Fitness & Wellness Photography | Health Coach Photos',
  description: 'Create powerful fitness and wellness portraits with AI photography. Perfect for health coaches, personal trainers, and wellness professionals.',
  keywords: 'fitness photography, health coach photos, wellness portraits, gym photos, personal trainer headshots, athletic photography',
  openGraph: {
    title: 'Professional Fitness & Wellness Photography | Health Coach Photos',
    description: 'Create powerful fitness and wellness portraits with our AI photography studio',
    type: 'website',
    images: [{
      url: '/og/health-fitness-photos.jpg',
      width: 1200,
      height: 630,
      alt: 'Fitness and Wellness Photography'
    }],
  }
}

export default async function DoctorPhotos() {
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
          <HealthHero />
        </div>
        <div>
          <ExplainerSection />
          <FitnessHeadshotHero />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}