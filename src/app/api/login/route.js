import axios from "axios";
import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const { data } = await axios.post(
      "http://147.45.146.15:5063/api/Auth/login",
      { email, password }
    );

    const token = data?.data?.token;
    if (!token) throw new Error("No token received");
    console.log(token);

    const decoded = jwtDecode(token);
    const role =
      decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    let redirectUrl = "/";
    if (role === "Admin") redirectUrl = "/admin";
    else if (role === "Doctor") redirectUrl = "/master";

    const response = NextResponse.json(
      { message: "Login successful", role, redirectTo: redirectUrl },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      // httpOnly: true,/
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: "lax",
      secure: false, // HTTP only
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
