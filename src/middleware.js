import { NextResponse } from 'next/server';

export const middleware = async request => {
    const session = request.cookies.get('jwt');

    if (!session && request.nextUrl.pathname != '/auth') {
        const requestedPage = request.nextUrl.pathname;
        const url = request.nextUrl.clone();
        url.pathname = `/auth`;
        url.search = `p=${requestedPage}`;
        return NextResponse.redirect(url);
    }
    if (request.nextUrl.pathname === '/auth') {
        const response = NextResponse.next();
        response.cookies.set('jwt', '', { expires: new Date(0) });
        return response;
    }


    return NextResponse.next();
};

export const config = {
    matcher: ['/course', '/auth'],
};