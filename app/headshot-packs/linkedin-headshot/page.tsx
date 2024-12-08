import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'
import Works from "@/components/Works";
import Why from "@/components/Why";
import ReviewSection from "@/components/HeadshotReviewSection";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import LinkedlnHero from "@/components/LinkedlnHero";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Professional LinkedIn Headshots | AI-Powered Business Portraits',
  description: 'Create professional LinkedIn profile photos in minutes. Get AI-powered business headshots that make you stand out.',
  keywords: 'linkedin headshots, professional profile picture, business portrait, corporate headshot',
  openGraph: {
    title: 'Professional LinkedIn Headshots | AI-Powered Business Portraits',
    description: 'Create professional LinkedIn profile photos that make you stand out',
    type: 'website',
    images: [{
      url: '/og/linkedin-headshots.jpg',
      width: 1200,
      height: 630,
      alt: 'Professional LinkedIn Headshots'
    }],
  }
}

export default async function LinkedInPhotos() {
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
            <LinkedlnHero/>
          </div>
          <Works
          image3="/Group2.png"
          />
          <Why imageSet="Group7" />
          <div id="testimonial">
            <ReviewSection/>
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