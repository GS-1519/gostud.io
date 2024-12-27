import { CheckoutContents } from '@/components/checkout/checkout-contents';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function CheckoutPage() {
  const supabase = createServerComponentClient({ cookies });
  
  // Get the user session
  const { data: { session } } = await supabase.auth.getSession();
  
  const userEmail = session?.user?.email;
  const userId = session?.user?.id;

  return <CheckoutContents userEmail={userEmail} userId={userId} />;
}