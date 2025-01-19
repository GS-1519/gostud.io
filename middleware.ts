// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define locales
const locales = ['en', 'fr', 'ar', 'cn', 'de', 'ja', 'ko', 'es', 'it', 'th', 'tr', 'br', 'ru', 'vi', 'id'];

// Create the intl middleware
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'always'
});

// Define public paths that don't need locale prefix
const publicPaths = [
  '/api',
  '/_next',
  '/fonts',
  '/examples',
  '/astria',
  '/images',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml'
];

export async function middleware(request: NextRequest) {
  // Check if the path is a public path
  if (publicPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Apply the intl middleware first
  const response = intlMiddleware(request);

  // Initialize Supabase client
  const supabase = createMiddlewareClient({ req: request, res: response });

  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    // Get the current locale from the URL
    const locale = request.nextUrl.pathname.split('/')[1] || 'en';
    
    // Handle authentication redirects
    if (request.nextUrl.pathname.includes('/login') && user) {
      return NextResponse.redirect(new URL(`/${locale}/overview`, request.url));
    }

    // Protected routes that require authentication
    const protectedRoutes = ['/summary', '/overview'];
    if (protectedRoutes.some(route => request.nextUrl.pathname.includes(route))) {
      if (!user || error) {
        return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
      }
    }

    return response;
  } catch (error) {
    console.error('Middleware error:', error);
    return response;
  }
}

// Update the matcher configuration
export const config = {
  matcher: [
    // Match all pathnames except static files
    '/((?!_next/static|_next/image|favicon.ico).*)',
    // Optional: Also match API routes
    '/api/:path*'
  ]
};