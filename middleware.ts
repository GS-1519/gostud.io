// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });

  try {
    const { data: { user }, error } = await supabase.auth.getUser();

    // Add pricing to protected routes
    if (request.nextUrl.pathname === '/get-credits') {
      if (error || !user) {
        const returnTo = encodeURIComponent(request.nextUrl.pathname);
        return NextResponse.redirect(new URL(`/login?returnTo=${returnTo}`, request.url));
      }
    }

    // Always allow access to the pricing page
    if (request.nextUrl.pathname === '/pricing') {
      return res;
    }

    // If user is authenticated and tries to access login
    if (user && request.nextUrl.pathname === '/login') {
      return NextResponse.redirect(new URL('/overview', request.url));
    }

    return res;
  } catch (error) {
    console.error('Middleware error:', error);
    return res;
  }
}

export const config = {
  matcher: [
    '/get-credits',
    '/pricing',
    '/login',
    '/summary',
    '/overview'
  ]
};