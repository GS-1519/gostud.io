import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
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

export default async function LoginSignupPage({ 
  searchParams 
}: { 
  searchParams?: { [key: string]: string | string[] | undefined } 
}) {
  // Get all async resources
  const cookieStore = cookies();
  const headersList = await headers();
  
  // Create supabase client
  const supabase = createServerComponentClient({ 
    cookies: () => cookieStore 
  });

  // Check if user is already logged in
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    redirect('/overview');
  }

  // Get host after session check
  const host = headersList.get('host');

  // Await searchParams
  const resolvedSearchParams = await Promise.resolve(searchParams || {});

  return (
    <div className="flex flex-col flex-1 w-full h-[calc(100vh-73px)]">
      <LoginPage 
        host={host} 
        searchParams={resolvedSearchParams}
      />
    </div>
  );
}
