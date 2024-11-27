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
  },
  alternates: {
    canonical: 'https://www.gostudio.ai/photos/health-inspiration-photos'
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
            <HealthHero/>
          </div>
          <Works
          image3="/Group2.png"
          />
          <Why imageSet="FitFram" />
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