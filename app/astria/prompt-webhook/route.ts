import { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const resendApiKey = process.env.RESEND_API_KEY;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const appWebhookSecret = process.env.APP_WEBHOOK_SECRET;

if (!resendApiKey) {
  console.warn(
    "We detected that the RESEND_API_KEY is missing from your environment variables. The app should still work but email notifications will not be sent. Please add your RESEND_API_KEY to your environment variables if you want to enable email notifications."
  );
}

if (!supabaseUrl) {
  throw new Error("MISSING NEXT_PUBLIC_SUPABASE_URL!");
}

if (!supabaseServiceRoleKey) {
  throw new Error("MISSING SUPABASE_SERVICE_ROLE_KEY!");
}

if (!appWebhookSecret) {
  throw new Error("MISSING APP_WEBHOOK_SECRET!");
}

export async function POST(request: Request) {
  try {
    // Log the raw request first
    const rawBody = await request.text();
    console.log("🔵 Raw webhook body:", rawBody);

    // Parse the JSON data
    let incomingData;
    try {
      incomingData = JSON.parse(rawBody);
      console.log("🎨 Parsed webhook data:", JSON.stringify(incomingData, null, 2));
    } catch (e) {
      console.error("Failed to parse webhook body:", e);
      throw new Error('Invalid webhook payload');
    }

    // Extract URL parameters
    const url = new URL(request.url);
    const model_id = url.searchParams.get("model_id");
    const user_id = url.searchParams.get("user_id");
    const webhook_secret = url.searchParams.get("webhook_secret");

    console.log("🔑 Webhook parameters:", {
      model_id,
      user_id,
      webhook_secret: webhook_secret ? "Present" : "Missing"
    });

    // Validate webhook secret
    if (!webhook_secret || webhook_secret !== process.env.APP_WEBHOOK_SECRET) {
      console.error("❌ Invalid webhook secret");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Initialize Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Extract images from the webhook payload
    const images = incomingData?.prompt?.images || [];
    console.log("🖼️ Received images:", {
      count: images.length,
      urls: images
    });

    if (!images || images.length === 0) {
      console.error("❌ No images in webhook payload");
      return NextResponse.json({ message: "No images received" }, { status: 400 });
    }

    // Insert images one by one with detailed logging
    for (const imageUrl of images) {
      try {
        console.log("📝 Attempting to insert image:", {
          modelId: model_id,
          imageUrl
        });

        const { data, error } = await supabase
          .from("images")
          .insert({
            modelId: model_id,
            uri: imageUrl
          })
          .select()
          .single();

        if (error) {
          console.error("❌ Image insertion failed:", {
            error,
            modelId: model_id,
            imageUrl
          });
        } else {
          console.log("✅ Image inserted successfully:", {
            imageId: data.id,
            modelId: model_id
          });
        }
      } catch (err) {
        console.error("❌ Error processing image:", {
          error: err,
          imageUrl
        });
      }
    }

    return NextResponse.json({
      message: "Webhook processed",
      imagesProcessed: images.length
    });

  } catch (error) {
    console.error("❌ Webhook processing error:", error);
    return NextResponse.json(
      { message: "Error processing webhook" },
      { status: 500 }
    );
  }
}
