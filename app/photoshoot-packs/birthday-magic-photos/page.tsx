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
import { birthdayMagicConfig } from '@/config/gallery-configs/birthday-magic';

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Birthday Magic Portraits | Enchanting AI Birthday Photography',
  description: 'Create magical birthday portraits with our AI photography. Perfect for birthday invitations, party decorations, and capturing special celebration memories.',
  keywords: 'birthday portraits, celebration photos, party photography, birthday memories, AI photography, birthday invitations, party decorations, special occasions',
  openGraph: {
    title: 'Birthday Magic Portraits | Enchanting AI Birthday Photography',
    description: 'Transform your photos into magical birthday celebrations with AI',
    type: 'website',
    images: [{
      url: '/og/birthday-magic.jpg',
      width: 1200,
      height: 630,
      alt: 'Birthday Magic Photography'
    }],
  }
}

export default async function BirthdayMagicPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return <ClientRedirect />;
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div>
        <div id="ai-headshots" className="w-full">
          <PackHero config={heroConfigs['birthday-magic']} />
        </div>
        <div>
          <ExplainerSection />
          <PackHeadshotGallery {...birthdayMagicConfig} />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}