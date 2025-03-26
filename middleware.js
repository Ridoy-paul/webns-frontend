import { NextResponse } from 'next/server';

export function middleware(req) {
    const token = req.cookies.get('authToken');

    if (req.nextUrl.pathname.startsWith('/user') && !token) {
        const loginUrl = new URL('/login', req.url);
        loginUrl.searchParams.set('r', 'true'); // Add query param
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/user/:path*'],
};
