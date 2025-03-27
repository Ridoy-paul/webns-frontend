import { NextResponse } from 'next/server';

export function middleware(req) {
    const token = req.cookies.get('authToken');

    if (req.nextUrl.pathname.startsWith('/ticket') && !token) {
        const loginUrl = new URL('/login', req.url);
        loginUrl.searchParams.set('r', 'true');
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/ticket/:path*'],
};
