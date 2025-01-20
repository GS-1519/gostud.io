// middleware.ts
import createIntlMiddleware from 'next-intl/middleware';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Update public paths to be more comprehensive
const publicPaths = [
  '/api', 
  '/_next', 
  '/fonts', 
  '/examples',
  '/astria',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml'
];

// Create the intl middleware
const intlMiddleware = createIntlMiddleware({
  locales: ['en', 'fr', 'ar', 'cn', 'de', 'ja', 'ko', 'es', 'it', 'th', 'tr', 'br', 'ru', 'vi', 'id'],
  defaultLocale: 'en',
  localePrefix: 'always'
});

export async function middleware(request: NextRequest) {
  try {
    // Skip middleware for static files
    if (request.nextUrl.pathname.match(/\.(ico|png|jpg|jpeg|svg|webmanifest)$/)) {
      return NextResponse.next();
    }

    // Skip middleware for static files and API routes with more robust check
    if (publicPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
      return NextResponse.next();
    }

    // Improved static file check
    if (/\.(ico|jpg|jpeg|png|gif|svg|css|js|woff|woff2|ttf)$/i.test(request.nextUrl.pathname)) {
      return NextResponse.next();
    }

    // First apply the intl middleware
    const response = intlMiddleware(request);
    const supabase = createMiddlewareClient({ req: request, res: response });

    // Add timeout to prevent hanging
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Auth timeout')), 3000);
    });

    const { data: { user }, error } = await Promise.race([
      supabase.auth.getUser(),
      timeoutPromise
    ]) as { data: { user: any }, error: any };
    
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
    // Return a next response instead of potentially undefined response
    return NextResponse.next();
  }
}

// Update matcher configuration to be more precise
export const config = {
  matcher: [
    // Match all paths except static files and API routes
    '/((?!api|_next/static|_next/image|fonts|examples|astria|favicon.ico).*)',
    // Match all locale paths
    '/(ar|en|fr|cn|de|ja|ko|es|it|th|tr|br|ru|vi|id)/:path*'
  ]
};