import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'
import Works from "@/components/Works";
import Why from "@/components/Why";
import ReviewSection from "@/components/HeadshotReviewSection";

import Footer from "@/components/Footer";
import Banner from "@/components/Banner";

import NewtonHero from "@/components/NewtonHero";
import HelmutHeadshotHero from "@/components/Helmut-Headshots";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Helmut Newton Style Photography | Bold Fashion Portraits',
  description: 'Create powerful portraits inspired by Helmut Newton\'s iconic style. AI-powered photography that captures bold, dramatic, and sophisticated images.',
  keywords: 'Helmut Newton style, fashion photography, black and white portraits, dramatic photos, editorial photography, artistic portraits',
  openGraph: {
    title: 'Helmut Newton Style Photography | Bold Fashion Portraits',
    description: 'Create powerful Newton-inspired portraits with our AI photography studio',
    type: 'website',
    images: [{
      url: '/og/newton-style-photos.jpg',
      width: 1200,
      height: 630,
      alt: 'Helmut Newton Style Photography'
    }],
  },
  alternates: {
    canonical: 'https://www.gostudio.ai/photos/helmut-newton-photos'
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
            <HelmutHeadshotHero/>
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