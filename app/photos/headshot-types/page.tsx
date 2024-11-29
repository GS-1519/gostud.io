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

import TypesHero from "@/components/TypesHero";
export const dynamic = "force-dynamic";


export const metadata: Metadata = {
  title: '[Style] Portrait Photography | Professional AI Photos',
  description: 'Create stunning [style] portraits with AI photography. Perfect for [specific use case] and professional photos.',
  keywords: '[style] photos, professional portraits, AI photography, [style] photography, custom portraits, professional headshots',
  openGraph: {
    title: '[Style] Portrait Photography | Professional AI Photos',
    description: 'Create stunning [style] portraits with our AI photography studio',
    type: 'website',
    images: [{
      url: '/og/[style]-photos.jpg',
      width: 1200,
      height: 630,
      alt: '[Style] Portrait Photography'
    }],
  },
  alternates: {
    canonical: 'https://www.gostudio.ai/photos/[style]-photos'
  }
}



// Rest of your page component code...

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
            <TypesHero/>
          </div>
          <Works/>
          <Why imageSet="Jfram" />
          <div id="testimonial">
            <ReviewSection/>
          </div>
          <div id="pricing">
            <PricingSection user={user} />
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