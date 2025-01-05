// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    // Protect get-credits route
    if (request.nextUrl.pathname === '/get-credits') {
      if (!user) {
        // Store the attempted URL to redirect back after login
        const returnTo = encodeURIComponent(request.nextUrl.pathname);
        return NextResponse.redirect(
          new URL(`/login?returnTo=${returnTo}`, request.url)
        );
      }
      return res;
    }

    // Handle other protected routes
    if (['/pricing', '/login'].includes(request.nextUrl.pathname)) {
      return res;
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