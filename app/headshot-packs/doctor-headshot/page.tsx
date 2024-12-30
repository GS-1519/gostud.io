import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'

import ReviewSection from "@/components/HeadshotReviewSection";
import ExplainerSection from "@/components/ExplainerSection";

import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import DoctorHero from "@/components/DoctorHero";
import DoctorHeadshotHero from "@/components/Doctor-Headshots";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Professional Medical Photography | Doctor Headshots',
  description: 'Create professional medical portraits with AI photography. Perfect for healthcare professionals, doctors, and medical practices.',
  keywords: 'doctor photos, medical headshots, healthcare photography, physician portraits, professional medical photos, hospital photography',
  openGraph: {
    title: 'Professional Medical Photography | Doctor Headshots',
    description: 'Create professional medical portraits with our AI photography studio',
    type: 'website',
    images: [{
      url: '/og/doctor-photos.jpg',
      width: 1200,
      height: 630,
      alt: 'Professional Medical Photography'
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
          <DoctorHero />
        </div>
        <div>
          <ExplainerSection />
          <DoctorHeadshotHero />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}