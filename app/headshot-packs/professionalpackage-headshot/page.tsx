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
import { professionalPackageConfig } from '@/config/gallery-configs/professional-package';
import ProfessionalPackageHero from "@/components/ProfessionalPackage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Professional Package Photography | Business Portrait Sessions',
  description: 'Create polished professional portraits perfect for business and corporate needs.',
  keywords: 'professional headshots, business portraits, corporate photography, executive photos, professional package, business headshots, corporate portraits',
  openGraph: {
    title: 'Professional Package Photography | Business Portrait Sessions',
    description: 'Create polished professional portraits with AI',
    type: 'website',
    images: [{
      url: '/og/professional-package.jpg',
      width: 1200,
      height: 630,
      alt: 'Professional Package Photography'
    }],
  }
}

export default async function ProfessionalPackagePage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return <ClientRedirect />;
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div>
        <div id="ai-headshots" className="w-full">
          <ProfessionalPackageHero />
        </div>
        <div>
          <ExplainerSection />
          <PackHeadshotGallery {...professionalPackageConfig} />
          <ReviewSection />
          <Banner />
          <Footer/>
        </div>
      </div>
    </div>
  );
}