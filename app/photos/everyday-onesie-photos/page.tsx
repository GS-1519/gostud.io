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
import OnesiesHeadshotHero from "@/components/Onesies-headshots";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Fun Onesie Portrait Photography | Casual Comfort Photos',
  description: 'Create playful and comfortable portraits in your favorite onesie with AI photography. Perfect for casual, fun-loving personalities.',
  keywords: 'onesie photos, casual portraits, fun photography, comfortable photoshoot, playful pictures, unique portraits',
  openGraph: {
    title: 'Fun Onesie Portrait Photography | Casual Comfort Photos',
    description: 'Create playful onesie portraits with our AI photography studio',
    type: 'website',
    images: [{
      url: '/og/onesie-photos.jpg',
      width: 1200,
      height: 630,
      alt: 'Onesie Portrait Photography'
    }],
  },
  alternates: {
    canonical: 'https://www.gostudio.ai/photos/everyday-onesie-photos'
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
            <OnesieHero/>
          </div>
          <Works
          
          
          image2="/Frame8.png"
          image3="/Frame24.png"
          />
          <Why imageSet="Group25" />
          <div id="testimonial">
            <OnesiesHeadshotHero/>
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