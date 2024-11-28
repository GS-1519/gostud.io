import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'

import ReviewSection from "@/components/HeadshotReviewSection";
import PricingSection from "@/components/PricingSection";
import DataSecuritySection from "@/components/container";
import FAQSection from "@/components/Question";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import LibraryHero from "@/components/LibraryHero";
import Tools from "@/components/Tools";
import WhiteHero from "@/components/WhiteHero";
import FreeCard from "@/components/freecard";
import Usage from "@/components/Usage";
import BlackHero from "@/components/BlackHero";
import RedHero from "@/components/RedHero";
import ChristmasHero from "@/components/ChristmasHero";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Free Christmas Background Generator | Holiday Photography Backgrounds',
  description: 'Create festive Christmas backgrounds for holiday photography. Download high-quality Christmas-themed backgrounds and patterns.',
  keywords: 'christmas background, holiday background, festive background, christmas photography, holiday photos',
  openGraph: {
    title: 'Free Christmas Background Generator',
    description: 'Create festive Christmas backgrounds for holiday photography',
    images: [{
      url: '/og/christmas-background.jpg',
      width: 1200,
      height: 630,
      alt: 'Christmas Background Generator'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Christmas Background Generator',
    description: 'Create festive Christmas backgrounds for holiday photography',
    images: ['/og/christmas-background.jpg']
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
            <ChristmasHero/>
          </div>
          <div id="ai-headshots">
            <FreeCard backgroundImage="/Background12.png" />
          </div>
          <div id="ai-headshots">
          <Usage backgroundImage="/Background13.png" />
          </div>
          <div id="ai-headshots">
          <Tools/>
          </div>
       
          
          
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