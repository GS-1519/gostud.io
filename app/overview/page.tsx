import { Suspense } from 'react';
import ClientSideModelsList from "@/components/realtime/ClientSideModelsList";
import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Icons } from "@/components/icons";

export const dynamic = "force-dynamic";

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Icons.spinner className="h-8 w-8 animate-spin" />
      <span className="ml-2">Loading...</span>
    </div>
  );
}

export default async function Index() {
  const supabase = createServerComponentClient<Database>({ cookies });

  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) throw userError;
    if (!user) {
      return <div>Please log in to view your models</div>;
    }

    const { data: models, error: modelsError } = await supabase
      .from("models")
      .select(
        `*, samples (
        *
      )`
      )
      .eq("user_id", user.id);

    if (modelsError) throw modelsError;

    return (
      <Suspense fallback={<LoadingSpinner />}>
        <ClientSideModelsList serverModels={models ?? []} />
      </Suspense>
    );
  } catch (error) {
    console.error("Error in Overview page:", error);
    return (
      <div className="text-red-500">
        An error occurred while loading your models. Please try again later.
      </div>
    );
  }
}
