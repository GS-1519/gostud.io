import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Database } from "@/types/supabase";

export const dynamic = "force-dynamic";

const astriaApiKey = process.env.ASTRIA_API_KEY;
const astriaApiDomain = process.env.ASTRIA_API_DOMAIN;
const astriaTestModeIsOn = process.env.ASTRIA_TEST_MODE === "true";


// Add validation check
if (!astriaApiDomain) {
  throw new Error("MISSING ASTRIA_API_DOMAIN!");
}

const packsIsEnabled = !astriaTestModeIsOn; // Don't use packs on the test mode
const appWebhookSecret = process.env.APP_WEBHOOK_SECRET;

console.log("Packs Is Enabled", { packsIsEnabled });

if (!appWebhookSecret) {
  throw new Error("MISSING APP_WEBHOOK_SECRET!");
}

// Add interface for credits
interface CreditRecord {
  credits: number;
  user_id: string;
}

export async function POST(request: Request) {
  try {
    console.log('Starting model training process');
    
    // Create the supabase client directly here
    const cookieStore = cookies();
    const supabase = createServerComponentClient({ 
      cookies: () => cookieStore 
    });
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      console.log('Unauthorized access attempt');
      return NextResponse.json(
        { message: "Unauthorized - Please login again" },
        { status: 401 }
      );
    }

    // Now process the request payload
    const payload = await request.json();
    console.log('Received payload', { payload });

    const modelInfo = payload.modelInfo;
    const images = payload.imageUrls;
    const pack = payload.selectedPack;
    
    const type = modelInfo.type;
    const gender = modelInfo.type;
    const packId = pack.id;
    const packSlug = pack.slug;
    const name = modelInfo.name || 'Untitled'; // Add default name if empty

    console.log('Supabase client created');

    if (!astriaApiKey) {
      console.log('Missing Astria API Key configuration');
      return NextResponse.json(
        {
          message: "Missing API Key: Add your Astria API Key to generate headshots",
        },
        { status: 500 }
      );
    }

    if (images?.length < 4) {
      console.log("Insufficient images provided", { count: images?.length });
      return NextResponse.json(
        { message: "Upload at least 4 sample images" },
        { status: 500 }
      );
    }
    let _credits = null;

      const { error: creditError, data: credits } = await supabase
        .from("credits")
        .select<"credits", CreditRecord>("credits")
        .eq("user_id", user.id)
        .single();

      console.log("Credits check result:", { creditError, credits });

      if (creditError) {
        console.error("Error fetching credits", { creditError });
        return NextResponse.json(
          { message: "Error checking credits" },
          { status: 500 }
        );
      }

      // Simplified credits check
      if (!credits || credits.credits < 1) {
        return NextResponse.json(
          { message: "Not enough credits, please purchase some credits and try again." },
          { status: 400 }
        );
      }

    // create a model row in supabase
    const { error: modelError, data } = await supabase
      .from("models")
      .insert({
        user_id: user.id,
        name,
        type,
      })
      .select("id")
      .single();

    if (modelError) {
      console.error("Error Creating Model", { modelError });
      return NextResponse.json(
        {
          message: "Something went wrong!",
        },
        { status: 500 }
      );
    }
    
    // Get the modelId from the created model
    const modelId = data?.id;

    try {

      const trainWebhook = `${process.env.NEXT_PUBLIC_DOMAIN}/astria/train-webhook`;
      const trainWebhookWithParams = `${trainWebhook}?user_id=${user.id}&model_id=${modelId}&webhook_secret=${appWebhookSecret}`;

      console.log("Train Webhook", { trainWebhookWithParams });
      const promptWebhook = `${process.env.NEXT_PUBLIC_DOMAIN}/astria/prompt-webhook`;
      const promptWebhookWithParams = `${promptWebhook}?user_id=${user.id}&&model_id=${modelId}&webhook_secret=${appWebhookSecret}`;

      console.log("Prompt Webhook", { promptWebhookWithParams });
      const API_KEY = astriaApiKey;
      const DOMAIN = astriaApiDomain;

      // Create a fine tuned model using Astria tune API
      const tuneBody = {
        tune: {
          title: payload.modelInfo.name || 'Untitled',
          base_tune_id: 690204,
          name: payload.modelInfo.name || 'Untitled',
          branch: "fast",
          token: "ohwx",
          image_urls: images,
          callback: trainWebhookWithParams,
          prompts_attributes: [{
            text: `portrait of ohwx ${payload.modelInfo.name || ''} wearing a business suit, professional photo, white background, Amazing Details, Best Quality, Masterpiece, dramatic lighting highly detailed, analog photo, overglaze, 80mm Sigma f/1.4 or any ZEISS lens`,
            callback: promptWebhookWithParams,
            num_images: 8
          }]
        }
      };

      console.log("Tune Body", JSON.stringify(tuneBody));

      // Create a fine tuned model using Astria packs API
      const packBody = {
        tune: {
          title: name,
          name: type,
          callback: trainWebhookWithParams,
          prompt_attributes: {
            callback: promptWebhookWithParams,
          },
          image_urls: images,
        },
      };

      console.log("Pack Body", JSON.stringify(packBody));

      const apiUrl = DOMAIN + (packsIsEnabled ? `/p/${packId}/tunes` : "/tunes");
      const requestBody = packsIsEnabled ? packBody : tuneBody;

      console.log("API URL", { apiUrl });
      console.log("Packs Is Enabled", { packsIsEnabled });
      console.log("Request Body", { requestBody });

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      };

      console.log('API Request Details:', {
        url: apiUrl,
        method: 'POST',
        headers,
        body: requestBody
      });

      const response = await fetch(
        apiUrl,
        {
          method: 'POST',
          headers,
          body: JSON.stringify(requestBody)
        }
      );

      const { status } = response;
      console.log("Response", { response });

      if (status !== 201) {
        console.error({ status });
        // Rollback: Delete the created model if something goes wrong
        if (modelId) {
          await supabase.from("models").delete().eq("id", modelId);
        }

        if (status === 400) {
          return NextResponse.json(
            {
              message: "webhookUrl must be a URL address",
            },
            { status }
          );
        }
        if (status === 402) {
          return NextResponse.json(
            {
              message: "Training models is only available on paid plans.",
            },
            { status }
          );
        }
      }

      const { error: samplesError } = await supabase
        .from("samples")
        .insert(
          images.map((sample: string) => ({
            uri: sample,
            modelId: modelId,
            created_at: new Date().toISOString()
          }))
        );

      if (samplesError) {
        console.error("Error Creating Samples:", samplesError);
        // Rollback if needed
        if (modelId) {
          await supabase.from("models").delete().eq("id", modelId);
        }
        return NextResponse.json(
          { message: "Failed to create samples" },
          { status: 500 }
        );
      }

      if (credits) {
        const subtractedCredits = credits.credits - 1;
        const { error: updateCreditError, data } = await supabase
          .from("credits")
          .update({ credits: subtractedCredits })
          .eq("user_id", user.id)
          .select("*");

        console.log({ data });
        console.log({ subtractedCredits });

        if (updateCreditError) {
          console.log("Error Updating Credits", { updateCreditError });
          console.error({ updateCreditError });
          return NextResponse.json(
            {
              message: "Something went wrong!",
            },
            { status: 500 }
          );
        }
      }
    } catch (e) {
        console.log("Error Training Model", { e });
      // Rollback: Delete the created model if something goes wrong
      if (modelId) {
        await supabase.from("models").delete().eq("id", modelId);
      }
      return NextResponse.json(
        {
          message: "Something went wrong!",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "success",
      },
      { status: 200 }
    );
  } catch (e) {
    console.error("Error in route handler:", e);
    return NextResponse.json(
      {
        message: "Failed to submit model data",
      },
      { status: 500 }
    );
  }
}
