import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DatingHero  from "@/components/DatingHero";
import type { Metadata } from 'next'
import Works from "@/components/Works";
import Why from "@/components/Why";
import ReviewSection from "@/components/HeadshotReviewSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/Question";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import BotanicalHero from "@/components/BotanicalHero";
import AmericanaHero from "@/components/AmericanaHero";
import WrestlemaniaHero from "@/components/WrestlemaniaHero";
import OnesieHero from "@/components/OnesieHero";
import DateHero from "@/components/DateHero";
import WednesdayHero from "@/components/WednesdayHero";
import WednesdayHeadshotHero from "@/components/Wednesday-Headshots";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Wednesday Addams Style Portrait Photography | Gothic Photos',
  description: 'Create mysterious and gothic portraits inspired by Wednesday Addams with AI photography. Perfect for dark aesthetic and character portraits.',
  keywords: 'wednesday addams style, gothic portraits, dark photography, character photos, mysterious portraits, themed photography',
  openGraph: {
    title: 'Wednesday Addams Style Portrait Photography | Gothic Photos',
    description: 'Create mysterious Wednesday Addams-inspired portraits with our AI studio',
    type: 'website',
    images: [{
      url: '/og/wednesday-addams-photos.jpg',
      width: 1200,
      height: 630,
      alt: 'Wednesday Addams Style Photography'
    }],
  },
  alternates: {
    canonical: 'https://www.gostudio.ai/photos/wednesday-addams-photos'
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
            <WednesdayHero/>
          </div>
          <Works
          
          
          image2="/Frame8.png"
          image3="/Frame26.png"
          />
          <Why imageSet="Group27" />
          <div id="testimonial">
            <WednesdayHeadshotHero/>
          </div>
          <div id="testimonial">

            <ReviewSection/>
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