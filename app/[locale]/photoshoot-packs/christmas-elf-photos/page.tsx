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
import { christmasElfConfig } from '@/config/gallery-configs/christmas-elf';

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Christmas Elf Portraits | Magical Holiday Photos',
  description: 'Transform your photos into enchanting elf portraits. Perfect for holiday cards, social media, and creating magical Christmas memories.',
  keywords: 'christmas elf, holiday photos, elf portraits, christmas magic, holiday portraits, festive photography, christmas cards, holiday memories',
  openGraph: {
    title: 'Christmas Elf Portraits | Magical Holiday Photos',
    description: 'Transform into a magical Christmas elf with AI',
    type: 'website',
    images: [{
      url: '/og/christmas-elf.jpg',
      width: 1200,
      height: 630,
      alt: 'Christmas Elf Portrait Photography'
    }],
  }
}

export default async function ChristmasElfPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return <ClientRedirect />;
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div>
        <div id="ai-headshots" className="w-full">
          <PackHero config={heroConfigs['christmas-elf']} />
        </div>
        <div>
          <ExplainerSection />
          <PackHeadshotGallery {...christmasElfConfig} />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}
