import { jwtDecode } from 'jwt-decode';
import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;

  // Публичные маршруты
  if (pathname === '/login' || pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Нет токена — на логин
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    const decoded = jwtDecode(token);
    const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    // Проверка доступа
    if (pathname.startsWith('/admin') && role !== 'Admin') {
      return NextResponse.redirect(new URL('/', req.url));
    }
    
    if (pathname.startsWith('/master') && role !== 'Doctor') {
      return NextResponse.redirect(new URL('/', req.url));
    }

  } catch (error) {
    console.error("Token verification failed:", error);
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/admin', '/master'],
};