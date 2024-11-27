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
  },
  alternates: {
    canonical: 'https://www.gostudio.ai/photos/barbie-photos'
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
            <BarbieHero/>
          </div>
          <Works
          
          image2="/Frame8.png"
          image3="/Frame9.png"
          />
          <Why imageSet="Group14" />
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