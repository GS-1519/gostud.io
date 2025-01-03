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
import { cyberpunkConfig } from '@/config/gallery-configs/cyberpunk';

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Cyberpunk Portrait Photography | Futuristic AI Photos',
  description: 'Transform your photos into stunning cyberpunk portraits. Perfect for gaming profiles, sci-fi enthusiasts, and creating futuristic digital art.',
  keywords: 'cyberpunk portraits, futuristic photos, sci-fi photography, digital art, gaming profiles, cyberpunk style, AI photography, tech portraits',
  openGraph: {
    title: 'Cyberpunk Portrait Photography | Futuristic AI Photos',
    description: 'Transform into a cyberpunk character with AI photography',
    type: 'website',
    images: [{
      url: '/og/cyberpunk.jpg',
      width: 1200,
      height: 630,
      alt: 'Cyberpunk Portrait Photography'
    }],
  }
}

export default async function CyberpunkPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return <ClientRedirect />;
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div>
        <div id="ai-headshots" className="w-full">
          <PackHero config={heroConfigs['cyberpunk']} />
        </div>
        <div>
          <ExplainerSection />
          <PackHeadshotGallery {...cyberpunkConfig} />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}
