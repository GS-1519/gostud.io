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
import RedcarpetHeadshotHero from "@/components/Redcarpet-Headshots";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Glamorous Red Carpet Photography | Celebrity-Style Portraits',
  description: 'Create stunning red carpet-worthy photos with our AI photography. Get professional, celebrity-style portraits perfect for special events and formal occasions.',
  keywords: 'red carpet photos, celebrity style photography, formal portraits, event photography, glamour shots, professional headshots',
  openGraph: {
    title: 'Glamorous Red Carpet Photography | Celebrity-Style Portraits',
    description: 'Create stunning red carpet-worthy photos with our AI photography studio',
    type: 'website',
    images: [{
      url: '/og/red-carpet-photos.jpg',
      width: 1200,
      height: 630,
      alt: 'Red Carpet Photography'
    }],
  },
  alternates: {
    canonical: 'https://www.gostudio.ai/photos/red-carpet-photos'
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
            <CarpetHero/>
          </div>
          <Works
          
          image3="/Frame3.png"
          />
          <Why imageSet="Group11" />
          <div id="testimonial">
            <RedcarpetHeadshotHero/>
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