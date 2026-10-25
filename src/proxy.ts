import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((request) => {
  const pathname = request.nextUrl.pathname;
  const user = request.auth?.user;

  if (!user?.id) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set(
      "callbackUrl",
      `${pathname}${request.nextUrl.search}`,
    );
    return NextResponse.redirect(signInUrl);
  }

  if (pathname.startsWith("/admin") && user.role !== "admin") {
    return NextResponse.redirect(new URL("/forbidden", request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
