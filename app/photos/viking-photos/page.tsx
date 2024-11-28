import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DatingHero  from "@/components/DatingHero";
import type { Metadata } from 'next'
import Works from "@/components/Works";
import Why from "@/components/Why";
import ReviewSection from "@/components/HeadshotReviewSection";
import PricingSection from "@/components/PricingSection";
import DataSecuritySection from "@/components/container";
import FAQSection from "@/components/Question";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import DoctorHero from "@/components/DoctorHero";
import JcrewHero from "@/components/JcrewHero";
import HealthHero from "@/components/HealthHero";
import LinkedlnHero from "@/components/LinkedlnHero";
import TattoHero from "@/components/TattoHero";
import CarpetHero from "@/components/CarpetHero";
import BirthdayHero from "@/components/BirthdayHero";
import GlamourHero from "@/components/GlamourHero";
import BarbieHero from "@/components/BarbieHero";
import AnnieHero from "@/components/AnnieHero";
import NewtonHero from "@/components/NewtonHero";
import VikingsHero from "@/components/VikingsHero";
import VikingHeadshotHero from "@/components/Viking-Headshots";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Viking Style Portrait Photography | Nordic Warrior Photos',
  description: 'Create powerful Viking-inspired portraits with AI photography. Perfect for historical themes, fantasy shoots, and unique character portraits.',
  keywords: 'viking photos, nordic portraits, warrior photography, historical portraits, fantasy photos, character photography',
  openGraph: {
    title: 'Viking Style Portrait Photography | Nordic Warrior Photos',
    description: 'Create powerful Viking-inspired portraits with our AI photography studio',
    type: 'website',
    images: [{
      url: '/og/viking-photos.jpg',
      width: 1200,
      height: 630,
      alt: 'Viking Style Photography'
    }],
  },
  alternates: {
    canonical: 'https://www.gostudio.ai/photos/viking-photos'
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
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[82px]">
        <div className="w-full max-w-[1276px] mx-auto space-y-12">
          <div id="ai-headshots">
            <VikingsHero/>
          </div>
          <Works
          
          
          
          image2="/Frame12.png"
          image3="/Frame13.png"
          />
          <Why imageSet="Group17" />
          <div id="testimonial">
            <VikingHeadshotHero/>
          </div>
          <div id="testimonial">
            <ReviewSection/>
          </div>
         
          <DataSecuritySection />
          
          <div>
            <Banner/>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}