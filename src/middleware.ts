import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicPath = path === "/";

  const token = req.cookies.get("token")?.value || "";
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/explore", req.nextUrl));
  }
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/explore"],
};
