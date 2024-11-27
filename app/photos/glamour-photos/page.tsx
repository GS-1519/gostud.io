import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'
import Works from "@/components/Works";
import Why from "@/components/Why";
import ReviewSection from "@/components/HeadshotReviewSection";
import PricingSection from "@/components/PricingSection";
import DataSecuritySection from "@/components/container";
import FAQSection from "@/components/Question";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import GlamourHero from "@/components/GlamourHero";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Professional Glamour Photography | Elegant Portrait Sessions',
  description: 'Create stunning glamour portraits with AI photography. Perfect for fashion, beauty, and professional modeling portfolios.',
  keywords: 'glamour photography, fashion portraits, beauty photos, model photography, professional portraits, elegant headshots',
  openGraph: {
    title: 'Professional Glamour Photography | Elegant Portrait Sessions',
    description: 'Create stunning glamour portraits with our AI photography studio',
    type: 'website',
    images: [{
      url: '/og/glamour-photos.jpg',
      width: 1200,
      height: 630,
      alt: 'Professional Glamour Photography'
    }],
  },
  alternates: {
    canonical: 'https://www.gostudio.ai/photos/glamour-photos'
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
            <GlamourHero/>
          </div>
          <Works/>
          <Why imageSet="GlmFram" />
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