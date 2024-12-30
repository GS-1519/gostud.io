import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'
import Works from "@/components/Works";
import Why from "@/components/Why";
import ReviewSection from "@/components/HeadshotReviewSection";
import ExplainerSection from "@/components/ExplainerSection";

import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import GlamourHero from "@/components/GlamourHero";
import GlamourHeadshotHero from "@/components/Glamour-Headshots";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Professional Glamour Photography | Elegant Portrait Sessions',
  description: 'Create stunning glamour portraits with AI photography. Perfect for fashion, beauty, and professional modeling portfolios.',
  keywords: 'glamour photography, fashion portraits, beauty photos, model photography, professional portraits, elegant headshots',
  openGraph: {
    title: 'Professional Glamour Photography | Elegant Portrait Sessions',
    description: 'Create stunning glamour portraits with our AI photography studio',
    type: 'website',
    images: [{
      url: '/og/glamour-photos.jpg',
      width: 1200,
      height: 630,
      alt: 'Professional Glamour Photography'
    }],
  }
}

export default async function ActorHeadshotPage() {
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
        <GlamourHero />
      </div>
      <div>
        <ExplainerSection />
        <GlamourHeadshotHero />
        <ReviewSection />
        <Banner />
        <Footer/>
      </div>
    </div>
  </div>
  );
}