import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { Database } from "@/types/supabase"; 
import LoginPage from "./components/Login";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login or Sign Up | Professional Headshot AI',
  description: 'Join our platform to create stunning AI-powered professional headshots and portraits. Access your dashboard and transform your professional photography today.',
  keywords: 'login, sign up, register, professional headshots, AI photography, portrait photography, business photos',
  openGraph: {
    title: 'Login or Sign Up | Professional Headshot AI',
    description: 'Create stunning AI-powered professional headshots and portraits.',
    type: 'website',
    images: ['/og.png'],
  }
}

export const dynamic = "force-dynamic";

export default function LoginSignupPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const host = headers().get("host");

  return (
    <div className="flex flex-col flex-1 w-full h-[calc(100vh-73px)]">
      <LoginPage host={host} searchParams={searchParams} />
    </div>
  );
}
