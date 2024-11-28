import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'

import RedHero from "@/components/RedHero";
import BlackHero from "@/components/BlackHero";
import WhiteHero from "@/components/WhiteHero";
import GreyHero from "@/components/GreyHero";
import AbstractHero from "@/components/AbstractHero";
import HalloColor from "@/components/HalloColor";
import ChristmasHero from "@/components/ChristmasHero";
import Footer from "@/components/Footer";
import FreeCard from "@/components/freecard";
import Usage from "@/components/Usage";
import Tools from "@/components/Tools";
import FAQSection from "@/components/Question";
import Banner from "@/components/Banner";

export const dynamic = "force-dynamic";

// Validate color parameter and map to components
const colorComponents: { [key: string]: () => JSX.Element } = {
  'red': RedHero,
  'black': BlackHero,
  'white': WhiteHero,
  'grey': GreyHero,
  'abstract': AbstractHero,
  'halloween': HalloColor,
  'christmas': ChristmasHero
};

// Add this after the colorComponents mapping
const backgroundImages = {
  'red': {
    freeCard: '/Background8.png',
    usage: '/Background9.png'
  },
  'black': {
    freeCard: '/Background2.png',
    usage: '/Background3.png'
  },
  'white': {
    freeCard: '/Background4.png',
    usage: '/Background5.png'
  },
  'grey': {
    freeCard: '/Background6.png',
    usage: '/Background7.png'
  },
  'abstract': {
    freeCard: '/Background10.png',
    usage: '/Background11.png'
  },
  'halloween': {
    freeCard: '/Background14.png',
    usage: '/Background15.png'
  },
  'christmas': {
    freeCard: '/Background12.png',
    usage: '/Background13.png'
  }
};

interface Props {
  params: {
    color: string;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const color = params.color.replace('-background', '')
  const capitalizedColor = color.charAt(0).toUpperCase() + color.slice(1)

  return {
    title: `Free ${capitalizedColor} Background Generator | Professional Backgrounds`,
    description: `Create perfect ${color} backgrounds for your photography. Generate professional ${color} backgrounds instantly.`,
    keywords: `${color} background, ${color} photography background, professional background, AI background tool`,
    openGraph: {
      title: `Free ${capitalizedColor} Background Generator`,
      description: `Create perfect ${color} backgrounds for your photography`,
      images: [{
        url: `/og/${color}-background.jpg`,
        width: 1200,
        height: 630,
        alt: `${capitalizedColor} Background Generator`
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title: `Free ${capitalizedColor} Background Generator`,
      description: `Create perfect ${color} backgrounds for your photography`,
      images: [`/og/${color}-background.jpg`]
    }
  }
}

export default async function ColorBackground({ params }: Props) {
  const supabase = createServerComponentClient({ cookies });
  const color = params.color.split('-')[0];
  
  const HeroComponent = colorComponents[color];
  
  if (!HeroComponent) {
    return redirect('/free-tools/background-library');
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/overview");
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[82px]">
        <div className="w-full max-w-[1276px] mx-auto space-y-12">
          <HeroComponent />
          <Tools />
          <FAQSection />
          <Banner />
        </div>
      </div>
      <Footer />
    </div>
  );
}