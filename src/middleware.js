import { NextResponse } from 'next/server';

export const middleware = async request => {
    const develop = 'next-auth.session-token';
    const production = '__Secure-next-auth.session-token';
    const session = request.cookies.get(production);

    // /traer el role con un getId y me indicara el role que tiene
    const id = request.cookies.get('jsdklfsdjklfdsjfds');
    let role = 0;
    if (id) {
        const response = await fetch(
            `${process.env.API_BACKEND}user?id=${id.value}`
        );
        const user = await response.json();
        role = user.role;
    }
    if (session && request.nextUrl.pathname === '/auth') {
        const url = request.nextUrl.clone();
        // El usuario está autenticado y está intentando acceder a la página de autenticación,
        // redirigirlo a la página de curso.
        if (role > 1) {
            url.pathname = '/dashboard';
        } else {
            url.pathname = '/course';
        }
        return NextResponse.redirect(url);
    }
    if (session && request.nextUrl.pathname === '/dashboard') {
        const url = request.nextUrl.clone();
        //verificar el rol
        if (role > 1) {
            return NextResponse.next();
        } else {
            url.pathname = '/course';
        }
        return NextResponse.redirect(url);
    }

    if (!session && request.nextUrl.pathname !== '/auth') {
        const requestedPage = request.nextUrl.pathname;
        const url = request.nextUrl.clone();
        url.pathname = '/auth';
        url.search = `p=${requestedPage}`;
        return NextResponse.redirect(url);
    }
    return NextResponse.next();
};

export const config = {
    matcher: ['/course/:path*', '/auth/:path*', '/dashboard/:path*', '/profile/:path*'],
};