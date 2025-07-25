import axios from "axios";
import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const { data } = await axios.post("http://147.45.146.15:5063/api/Auth/login", {
      email,
      password,
    });

    const token = data?.data?.token;
    if (!token) throw new Error("No token received");

    // Декодируем токен, чтобы получить роль
    const decoded = jwtDecode(token);
    const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    // Определяем куда редиректить по роли
    let redirectUrl = "/";
    if (role === "Admin") redirectUrl = "/admin";
    else if (role === "Doctor") redirectUrl = "/master";
    else if (role === "User") redirectUrl = "/"; // пример для клиента

    // Формируем ответ с cookie
    const response = NextResponse.json(
      { message: "Login successful", role },
      { status: 200, headers: { Location: redirectUrl } }
    );

    response.cookies.set("token", token, {
      // httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 день
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error?.response?.data || error.message);
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }
}
