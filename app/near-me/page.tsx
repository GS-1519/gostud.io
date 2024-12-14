import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'
import NearMeHero from "@/components/NearMeHero";
import WhyChooseSection from "@/components/WhyChooseSection";
import FAQSection from "@/components/Question";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";

export const metadata: Metadata = {
  title: 'Find Professional Headshot Photographers Near You | GoStudio.ai',
  description: 'Discover top-rated local headshot photographers in your area. Professional studio photography powered by AI for business, acting, modeling & more. Book your session today!',
  keywords: 'headshot photographer near me, professional headshots, local photographer, business headshots, actor headshots, corporate photography',
  openGraph: {
    title: 'Find Professional Headshot Photographers Near You',
    description: 'Connect with top local photographers for professional AI-enhanced headshots',
    images: [{
      url: '/og/near-me.jpg',
      width: 1200,
      height: 630,
      alt: 'Professional Headshot Photography Near Me'
    }],
  }
}

export default async function NearMePage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return redirect("/overview");
  }

  return (
    <div className="w-full bg-white min-h-screen font-poppins">
      {/* Hero Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[82px]">
          <NearMeHero />
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 sm:py-20 bg-[#F4F7FA]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[82px]">
          <div className="max-w-[1276px] mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              Why Choose GoStudio.ai for Your Professional Headshots?
            </h2>
            <WhyChooseSection />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[82px]">
          <div className="max-w-[1276px] mx-auto">
            <FAQSection />
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="py-16 sm:py-20 bg-[#F4F7FA]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[82px]">
          <div className="max-w-[1276px] mx-auto">
            <Banner />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}