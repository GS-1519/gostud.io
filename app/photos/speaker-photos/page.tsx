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
import SpeakerHero from "@/components/SpeakerHero";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Professional Speaker Photography | Public Speaking Portraits',
  description: 'Create impactful speaker portraits with AI photography. Perfect for keynote speakers, presenters, and public speaking professionals.',
  keywords: 'speaker photos, public speaking portraits, keynote speaker photography, professional headshots, presentation photos, speaker headshots',
  openGraph: {
    title: 'Professional Speaker Photography | Public Speaking Portraits',
    description: 'Create impactful speaker portraits with our AI photography studio',
    type: 'website',
    images: [{
      url: '/og/speaker-photos.jpg',
      width: 1200,
      height: 630,
      alt: 'Professional Speaker Photography'
    }],
  },
  alternates: {
    canonical: 'https://www.gostudio.ai/photos/speaker-photos'
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
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[82px]">
        <div className="w-full max-w-[1276px] mx-auto space-y-12">
          <div id="ai-headshots">
            <SpeakerHero/>
          </div>
          <Works
          image3="/speak.png"
          image2="/ted.png"
          />
          <Why imageSet="Group6" />
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