import { Suspense } from 'react';
import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Loader2 } from 'lucide-react';
import ClientContent from './ClientContent';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-screen p-4">
      <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin" />
      <span className="ml-2 text-sm sm:text-base">Loading...</span>
    </div>
  );
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getData() {
  const cookieStore = cookies();
  const headersList = headers();

  try {
    const supabase = createServerComponentClient<Database>({
      cookies: () => cookieStore
    });

    // Use getUser instead of getSession
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError) {
      console.error("Authentication error:", authError);
      return { redirect: '/login' };
    }

    if (!user) {
      return { redirect: '/login' };
    }

    // Fetch models using the authenticated user's ID
    const { data: models, error: modelsError } = await supabase
      .from('models')
      .select('*, samples(*)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (modelsError) {
      throw modelsError;
    }

    return {
      models: models || [],
      user,  // Pass the authenticated user
      trainModelUrl: "/overview/packs",
      currentPath: headersList.get("x-invoke-path") || ""
    };
  } catch (error) {
    console.error("Error in getData:", error);
    throw error;
  }
}

export default async function OverviewPage() {
  try {
    const data = await getData();

    if ('redirect' in data && typeof data.redirect === 'string') {
      redirect(data.redirect);
      return null;
    }

    return (
      <Suspense fallback={<LoadingSpinner />}>
        <ClientContent
          models={data.models}
          trainModelUrl={data.trainModelUrl || ''}
          user={data.user}
        />
      </Suspense>
    );
  } catch (error) {
    console.error("Error in Overview page:", error);

    if (error instanceof Error) {
      return (
        <div className="flex flex-col items-center justify-center h-screen p-4">
          <div className="text-red-500 mb-4">
            An error occurred while loading your models.
          </div>
          <div className="text-sm text-gray-600">
            Please try refreshing the page or contact support if the problem persists.
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    redirect('/login');
    return null;
  }
}