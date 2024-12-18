import { NextRequest } from 'next/server';
import { ProcessWebhook } from '@/app/utils/paddle/process-webhook'; 
import { getPaddleInstance } from '@/app/utils/paddle/get-paddle-instance';
 

const webhookProcessor = new ProcessWebhook();

export async function POST(request: NextRequest) {
  console.log('Received webhook request');
  const signature = request.headers.get('paddle-signature') || '';
  console.log('Signature:', signature);
  
  const rawRequestBody = await request.text();
  console.log('Raw request body:', rawRequestBody);
  
  const privateKey = process.env['PADDLE_NOTIFICATION_WEBHOOK_SECRET'] || '';

  let status, eventName;
  try {
    if (signature && rawRequestBody) {
      const paddle = getPaddleInstance();
      const eventData = paddle.webhooks.unmarshal(rawRequestBody, privateKey, signature);
      status = 200;
      eventName = (await eventData)?.eventType ?? 'Unknown event';
      if (eventData) {
        await webhookProcessor.processEvent(await eventData);
      }
    } else {
      status = 400;
      console.log('Missing signature from header');
    }
  } catch (e) {
    // Handle error
    status = 500;
    console.log(e);
  }
  return Response.json({ status, eventName });
}