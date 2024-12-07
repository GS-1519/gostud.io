import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'
import Works from "@/components/Works";
import Why from "@/components/Why";
import ReviewSection from "@/components/HeadshotReviewSection";

import Footer from "@/components/Footer";
import Banner from "@/components/Banner";

import DogHero from "@/components/DogHero";
import DogHeadshotHero from "@/components/Dog-Headshots";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Professional Pet Portrait Photography | Dog Photo Sessions',
  description: 'Create beautiful dog portraits with AI photography. Perfect for pet owners, dog lovers, and professional pet photography.',
  keywords: 'dog photos, pet portraits, animal photography, professional pet photos, dog photography, pet headshots',
  openGraph: {
    title: 'Professional Pet Portrait Photography | Dog Photo Sessions',
    description: 'Create beautiful dog portraits with our AI photography studio',
    type: 'website',
    images: [{
      url: '/og/dog-photos.jpg',
      width: 1200,
      height: 630,
      alt: 'Professional Dog Photography'
    }],
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
            <DogHero/>
          </div>
          <Works
          image2="/Frame18.png"
          image3="/Frame19+.png"
          />
          <Why imageSet="Group21" />
          <div id="testimonial">
            <DogHeadshotHero/>
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