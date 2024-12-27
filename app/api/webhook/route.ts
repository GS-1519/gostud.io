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
    
    // Initialize Supabase client with service role
    const supabase = createRouteHandlerClient({ 
      cookies: () => new Map() as any  // Type assertion to fix cookie store type
    }, {
      supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY
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
        const { data: creditData } = await supabase
          .from('credits')
          .select('credits')
          .eq('user_id', userId)
          .maybeSingle();

        const currentCredits = creditData?.credits || 0;
        console.log('Current credits:', currentCredits);

        const newCredits = currentCredits + 1;
        console.log('💳 Credits calculation:', {
          currentCredits,
          addedCredits: 1,
          newCredits
        });

        // Update credits
        const { error: updateError } = await supabase
          .from('credits')
          .upsert({
            user_id: userId,
            credits: newCredits
          });

        if (updateError) {
          console.error('Failed to update credits:', updateError);
          throw new Error(`Failed to update credits: ${updateError.message}`);
        }

        // Log transaction
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

        console.log('✅ Credits updated successfully:', {
          userId,
          oldCredits: currentCredits,
          newCredits
        });

        return Response.json({
          status: 'success',
          credits: newCredits,
          message: 'Credits updated successfully'
        });
      }

      return Response.json({ status: 'success', message: 'Webhook processed' });
    }

    // Production code with signature verification
    const signature = request.headers.get('paddle-signature') || '';
    const privateKey = process.env.PADDLE_NOTIFICATION_WEBHOOK_SECRET || '';
    
    const paddle = getPaddleInstance();
    const eventData = await paddle.webhooks.unmarshal(rawRequestBody, privateKey, signature);
    // Rest of your production webhook handling code...

  } catch (error) {
    console.error('Webhook error:', error);
    return Response.json({ 
      status: 'error',
      message: error instanceof Error ? error.message : 'Internal server error'
    }, { status: 500 });
  }
}