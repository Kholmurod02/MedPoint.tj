import axios from "axios";
import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Replace with your actual API login URL
    const { data } = await axios.post(
      "http://147.45.146.15:5063/api/Auth/login",
      {
        email,
        password,
      }
    );

    const token = data?.data?.token;
    if (!token) throw new Error("No token received");

    const decoded = jwtDecode(token);
    const role =
      decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    let redirectUrl = "/";
    if (role === "Admin") redirectUrl = "/admin";
    else if (role === "Doctor") redirectUrl = "/master";
    else if (role === "User") redirectUrl = "/";

    const response = NextResponse.redirect(new URL(redirectUrl, req.url));
    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
      secure: false, // Use false because you're on HTTP
    });

    return response;
  } catch (error) {
    console.error("Login error:", error?.response?.data || error.message);
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }
}
