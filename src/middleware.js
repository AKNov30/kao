// middleware.js
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // ถ้าหน้านั้นๆ เป็น public page ให้ข้าม middleware นี้ได้เลย
  const publicPaths = ["/auth/login"];
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    if (token && pathname === "/auth/login") {
      return NextResponse.redirect(new URL("/home", req.url));
    }
    return NextResponse.next();
  }

  // Debugging: ตรวจสอบค่า token และ pathname
  console.log("Token in Middleware:", token);
  console.log("Requested Path:", pathname);

  // ถ้ามี token และผู้ใช้พยายามเข้าถึงหน้า login ให้ redirect ไปหน้า home
  if (token && pathname === "/auth/login") {
    console.log("User already logged in, redirecting to home.");
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // ถ้าไม่มี token ให้ redirect ไปหน้า login
  if (!token) {
    console.log("No token found, redirecting to login.");
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // ตรวจสอบ role ของ user ไม่ให้เข้าหน้า admin
  if (token.role === "user" && pathname === "/admin") {
    console.log("User does not have admin role, redirecting to home.");
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // ตรวจสอบ role ของ user สำหรับหน้า /admin และ /admin/addproduct ไม่ให้เข้าถ้าผู้ใช้ไม่มีสิทธิ์ admin
  if (
    (pathname === "/admin" || pathname === "/admin/addproduct") &&
    token.role !== "admin"
  ) {
    console.log("User does not have admin role, redirecting to home.");
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // ตรวจสอบ role ของ user สำหรับหน้า /register ไม่ให้เข้า
  if (token.role !== "admin" && pathname === "/auth/register") {
    console.log("User does not have admin role, redirecting to home.");
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // ตรวจสอบ role ของ user สำหรับ API เส้นทาง /api/auth/register
  if (pathname === "/api/auth/register" && token.role !== "admin") {
    console.log("User does not have admin role, blocking register API access.");
    return new NextResponse("Unauthorized", { status: 403 });
  }

  // ตรวจสอบ role ของ user สำหรับ API เส้นทาง /api/admin
  if (pathname.startsWith("/api/admin") && token.role !== "admin") {
    console.log("User does not have admin role, blocking API access.");
    return new NextResponse("Unauthorized", { status: 403 });
  }

  console.log("Access granted to path:", pathname);
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/admin/:path*",
    "/admin/addproduct",
    "/home/:path*",
    "/auth/login",
    "/auth/register",
    "/api/auth/register",
    "/api/admin/:path*",
  ],
};
