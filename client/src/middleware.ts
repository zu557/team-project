// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Helper to set anti-caching headers (good practice for authenticated pages)
function setNoCacheHeaders(res: NextResponse) {
  res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.headers.set("Pragma", "no-cache");
  res.headers.set("Expires", "0");
  res.headers.set("Surrogate-Control", "no-store");
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  // 1. LOGGED-IN REDIRECT (FIXED LOGIC) 🚀
  // If the user has a token AND is trying to access the /login page,
  // redirect them to the /admin page.
  if (token && pathname.startsWith("/login")) {
    const redirectRes = NextResponse.redirect(new URL("/admin", req.url));
    setNoCacheHeaders(redirectRes);
    return redirectRes;
  }

  // 2. ADMIN PROTECTION (Existing Logic) 🛡️
  // If the user is trying to access /admin but does NOT have a token,
  // redirect them back to the /login page.
  if (pathname.startsWith("/admin")) {
    if (!token) {
      const redirectRes = NextResponse.redirect(new URL("/login", req.url));
      setNoCacheHeaders(redirectRes);
      return redirectRes;
    }
  }

  // 3. Default behavior: Proceed with the request
  const res = NextResponse.next();
  
  // Apply no-cache headers to the admin pages (even if logged in)
  if (pathname.startsWith("/admin")) {
    setNoCacheHeaders(res);
  }
  
  return res;
}

// 🚦 Configuration: Ensure the middleware runs on both /admin and /login paths
export const config = {
  matcher: ["/admin/:path*", "/login"],
};