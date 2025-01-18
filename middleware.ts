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
  '/astria'
];

const locales = ['en', 'fr', 'ar', 'cn', 'de', 'ja', 'ko', 'es', 'it', 'th', 'tr', 'br', 'ru', 'vi', 'id'];

// Create the intl middleware
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'always'
});

export async function middleware(request: NextRequest) {
  // Check if the pathname starts with any of the public paths
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
        return NextResponse.redirect(new URL(`/${locale}/overview`, request.url));
      }
      return response;
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

// Update the matcher configuration to catch all routes
export const config = {
  matcher: [
    // Match all request paths except for the ones starting with:
    // - api (API routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    // But include all locale prefixes
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    // Also match all locale prefixes explicitly
    `/(${locales.join('|')})(.*)`
  ]
};