import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'


import ReviewSection from "@/components/HeadshotReviewSection";

import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import JcrewHero from "@/components/JcrewHero";
import JcrewHeadshotHero from "@/components/Jcrew-HeadshotsHero";
import ExplainerSection from "@/components/ExplainerSection";

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
    <div>
      <div id="ai-headshots" className="w-full">
        <JcrewHero/>
      </div>
      <div>
        <ExplainerSection />
        <JcrewHeadshotHero />
        <ReviewSection />
        <Banner />
        <Footer/>
      </div>
    </div>
  </div>
  );
}