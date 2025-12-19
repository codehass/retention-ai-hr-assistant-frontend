import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function isAuthenticated(request: NextRequest) {
	const sessionToken = request.cookies.get("access_token")?.value;
	return !!sessionToken;
}

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const loggedIn = isAuthenticated(request);
	if (pathname === "/" && loggedIn) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	if (pathname.startsWith("/dashboard") && !loggedIn) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/", "/dashboard/:path*"],
};
