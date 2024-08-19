// middleware.js
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
	const { cookies, url } = request;
	const authCookie = cookies.get('auth');

	const authPaths = ['/signin', '/signup'];

	// If the user is authenticated and tries to access /signin or /signup, redirect to /
	if (authCookie && authPaths.includes(new URL(url).pathname)) {
		return NextResponse.redirect(new URL('/', url));
	}
	if (!authCookie && !authPaths.includes(new URL(url).pathname)) {
		return NextResponse.redirect(new URL('/signin', url));
	}

	// Continue with the request
	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		'/((?!api|_next/static|_next/image|icons|images|favicon.ico).*)'
	]
};
