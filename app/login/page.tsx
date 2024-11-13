import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { Database } from "@/types/supabase"; 
import LoginPage from "./components/Login";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login or Sign Up | GoStudio.ai',
  description: 'Join GoStudio.ai to create stunning AI-powered product photos. Access your dashboard and transform your product photography today.',
  keywords: 'login, sign up, register, GoStudio.ai account, AI photography, product photos',
  openGraph: {
    title: 'Login or Sign Up | GoStudio.ai',
    description: 'Join GoStudio.ai to create stunning AI-powered product photos.',
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
