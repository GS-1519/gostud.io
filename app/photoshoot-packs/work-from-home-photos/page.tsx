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
import { workFromHomeConfig } from '@/config/gallery-configs/work-from-home';

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Work From Home Photography | Remote Professional Portraits',
  description: 'Create professional work-from-home portraits. Perfect for remote workers and virtual meetings.',
  keywords: 'work from home photos, remote work portraits, virtual meeting photos, home office photography, professional home photos, remote professional, virtual presence',
  openGraph: {
    title: 'Work From Home Photography | Remote Professional Portraits',
    description: 'Create professional work-from-home portraits with AI',
    type: 'website',
    images: [{
      url: '/og/work-from-home.jpg',
      width: 1200,
      height: 630,
      alt: 'Work From Home Photography'
    }],
  }
}

export default async function WorkFromHomePage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return <ClientRedirect />;
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div>
        <div id="ai-headshots" className="w-full">
          <PackHero config={heroConfigs['work-from-home']} />
        </div>
        <div>
          <ExplainerSection />
          <PackHeadshotGallery {...workFromHomeConfig} />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}
