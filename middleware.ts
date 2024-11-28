// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse, NextRequest } from 'next/server';

const PUBLIC_ROUTES = ['/', '/login', '/auth', '/api/public'];
const AUTH_ROUTES = ['/overview', '/summary', '/get-credits'];

export async function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  
  // Skip redirect for localhost or IP addresses
  if (host.includes('localhost') || host.includes('[::1]')) {
    return NextResponse.next();
  }

  // Only redirect if it's not a www domain
  if (!host.startsWith('www.')) {
    return NextResponse.redirect(
      `https://www.${host}${request.nextUrl.pathname}${request.nextUrl.search}`,
      301
    );
  }

  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });
  const { data: { session } } = await supabase.auth.getSession();

  const isPublicRoute = PUBLIC_ROUTES.some(route => 
    request.nextUrl.pathname.startsWith(route)
  );
  const isAuthRoute = AUTH_ROUTES.some(route => 
    request.nextUrl.pathname.startsWith(route)
  );

  if (!session && isAuthRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (session && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/overview', request.url));
  }

  return res;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};