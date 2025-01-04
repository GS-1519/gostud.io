import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase";

// Make sure to export config for proper routing
export const runtime = 'edge'; // Optional: Use edge runtime
export const dynamic = 'force-dynamic';

// Explicitly define allowed methods
export async function GET(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get credits with detailed logging
    const { error: creditError, data: credits } = await supabase
      .from("credits")
      .select("credits")
      .eq("user_id", user.id)
      .single();

    console.log("Credits check:", { 
      userId: user.id,
      credits,
      error: creditError 
    });

    if (creditError) {
      console.error("Credits fetch error:", creditError);
      return NextResponse.json(
        { message: "Error fetching credits" },
        { status: 500 }
      );
    }

    // Be explicit about credit check
    const availableCredits = credits?.credits || 0;
    console.log("Available credits:", availableCredits);

    if (availableCredits < 1) {
      return NextResponse.json(
        { 
          message: "Not enough credits",
          availableCredits: availableCredits
        },
        { status: 402 }
      );
    }

    return NextResponse.json({ 
      credits: availableCredits,
      message: "Sufficient credits available"
    });

  } catch (error) {
    console.error('Credits check error:', error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}