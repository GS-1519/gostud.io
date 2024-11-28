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
import HelmutHeadshotHero from "@/components/Helmut-Headshots";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Helmut Newton Style Photography | Bold Fashion Portraits',
  description: 'Create powerful portraits inspired by Helmut Newton\'s iconic style. AI-powered photography that captures bold, dramatic, and sophisticated images.',
  keywords: 'Helmut Newton style, fashion photography, black and white portraits, dramatic photos, editorial photography, artistic portraits',
  openGraph: {
    title: 'Helmut Newton Style Photography | Bold Fashion Portraits',
    description: 'Create powerful Newton-inspired portraits with our AI photography studio',
    type: 'website',
    images: [{
      url: '/og/newton-style-photos.jpg',
      width: 1200,
      height: 630,
      alt: 'Helmut Newton Style Photography'
    }],
  },
  alternates: {
    canonical: 'https://www.gostudio.ai/photos/helmut-newton-photos'
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
            <NewtonHero/>
          </div>
          <Works
          
          
          image3="/Frame11.png"
          image2="/Frame8.png"
          />
          <Why imageSet="Group16" />
          <div id="testimonial">
            <HelmutHeadshotHero/>
          </div>
          <div id="testimonial">
            <ReviewSection/>
          </div>
          <div id="pricing">
            <PricingSection user={user} />
          </div>
          <DataSecuritySection />
          <div id="faq">
            <FAQSection />
          </div>
          <div>
            <Banner/>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}