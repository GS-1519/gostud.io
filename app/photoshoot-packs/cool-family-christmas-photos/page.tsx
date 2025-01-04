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
import { familyChristmasConfig } from '@/config/gallery-configs/family-christmas';

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Family Christmas Portraits | Magical Holiday Photography',
  description: 'Create enchanting family Christmas portraits. Perfect for holiday cards, family memories, and sharing seasonal joy with loved ones.',
  keywords: 'family christmas, holiday portraits, family photos, christmas cards, holiday photography, family memories, seasonal portraits, christmas photography',
  openGraph: {
    title: 'Family Christmas Portraits | Magical Holiday Photography',
    description: 'Create magical family Christmas portraits with AI',
    type: 'website',
    images: [{
      url: '/og/family-christmas.jpg',
      width: 1200,
      height: 630,
      alt: 'Family Christmas Portrait Photography'
    }],
  }
}

export default async function FamilyChristmasPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return <ClientRedirect />;
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div>
        <div id="ai-headshots" className="w-full">
          <PackHero config={heroConfigs['family-christmas']} />
        </div>
        <div>
          <ExplainerSection />
          <PackHeadshotGallery {...familyChristmasConfig} />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}
