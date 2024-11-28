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
import BotanicalHero from "@/components/BotanicalHero";
import AmericanaHero from "@/components/AmericanaHero";
import WrestlemaniaHero from "@/components/WrestlemaniaHero";
import OnesieHero from "@/components/OnesieHero";
import DateHero from "@/components/DateHero";
import SaveDateHeadshotHero from "@/components/Save-Date-Headshots";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Professional Date Night Photography | Romantic Portrait Sessions',
  description: 'Create perfect date night portraits with AI photography. Capture romantic, natural moments for couples and special occasions.',
  keywords: 'date night photos, couple photography, romantic portraits, relationship photos, special occasion pictures, couples photoshoot',
  openGraph: {
    title: 'Professional Date Night Photography | Romantic Portrait Sessions',
    description: 'Create perfect date night portraits with our AI photography studio',
    type: 'website',
    images: [{
      url: '/og/date-night-photos.jpg',
      width: 1200,
      height: 630,
      alt: 'Date Night Photography'
    }],
  },
  alternates: {
    canonical: 'https://www.gostudio.ai/photos/date-photos'
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
            <DateHero/>
          </div>
          <Works
          
          
          image2="/Frame8.png"
          image3="/Frame25.png"
          />
          <Why imageSet="Group26" />
          <div id="testimonial">
            <SaveDateHeadshotHero/>
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