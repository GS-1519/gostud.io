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
import MythHero from "@/components/MythHero";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Fantasy & Mythical Portrait Photography | Creative Character Photos',
  description: 'Create enchanting fantasy and mythical portraits with AI photography. Perfect for character portraits, cosplay, and creative storytelling.',
  keywords: 'fantasy photography, mythical portraits, character photos, cosplay photography, creative portraits, fantasy headshots',
  openGraph: {
    title: 'Fantasy & Mythical Portrait Photography | Creative Character Photos',
    description: 'Create enchanting fantasy portraits with our AI photography studio',
    type: 'website',
    images: [{
      url: '/og/mythical-photos.jpg',
      width: 1200,
      height: 630,
      alt: 'Fantasy Portrait Photography'
    }],
  },
  alternates: {
    canonical: 'https://www.gostudio.ai/photos/mythical-photos'
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
            <MythHero/>
          </div>
          <Works
          image3="/Frame14.png"
          />
          <Why imageSet="Group18" />
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