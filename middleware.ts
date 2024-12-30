// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });

  try {
    // Use getUser instead of getSession
    const { data: { user }, error } = await supabase.auth.getUser();

    // If there's an auth error or no user and we're trying to access protected routes
    if ((error || !user) && request.nextUrl.pathname === '/summary') {
      // Store the intended destination
      const returnTo = encodeURIComponent(request.nextUrl.pathname);
      return NextResponse.redirect(new URL(`/login?returnTo=${returnTo}`, request.url));
    }

    // If user is authenticated and tries to access login
    if (user && request.nextUrl.pathname === '/login') {
      return NextResponse.redirect(new URL('/overview', request.url));
    }

    return res;
  } catch (error) {
    console.error('Middleware error:', error);
    // In case of error on protected routes, redirect to login
    if (request.nextUrl.pathname === '/summary') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return res;
  }
}

export const config = {
  matcher: ['/summary', '/login']  // Only run middleware for these routes
};