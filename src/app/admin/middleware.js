import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(req) {
  // Get the admin token from cookies
  const token = req.cookies.get("adminToken");

  // If no token is found, redirect to the login page
  if (!token) {
    return NextResponse.redirect("/admin/login");
  }

  try {
    // Verify the token with the JWT secret
    jwt.verify(token, process.env.JWT_SECRET);
    
    // If the token is valid, allow the request to proceed
    return NextResponse.next();
  } catch (error) {
    // If the token is invalid or expired, redirect to login
    return NextResponse.redirect("/admin/login");
  }
}

// Protect all routes under /admin
export const config = {
  matcher: ["/admin/:path*"], // Matches any route under /admin
};
