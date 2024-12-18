import { redirect } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

export default async function CheckoutPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  
  const { data } = await supabase.auth.getUser();

  // If no specific price ID is provided, redirect to pricing page
  return redirect('/pricing');
} 