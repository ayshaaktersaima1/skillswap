import { NextResponse } from 'next/server';
import { auth } from './lib/auth';

export async function proxy(request) {
    const session = await auth.api.getSession({
        headers: request.headers,
    });

    const pathname = request.nextUrl.pathname;

    if (!session) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    const role = session?.user?.role?.toLowerCase();

    if (pathname.startsWith('/dashboard/client') && role !== 'client') {
        return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url));
    }

    if (pathname.startsWith('/dashboard/freelancer') && role !== 'freelancer') {
        return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url));
    }

    if (pathname.startsWith('/dashboard/admin') && role !== 'admin') {
        return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};