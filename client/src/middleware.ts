import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Paths you want to protect
const protectedRoutes = ["/add", "/admin"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only check if the path starts with a protected route
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      // No token → redirect to login
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
    // Optionally verify the JWT here with a library like jose
    // If invalid, redirect as well.
  }

  return NextResponse.next();
}
