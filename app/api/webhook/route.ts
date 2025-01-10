import { NextRequest } from 'next/server';
import { ProcessWebhook } from '@/app/utils/paddle/process-webhook'; 
import { getPaddleInstance } from '@/app/utils/paddle/get-paddle-instance';
import { createClient } from '@supabase/supabase-js';
import { cookies } from "next/headers";
import { PricingTier } from '@/components/constants/pricing-tier';

export async function POST(request: NextRequest) {
  console.log('🔵 Webhook received');
  
  try {
    const rawRequestBody = await request.text();
    console.log('🔵 Raw webhook body:', rawRequestBody);
    
    // Initialize Supabase client
    const cookieStore = cookies();
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

    // Parse the webhook data
    let eventData;
    try {
      eventData = JSON.parse(rawRequestBody);
      console.log('🔵 Parsed webhook data:', JSON.stringify(eventData, null, 2));
    } catch (e) {
      console.error('Failed to parse webhook body:', e);
      throw new Error('Invalid webhook payload');
    }

    // For sandbox/testing mode
    if (process.env.NEXT_PUBLIC_PADDLE_ENV === 'sandbox') {
      console.log('⚠️ Sandbox mode: Processing test webhook');
      
      // Extract and validate required fields
      const userId = eventData.data?.custom_data?.user_id;
      const priceId = eventData.data?.items?.[0]?.price_id;

      console.log('🔵 Extracted fields:', { 
        userId, 
        priceId,
        userIdExists: !!userId,
        priceIdExists: !!priceId
      });

      if (!userId || !priceId) {
        throw new Error(`Missing required fields: userId=${userId}, priceId=${priceId}`);
      }

      // Debug price ID matching
      console.log('🔍 Available pricing tiers:', PricingTier.map(tier => ({
        name: tier.name,
        priceId: tier.priceId
      })));

      const matchingTier = PricingTier.find(tier => {
        const matches = tier.priceId === priceId;
        console.log(`Comparing tier ${tier.name}:`, {
          tierPriceId: tier.priceId,
          webhookPriceId: priceId,
          matches
        });
        return matches;
      });

      if (!matchingTier) {
        console.error('❌ No matching tier found:', {
          receivedPriceId: priceId,
          availablePriceIds: PricingTier.map(t => t.priceId)
        });
        throw new Error(`No matching tier found for priceId: ${priceId}`);
      }

      console.log('✅ Found matching tier:', {
        name: matchingTier.name,
        credits: matchingTier.credits
      });

      try {
        // First try to get existing credits
        let { data: creditData, error: creditError } = await supabase
          .from('credits')
          .select('credits')
          .eq('user_id', userId);

        console.log('💳 Initial credit check:', { creditData, creditError });

        // If no credits record exists, create one with 0 credits
        if (!creditData || creditData.length === 0) {
          console.log('💳 No credits record found, creating new one');
          const { data: newCreditData, error: insertError } = await supabase
            .from('credits')
            .insert({
              user_id: userId,
              credits: 0
            })
            .select('credits')
            .single();

          if (insertError) {
            console.error('Failed to create credits record:', insertError);
            throw new Error(`Failed to create credits record: ${insertError.message}`);
          }

          creditData = [newCreditData];
          console.log('💳 Created new credits record:', creditData);
        }

        const currentCredits = creditData[0]?.credits || 0;
        const newCredits = currentCredits + 1;

        console.log('💳 Credits calculation:', {
          currentCredits,
          addedCredits: 1,
          newCredits
        });

        // Update credits
        const { error: updateError } = await supabase
          .from('credits')
          .update({ 
            credits: newCredits
          })
          .eq('user_id', userId);

        console.log('💳 Credit update result:', {
          success: !updateError,
          error: updateError,
          newCredits
        });

        if (updateError) {
          throw new Error(`Failed to update credits: ${updateError.message}`);
        }

        // Add transaction record
        const { error: transactionError } = await supabase
          .from('transactions')
          .insert({
            user_id: userId,
            amount: eventData.data.total,
            credits: 1,
            status: 'completed',
            provider: 'paddle',
            transaction_id: eventData.data.id,
            price_id: priceId,
            created_at: new Date().toISOString()
          });

        if (transactionError) {
          console.error('Transaction logging failed:', transactionError);
        }

        return new Response(JSON.stringify({
          status: 'success',
          message: 'Credits updated successfully',
          newCredits
        }), {
          headers: { 'Content-Type': 'application/json' }
        });

      } catch (error) {
        console.error('Credit processing error:', error);
        throw error;
      }
    } else {
      // Production code with signature verification
      const signature = request.headers.get('paddle-signature') || '';
      const privateKey = process.env.PADDLE_NOTIFICATION_WEBHOOK_SECRET || '';
      
      const paddle = getPaddleInstance();
      const eventData = await paddle.webhooks.unmarshal(rawRequestBody, privateKey, signature);
      // Rest of your production webhook handling code...
    }

  } catch (error) {
    console.error('🔴 Webhook error:', error);
    return new Response(JSON.stringify({ 
      status: 'error',
      message: error instanceof Error ? error.message : 'Internal server error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}