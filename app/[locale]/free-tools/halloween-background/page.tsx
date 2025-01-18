import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'
import FAQSection from "@/components/Question";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import Tools from "@/components/Tools";
import FreeCard from "@/components/freecard";
import Usage from "@/components/Usage";

import HalloColor from "@/components/HalloColor";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Free Halloween Background Generator | Spooky Photography Backgrounds',
  description: 'Create spooky Halloween backgrounds for seasonal photography. Download high-quality Halloween-themed backgrounds and patterns.',
  keywords: 'halloween background, spooky background, halloween photography, seasonal background, holiday photos',
  openGraph: {
    title: 'Free Halloween Background Generator',
    description: 'Create spooky Halloween backgrounds for seasonal photography',
    images: [{
      url: '/og/halloween-background.jpg',
      width: 1200,
      height: 630,
      alt: 'Halloween Background Generator'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Halloween Background Generator',
    description: 'Create spooky Halloween backgrounds for seasonal photography',
    images: ['/og/halloween-background.jpg']
  }
}

export default async function DoctorPhotos() {
  const supabase = createServerComponentClient({ cookies });

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
          <div id="ai-headshots">
            <HalloColor/>
          </div>
          <div id="ai-headshots">
            <FreeCard backgroundImage="/Background14.png" />
          </div>
          <div id="ai-headshots">
          <Usage backgroundImage="/Background15.png" />
          </div>
          {/* <div id="ai-headshots">
          <Tools/>
          </div> */}
       
          
          
          <div id="faq">
            <FAQSection />
          </div>
          <div>
            <Banner/>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}