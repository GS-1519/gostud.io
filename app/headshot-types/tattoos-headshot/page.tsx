import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import type { Metadata } from 'next'
import Works from "@/components/Works";
import Why from "@/components/Why";
import ReviewSection from "@/components/HeadshotReviewSection";

import Footer from "@/components/Footer";
import Banner from "@/components/Banner";

import TattoHero from "@/components/TattoHero";
import TattooHeadshotHero from "@/components/Tattoo-Headshots";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Artistic Tattoo Style Portrait Photography | Alternative Photos',
  description: 'Create unique tattoo-inspired portraits with AI photography. Perfect for artists, alternative styles, and creative expression.',
  keywords: 'tattoo style portraits, alternative photography, artistic photos, creative portraits, edgy headshots, tattoo artist photography',
  openGraph: {
    title: 'Artistic Tattoo Style Portrait Photography | Alternative Photos',
    description: 'Create unique tattoo-inspired portraits with our AI photography studio',
    type: 'website',
    images: [{
      url: '/og/tattoo-style-photos.jpg',
      width: 1200,
      height: 630,
      alt: 'Tattoo Style Portrait Photography'
    }],
  },
  alternates: {
    canonical: 'https://www.gostudio.ai/photos/tattoos-photos'
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
            <TattoHero/>
          </div>
          <Works
          image2="/Frame1.png"
          image3="/Frame2.png"
          />
          <Why imageSet="Group10" />
          <div id="testimonial">
            <TattooHeadshotHero/>
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