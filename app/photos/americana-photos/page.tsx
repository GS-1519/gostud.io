import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'
import Works from "@/components/Works";
import Why from "@/components/Why";
import ReviewSection from "@/components/HeadshotReviewSection";

import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import AmericanaHero from "@/components/AmericanaHero";
import AmericanoHeadshotHero from "@/components/Americano-HeadshotsHero";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Americana Style Portrait Photography | Classic American Photos',
  description: 'Create authentic Americana-style portraits with AI photography. Capture the classic American spirit in professional, timeless photos.',
  keywords: 'americana photography, american style photos, classic portraits, vintage americana, traditional headshots, patriotic photos',
  openGraph: {
    title: 'Americana Style Portrait Photography | Classic American Photos',
    description: 'Create authentic Americana-style portraits with our AI photography studio',
    type: 'website',
    images: [{
      url: '/og/americana-photos.jpg',
      width: 1200,
      height: 630,
      alt: 'Americana Style Photography'
    }],
  },
  alternates: {
    canonical: 'https://www.gostudio.ai/photos/americana-photos'
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
            <AmericanaHero/>
          </div>
          <Works
          
          
          image2="/Frame8.png"
          image3="/Frame22.png"
          />
          <Why imageSet="Group23" />
          <div id="testimonial">
            <AmericanoHeadshotHero/>
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