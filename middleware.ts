// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Skip middleware for certain paths
  const publicPaths = ['/api', '/_next', '/fonts', '/examples'];
  if (publicPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Skip middleware for public files
  if (/\.[\w-]+$/.test(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });

  try {
    const { data: { user }, error } = await supabase.auth.getUser();

    // Protected routes that require authentication
    const protectedRoutes = ['/summary', '/overview'];
    
    // If there's an auth error or no user and we're trying to access protected routes
    if ((error || !user) && protectedRoutes.includes(request.nextUrl.pathname)) {
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
  matcher: [
    // Match all paths except static files and API routes
    '/((?!api|_next|fonts|examples|[\\w-]+\\.\\w+).*)',
  ],
};