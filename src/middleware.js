import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

// Role-based route access
const roleRoutes = {
  Admin: ["/admin"],
  Doctor: ["/master"],
  User: ["/"], // basic users
};

// Public routes that don't require auth
const publicRoutes = ["/login", "/register","/"];

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();
  const pathname = req.nextUrl.pathname;

  console.log("MIDDLEWARE ⛔ Path:", pathname);
  console.log("Token exists:", token);

  // If not logged in, redirect to login for protected pages
  if (!token && !publicRoutes.includes(pathname)) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (token) {
    try {
      const decoded = jwtDecode(token);
      const role =
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      console.log("User role:", role);

      const isPublic = publicRoutes.includes(pathname);
      const isAllowed =
        roleRoutes[role]?.some(
          (r) => pathname === r || pathname.startsWith(r + "/")
        ) ?? false;

      if (isPublic) {
        const redirectPath = roleRoutes[role]?.[0] || "/";
        url.pathname = redirectPath;
        return NextResponse.redirect(url);
      }

      if (!isAllowed) {
        const redirectPath = roleRoutes[role]?.[0] || "/";
        url.pathname = redirectPath;
        return NextResponse.redirect(url);
      }
    } catch (err) {
      console.error("Token decode error:", err);
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/admin",
    "/admin/:path*",
    "/master",
    "/master/:path*",
  ],
};
