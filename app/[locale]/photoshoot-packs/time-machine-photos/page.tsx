import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ClientRedirect from "@/components/ClientRedirect";
import type { Metadata } from 'next'
import ExplainerSection from "@/components/ExplainerSection";
import ReviewSection from "@/components/HeadshotReviewSection";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import { heroConfigs } from '@/config/hero-configs';
import PackHero from '@/components/shared/PackHero';
import PackHeadshotGallery from '@/components/shared/PackHeadshotGallery';
import { timeMachineConfig } from '@/config/gallery-configs/time-machine';

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Time Machine Photography | Historical Era Portraits',
  description: 'Travel through time with stunning historical portraits. Perfect for period-themed photos and exploring different eras.',
  keywords: 'time machine photos, historical portraits, era photography, period photos, vintage style, retro portraits, historical recreation, time travel photos',
  openGraph: {
    title: 'Time Machine Photography | Historical Era Portraits',
    description: 'Create stunning historical era portraits with AI',
    type: 'website',
    images: [{
      url: '/og/time-machine.jpg',
      width: 1200,
      height: 630,
      alt: 'Time Machine Photography'
    }],
  }
}

export default async function TimeMachinePage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return <ClientRedirect />;
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div>
        <div id="ai-headshots" className="w-full">
          <PackHero config={heroConfigs['time-machine']} />
        </div>
        <div>
          <ExplainerSection />
          <PackHeadshotGallery {...timeMachineConfig} />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}
