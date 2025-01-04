import { NextRequest } from 'next/server';
import { ProcessWebhook } from '@/app/utils/paddle/process-webhook'; 
import { getPaddleInstance } from '@/app/utils/paddle/get-paddle-instance';
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { PricingTier } from '@/components/constants/pricing-tier';

export async function POST(request: NextRequest) {
  console.log('🔵 Webhook received');
  
  try {
    const rawRequestBody = await request.text();
    console.log('🔵 Raw webhook body:', rawRequestBody);
    
    // Initialize Supabase client
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ 
      cookies: () => cookieStore 
    });

    // For sandbox/testing mode
    if (process.env.NEXT_PUBLIC_PADDLE_ENV === 'sandbox') {
      console.log('⚠️ Sandbox mode: Processing test webhook');
      const eventData = JSON.parse(rawRequestBody);

      if (eventData.eventType === 'transaction.completed') {
        const userId = eventData.data.custom_data?.user_id;
        console.log('🔵 User ID:', userId);

        if (!userId) {
          throw new Error('No userId provided in webhook custom_data');
        }

        const priceId = eventData.data.items?.[0]?.price_id;
        if (!priceId) {
          throw new Error('No price_id found in webhook data');
        }

        // Find matching tier
        const matchingTier = PricingTier.find(tier => 
          Object.values(tier.priceId).includes(priceId)
        );

        if (!matchingTier) {
          throw new Error(`No matching tier found for priceId: ${priceId}`);
        }

        // Get current credits
        const { data: creditData, error: creditError } = await supabase
          .from('credits')
          .select('credits')
          .eq('user_id', userId)
          .single();

        if (creditError) {
          console.error('Error fetching credits:', creditError);
          throw new Error(`Failed to fetch credits: ${creditError.message}`);
        }

        const currentCredits = creditData?.credits || 0;
        const newCredits = currentCredits + matchingTier.credits;
        console.log('💳 Credits calculation:', {
          currentCredits,
          tierCredits: matchingTier.credits,
          newCredits
        });

        // Update credits
        const { error: updateError } = await supabase
          .from('credits')
          .upsert({
            user_id: userId,
            credits: newCredits,
            updated_at: new Date().toISOString()
          });

        if (updateError) {
          throw new Error(`Failed to update credits: ${updateError.message}`);
        }

        // Log transaction
        const { error: transactionError } = await supabase
          .from('transactions')
          .insert({
            user_id: userId,
            amount: eventData.data.total,
            credits: matchingTier.credits,
            status: 'completed',
            provider: 'paddle',
            transaction_id: eventData.data.id,
            price_id: priceId,
            created_at: new Date().toISOString()
          });

        if (transactionError) {
          console.error('Transaction logging failed:', transactionError);
        }

        console.log('✅ Credits updated successfully:', {
          userId,
          oldCredits: currentCredits,
          newCredits
        });

        return new Response(JSON.stringify({
          status: 'success',
          credits: newCredits,
          message: 'Credits updated successfully'
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
      }

      return new Response(JSON.stringify({ 
        status: 'success', 
        message: 'Webhook processed' 
      }), {
        headers: { 'Content-Type': 'application/json' }
      });

    } else {
      // Production code with signature verification
      const signature = request.headers.get('paddle-signature') || '';
      const privateKey = process.env.PADDLE_NOTIFICATION_WEBHOOK_SECRET || '';
      
      const paddle = getPaddleInstance();
      const eventData = await paddle.webhooks.unmarshal(rawRequestBody, privateKey, signature);
      // Rest of your production webhook handling code...
    }

  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(JSON.stringify({ 
      status: 'error',
      message: error instanceof Error ? error.message : 'Internal server error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}