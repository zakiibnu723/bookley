import { NextResponse } from "next/server";

export function middleware(request) {
  console.log("Cookies:", request.cookies.getAll());
  const token = request.cookies.get("sb-access-token")?.value; // Supabase token

  // Proteksi banyak route sekaligus
  const protectedPaths = ["/dashboard", "/profile", "/admin", "/booking"];
  const { pathname } = request.nextUrl;

  // Cek apakah path diawali salah satu protectedPaths
  const isProtected = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/admin/:path*",
    "/booking/:path*",
  ],
};