import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'
import Works from "@/components/Works";
import Why from "@/components/Why";
import ReviewSection from "@/components/HeadshotReviewSection";

import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import JcrewHero from "@/components/JcrewHero";
import JcrewHeadshotHero from "@/components/Jcrew-HeadshotsHero";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Business Casual Headshots | Professional Corporate Photography',
  description: 'Get perfect business casual headshots with our AI photography studio. Ideal for modern professionals seeking approachable yet professional corporate photos.',
  keywords: 'business casual headshots, corporate photography, professional headshots, casual professional photos, corporate portraits, business photography',
  openGraph: {
    title: 'Business Casual Headshots | Professional Corporate Photography',
    description: 'Get perfect business casual headshots with our AI photography studio',
    type: 'website',
    images: [{
      url: '/og/business-casual-headshots.jpg',
      width: 1200,
      height: 630,
      alt: 'Business Casual Headshot Examples'
    }],
  },
}

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
            <JcrewHero/>
          </div>
          <Works/>
          <Why imageSet="Jfram" />
          <div id="testimonial">
            <JcrewHeadshotHero/>
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