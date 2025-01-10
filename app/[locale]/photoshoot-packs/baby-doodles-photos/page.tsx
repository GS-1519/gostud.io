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
import { babyDoodlesConfig } from '@/config/gallery-configs/baby-doodles';

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Baby Doodle Portraits | Adorable AI Baby Photography',
  description: 'Transform your baby photos into charming doodle-style portraits. Perfect for nursery art, birth announcements, and capturing precious memories.',
  keywords: 'baby portraits, doodle art, nursery decor, baby photography, birth announcements, baby memories, AI photography, baby photos',
  openGraph: {
    title: 'Baby Doodle Portraits | Adorable AI Baby Photography',
    description: 'Create magical doodle-style portraits of your little ones with AI',
    type: 'website',
    images: [{
      url: '/og/baby-doodles.jpg',
      width: 1200,
      height: 630,
      alt: 'Baby Doodle Portrait Photography'
    }],
  }
}

export default async function BabyDoodlesPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return <ClientRedirect />;
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div>
        <div id="ai-headshots" className="w-full">
          <PackHero config={heroConfigs['baby-doodles']} />
        </div>
        <div>
          <ExplainerSection />
          <PackHeadshotGallery {...babyDoodlesConfig} />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}