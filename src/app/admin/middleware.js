// app/admin/middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('admin-token');
  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  // Optional: You can verify token with JWT or other logic.
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],  // Apply middleware to all admin routes
};
