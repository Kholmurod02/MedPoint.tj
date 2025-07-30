import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

// Роли и разрешённые маршруты
const roleRoutes = {
  Admin: ["/admin"],
  Doctor: ["/master"],
  User: ["/"], // только /
};

// Публичные страницы (доступны без токена)
const publicRoutes = ["/login", "/register"];

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();
  const pathname = req.nextUrl.pathname;

  // ❌ Если нет токена и не на публичной странице — редирект на login
  if (!token && !publicRoutes.includes(pathname)) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // ✅ Если есть токен
  if (token) {
    try {
      const decoded = jwtDecode(token);
      const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

      // 🔒 Если авторизованный пользователь пытается попасть на /login — редирект на свою роль-страницу
      if (publicRoutes.includes(pathname)) {
        if (role === "Admin") url.pathname = "/admin";
        else if (role === "Doctor") url.pathname = "/master";
        else url.pathname = "/";
        return NextResponse.redirect(url);
      }

      // ✅ Проверка разрешённых маршрутов
      const allowedRoutes = roleRoutes[role] || [];

      const isAllowed = allowedRoutes.some((route) => {
        return pathname === route || pathname.startsWith(route + "/");
      });

      // ❌ Если путь не разрешён — редирект на свою домашнюю страницу
      if (!isAllowed) {
        if (role === "Admin") url.pathname = "/admin";
        else if (role === "Doctor") url.pathname = "/master";
        else url.pathname = "/";
        return NextResponse.redirect(url);
      }

    } catch (err) {
      console.error("Invalid token:", err);
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  // ✅ Всё ок — продолжаем
  return NextResponse.next();
}

// export const config = {
//   matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
// };
export const config = {
  matcher: [
    "/", "/login", "/register",
    "/admin", "/admin/:path*",
    "/master", "/master/:path*",
  ],
};