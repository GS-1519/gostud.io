import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'
import Works from "@/components/Works";
import Why from "@/components/Why";
import ReviewSection from "@/components/HeadshotReviewSection";

import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import BotanicalHero from "@/components/BotanicalHero";
import BotanicalHeadshotHero from "@/components/Botnical-Headshot";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Botanical Portrait Photography | Nature-Inspired Professional Photos',
  description: 'Create elegant portraits with botanical and natural elements using AI photography. Perfect for organic, natural-looking professional photos.',
  keywords: 'botanical photography, nature portraits, garden photos, floral photography, natural headshots, organic portraits',
  openGraph: {
    title: 'Botanical Portrait Photography | Nature-Inspired Professional Photos',
    description: 'Create elegant botanical portraits with our AI photography studio',
    type: 'website',
    images: [{
      url: '/og/botanical-photos.jpg',
      width: 1200,
      height: 630,
      alt: 'Botanical Portrait Photography'
    }],
  },
  alternates: {
    canonical: 'https://www.gostudio.ai/photos/botanical-photos'
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
            <BotanicalHero/>
          </div>
          <Works
          
          image2="/Frame8.png"
          image3="/Frame20.png"
          />
          <Why imageSet="Group22" />
          <div id="testimonial">
            <BotanicalHeadshotHero/>
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