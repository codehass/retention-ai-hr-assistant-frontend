import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

function isAuthenticated(request: NextRequest) {
	const sessionToken = request.cookies.get("access_token")?.value;

	return !!sessionToken;
}

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	if (pathname === "/dashboard") {
		if (!isAuthenticated(request)) {
			const loginUrl = new URL("/register", request.url);

			return NextResponse.redirect(loginUrl);
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard"],
};
