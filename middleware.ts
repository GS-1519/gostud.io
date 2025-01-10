// middleware.ts
import createIntlMiddleware from 'next-intl/middleware';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of paths that don't need locale prefix
const publicPaths = [
  '/api', 
  '/_next', 
  '/fonts', 
  '/examples',
  '/astria'  // Add this to skip middleware for astria routes
];

// Create the intl middleware
const intlMiddleware = createIntlMiddleware({
  locales: ['en', 'fr', 'ar', 'cn', 'de', 'ja', 'ko', 'fr'],
  defaultLocale: 'en',
  localePrefix: 'always'
});

export async function middleware(request: NextRequest) {
  // Skip middleware for static files and API routes
  if (publicPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Skip middleware for public files
  if (/\.[\w-]+$/.test(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // First apply the intl middleware
  const response = intlMiddleware(request);
  const supabase = createMiddlewareClient({ req: request, res: response });

  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    // Get the current locale from the URL or default to 'en'
    const locale = request.nextUrl.pathname.split('/')[1] || 'en';
    
    // Handle login page access
    if (request.nextUrl.pathname.includes('/login')) {
      if (user) {
        // If user is authenticated, redirect to overview
        return NextResponse.redirect(new URL(`/${locale}/overview`, request.url));
      }
      return response;
    }

    // Protected routes that require authentication
    const protectedRoutes = ['/summary', '/overview'];
    
    // Check if current path is protected
    const isProtectedRoute = protectedRoutes.some(route => 
      request.nextUrl.pathname.includes(route)
    );

    if (isProtectedRoute && (!user || error)) {
      // Redirect to login while preserving the locale
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }

    return response;

  } catch (error) {
    console.error('Middleware error:', error);
    return response;
  }
}

export const config = {
  matcher: [
    // Match all paths except static files and API routes
    '/((?!api|_next|fonts|examples|[\\w-]+\\.\\w+).*)',
    '/(ar|en|fr|de|zh)/:path*'
  ]
};