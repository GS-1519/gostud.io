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

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'AI Product Photography Studio | Professional Product Photos in Minutes',
  description: 'Transform your product photography with AI. Get studio-quality product photos instantly. Professional results at a fraction of the cost of traditional photo studios.',
  keywords: 'AI product photography, product photo studio, professional product photos, AI photo studio, e-commerce photography',
  openGraph: {
    title: 'AI Product Photography Studio | Professional Product Photos in Minutes',
    description: 'Transform your product photography with AI. Get studio-quality product photos instantly.',
    type: 'website',
    images: ['/og.png'],
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