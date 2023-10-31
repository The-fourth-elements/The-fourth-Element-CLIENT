import { NextResponse } from 'next/server';

export const middleware = async request => {
    const develop = 'next-auth.session-token';
    const production = '__Secure-next-auth.session-token';
    const session = request.cookies.get(develop);
    const id = request.cookies.get('jsdklfsdjklfdsjfds');
    let role = 0;
    if (id) {
        try {
            const response = await fetch(
                `${process.env.API_BACKEND}user?id=${id.value}`
            );
            const user = await response.json();
            role = user.role;
        } catch (error) {
            console.log(error);
        }
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

    const path = request.nextUrl.pathname;
    if (session && path.startsWith('/dashboard')) {
        const url = request.nextUrl.clone();
        //verificar el rol
        if (role > 1) {
            return NextResponse.next();
        } else {
            url.pathname = '/profile';
        }
        return NextResponse.redirect(url);
    }
    if (path === '/prices') {
        if (role === 1) {
            const requestedPage = path;
            const url = request.nextUrl.clone();
            url.pathname = '/profile';
            url.search = `p=${requestedPage}`;
            return NextResponse.redirect(url);
        } else {
            return NextResponse.next();
        }
    }
    if (!session && path !== '/auth') {
        const requestedPage = path;
        const url = request.nextUrl.clone();
        url.pathname = '/auth';
        url.search = `p=${requestedPage}`;
        return NextResponse.redirect(url);
    }

    if (!session && path === '/paid-success') {
        const requestedPage = path;
        const url = request.nextUrl.clone();
        url.pathname = '/auth';
        url.search = `p=${requestedPage}`;
        return NextResponse.redirect(url);
    }

    if (session && path === '/paid-success') {
        const requestedPage = path;
        const url = request.nextUrl.clone();
        if (role < 1) {
            url.pathname = '/auth';
            url.search = `p=${requestedPage}`;
            return NextResponse.redirect(url);
        }
    }
    return NextResponse.next();
};

export const config = {
    matcher: [
        '/course/:path*',
        '/auth',
        '/dashboard/:path*',
        '/profile/:path*',
        '/paid-success',
        '/prices',
    ],
};
