import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const token = request.cookies.get("token")?.value;

  // if user does not have token, redirect to login page
	if (!token) {
		if (pathname === "/") return NextResponse.next();
		return NextResponse.redirect(new URL("/", request.url));
	}

  // if user has token, redirect to dashboard
	if (pathname === "/") {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/", "/dashboard/:path*"],
};
