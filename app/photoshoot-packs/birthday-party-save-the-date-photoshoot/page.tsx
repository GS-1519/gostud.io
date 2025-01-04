import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'

import ReviewSection from "@/components/HeadshotReviewSection";

import Footer from "@/components/Footer";
import Banner from "@/components/Banner";

import DateHero from "@/components/DateHero";
import SaveDateHeadshotHero from "@/components/Save-Date-Headshots";
import ExplainerSection from "@/components/ExplainerSection";
import ClientRedirect from "@/components/ClientRedirect";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Professional Date Night Photography | Romantic Portrait Sessions',
  description: 'Create perfect date night portraits with AI photography. Capture romantic, natural moments for couples and special occasions.',
  keywords: 'date night photos, couple photography, romantic portraits, relationship photos, special occasion pictures, couples photoshoot',
  openGraph: {
    title: 'Professional Date Night Photography | Romantic Portrait Sessions',
    description: 'Create perfect date night portraits with our AI photography studio',
    type: 'website',
    images: [{
      url: '/og/date-night-photos.jpg',
      width: 1200,
      height: 630,
      alt: 'Date Night Photography'
    }],
  }
}

export default async function DatePage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return <ClientRedirect />;
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div>
        <div id="ai-headshots" className="w-full">
          <DateHero />
        </div>
        <div>
          <ExplainerSection />
          <SaveDateHeadshotHero />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}