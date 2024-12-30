import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const dynamic = "force-dynamic";

async function getUser() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore
  });

  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  return <div className="flex w-full flex-col px-4 lg:px-40">{children}</div>;
}