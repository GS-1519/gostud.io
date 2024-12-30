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

interface PageProps {
  searchParams?: { 
    [key: string]: string | string[] | undefined 
  }
}

export default async function LoginSignupPage({ searchParams }: PageProps) {
  try {
    // Get all async resources
    const cookieStore = cookies();
    const headersList = headers();
    
    // Create supabase client
    const supabase = createServerComponentClient({
      cookies: () => cookieStore
    });

    // Use getUser instead of getSession
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error('Auth error:', error);
      // Continue to login page if there's an auth error
    } else if (user) {
      // Redirect if user is authenticated
      redirect('/overview');
    }

    // Get host
    const host = headersList.get('host');

    // Resolve search params
    const resolvedSearchParams = await Promise.resolve(searchParams || {});

    return (
      <div className="flex flex-col flex-1 w-full h-[calc(100vh-73px)]">
        <LoginPage
          host={host}
          searchParams={resolvedSearchParams}
        />
      </div>
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    // Show login page with error state
    return (
      <div className="flex flex-col flex-1 w-full h-[calc(100vh-73px)]">
        <LoginPage
          host={null}
          searchParams={searchParams || {}}
          
        />
      </div>
    );
  }
}