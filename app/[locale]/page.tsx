import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import HeroSection from "@/components/Hero";
import ExplainerSection from "@/components/ExplainerSection";
import ComparisonPage from "@/components/Comparison";
import HeadshotReviewSection from "@/components/HeadshotReviewSection";
import PricingSection from "@/components/PricingSection";
import DataSecuritySection from "@/components/container";
import FAQSection from "@/components/Question";
import HeadshotContainer from "@/components/Banner";
import type { Metadata } from 'next'
import Script from 'next/script'
import PhotographyGrid from "@/components/PhotographyGrid";
import WhySection from "@/components/Why";
import CreationGallery from "@/components/CreationLibaray";
import BrandsPage from "@/components/BrandPage";
import TeamSection from "@/components/TeamSection";
import Ariaa from "@/components/Ariaa";
import { Pricing } from "@/components/home/pricing/pricing";
import ClientRedirect from "@/components/ClientRedirect"; 
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'AI Professional Headshots & Product Photography Studio | Photos in Minutes',
  description: 'Transform your professional image with AI-powered headshots and product photography. Get studio-quality photos instantly. Professional results at a fraction of traditional studio costs.',
  keywords: 'AI headshots, professional headshots, AI product photography, LinkedIn photos, business portraits, product photos, professional photos, AI photo studio, e-commerce photography',
  openGraph: {
    title: 'AI Professional Headshots & Product Photography Studio | Photos in Minutes',
    description: 'Transform your professional image with AI-powered headshots and product photography. Get studio-quality photos instantly.',
    type: 'website',
    images: ['/og.png'],
  }
}

async function getMessages(locale: string) {
  try {
    return (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    return (await import(`@/messages/en.json`)).default;
  }
}

export default async function Home({ params }: { params: { locale: string } }) {
  const locale = params?.locale || 'en';
  const messages = await getMessages(locale);
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ 
    cookies: () => cookieStore 
  });
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return <ClientRedirect />;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "GoStudio.ai",
    "description": "AI-powered professional headshots and product photography studio",
    "applicationCategory": "Photography",
    "offers": {
      "@type": "Offer",
      "price": "29.00",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "3500"
    }
  };

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
        <div>
          <div id="ai-headshots" className="w-full">
            <HeroSection />
          </div>
          <div>
            <ExplainerSection />
            <PhotographyGrid/>
            <ComparisonPage />
            <WhySection/>
            <BrandsPage/>
            <HeadshotReviewSection />
            <div id="pricing">
              <Pricing user={user} />
            </div>
            <DataSecuritySection />
            <Ariaa/>
            <TeamSection/>
            <CreationGallery/>
            <div id="faq">
              <FAQSection />
            </div>
            <HeadshotContainer />
            <Footer />
          </div>
          
        </div>
      </div>
    </NextIntlClientProvider>
  );
}

// Add generateStaticParams if you want to statically generate pages for specific locales
export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'fr' },
    { locale: 'ar' }
    // Add more locales as needed
  ];
}