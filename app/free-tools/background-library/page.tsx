import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'

import FAQSection from "@/components/Question";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import LibraryHero from "@/components/LibraryHero";
import Tools from "@/components/Tools";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Free Background Library | Professional Photography Backgrounds',
  description: 'Access our library of professional photography backgrounds. Choose from various colors and styles for perfect product photos.',
  keywords: 'background library, photography backgrounds, product photography, photo backgrounds',
  openGraph: {
    title: 'Free Background Library | Professional Photography Backgrounds',
    description: 'Access our library of professional photography backgrounds',
    images: [{
      url: '/og/background-library.jpg',
      width: 1200,
      height: 630,
      alt: 'Background Library'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Background Library',
    description: 'Access our library of professional photography backgrounds',
    images: ['/og/background-library.jpg']
  }
}

export default async function BackgroundLibrary() {
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
          <LibraryHero />
          {/* <Tools /> */}
          <FAQSection />
          <Banner />
        </div>
      </div>
      <Footer />
    </div>
  );
}