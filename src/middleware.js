import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Debugging: ตรวจสอบค่า token และ pathname
  console.log("Token in Middleware:", token);
  console.log("Requested Path:", pathname);

  // ถ้าไม่มี token ให้ redirect ไปหน้า login
  if (!token) {
    console.log("No token found, redirecting to login.");
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // ตรวจสอบ role ของ user
  if (token.role === "user" && pathname === "/admin") {
    console.log("User does not have admin role, redirecting to home.");
    return NextResponse.redirect(new URL("/home", req.url));
  }

  console.log("Access granted to path:", pathname);
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin", "/home/:path*", "/home"],
};