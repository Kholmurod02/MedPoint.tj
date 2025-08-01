import { NextResponse } from "next/server";
import jwtDecode from "jwt-decode";

// Roles and allowed routes
const roleRoutes = {
  Admin: ["/admin"],
  Doctor: ["/master"],
  User: ["/"], // only "/"
};

// Public routes accessible without token
const publicRoutes = ["/login", "/register"];

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();
  const pathname = req.nextUrl.pathname;

  // Log request info for debugging
  console.log("Middleware triggered:");
  console.log("  Pathname:", pathname);
  console.log("  Token:", token ? "Exists" : "None");

  // If no token and not on public page — redirect to login
  if (!token && !publicRoutes.includes(pathname)) {
    console.log(
      "  No token and accessing protected route - redirect to /login"
    );
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // If token exists
  if (token) {
    try {
      const decoded = jwtDecode(token);
      const role =
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      console.log("  User role from token:", role);

      // Redirect logged-in user away from public pages if needed
      if (publicRoutes.includes(pathname)) {
        let redirectTo = "/";
        if (role === "Admin") redirectTo = "/admin";
        else if (role === "Doctor") redirectTo = "/master";

        if (pathname !== redirectTo) {
          console.log(
            `  Authenticated user on public page, redirecting to ${redirectTo}`
          );
          url.pathname = redirectTo;
          return NextResponse.redirect(url);
        }
      }

      // Check if user role allows the route
      const allowedRoutes = roleRoutes[role] || [];
      const isAllowed = allowedRoutes.some(
        (route) => pathname === route || pathname.startsWith(route + "/")
      );

      if (!isAllowed) {
        // Redirect to user's home page if not allowed
        let redirectTo = "/";
        if (role === "Admin") redirectTo = "/admin";
        else if (role === "Doctor") redirectTo = "/master";

        if (pathname !== redirectTo) {
          console.log(
            `  Access denied to ${pathname}, redirecting to ${redirectTo}`
          );
          url.pathname = redirectTo;
          return NextResponse.redirect(url);
        }
      }
    } catch (err) {
      console.error("  Invalid token:", err);
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  // All checks passed - continue request
  console.log("  Access granted - continue");
  return NextResponse.next();
}

// Match these routes for middleware
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
