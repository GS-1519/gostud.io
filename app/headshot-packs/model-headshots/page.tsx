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
  title: 'Professional Model Headshots | Fashion & Portfolio Photography',
  description: 'Create stunning model headshots and portfolio images with our AI photography studio. Perfect for aspiring models, actors, and fashion professionals.',
  keywords: 'model headshots, fashion photography, portfolio photos, modeling photography, professional model photos, fashion portraits, model portfolio',
  openGraph: {
    title: 'Professional Model Headshots | Fashion & Portfolio Photography',
    description: 'Create stunning model headshots and portfolio images with our AI photography studio',
    type: 'website',
    images: [{
      url: '/og/model-headshots.jpg',
      width: 1200,
      height: 630,
      alt: 'Professional Model Headshot Examples'
    }],
  },
}

export default async function ModelHeadshots() {
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