import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'
import Works from "@/components/Works";
import Why from "@/components/Why";
import ReviewSection from "@/components/HeadshotReviewSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/Question";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import ExplainerSection from "@/components/ExplainerSection";
import HeadshotReviewSection from "@/components/HeadshotReviewSection";
import { Pricing } from "@/components/home/pricing/pricing";
import HeadshotContainer from "@/components/Banner";

import TypesHero from "@/components/TypesHero";
import PhotosHero from "@/components/Photos-Types";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Professional AI Headshot Types | Choose Your Perfect Style',
  description: 'Explore our diverse collection of AI-powered headshot styles. From business professional to creative portraits, find the perfect look for your needs.',
  keywords: 'AI headshots, professional portraits, headshot styles, business photos, professional photography, portrait types',
  openGraph: {
    title: 'Professional AI Headshot Types | Choose Your Perfect Style',
    description: 'Explore our diverse collection of AI-powered headshot styles',
    type: 'website',
    images: [{
      url: '/og/headshot-types.jpg',
      width: 1200,
      height: 630,
      alt: 'Professional AI Headshot Types'
    }],
  }
}

export default async function PhotoshootTypes() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <main className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <PhotosHero/>
     
      
      <Footer/>
    </main>
  );
}