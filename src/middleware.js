import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;

  // Construct regular expression to match '/dashboard/' followed by any path
  const isAdminPath = /^\/admin\/dashboard(\/[^\/]+)*\/?$/.test(path);

  const token = request.cookies.get('token')?.value || '';

  // If it's an admin path and there's no token, redirect
  if (isAdminPath && !token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }
}

// Matcher configuration to match all paths starting with '/dashboard/'
export const config = {
  matcher: [
    '/admin/dashboard/:path*'
  ]
};
