import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicPath = path === "/" || path === "/explore";

  const token = req.cookies.get("token")?.value || "";
  if (token && path === "/") {
    return NextResponse.redirect(new URL("/explore", req.nextUrl));
  }
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
  if (!token && (path === "/property" || path === "/cart")) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/explore", "/property", "/cart"],
};

