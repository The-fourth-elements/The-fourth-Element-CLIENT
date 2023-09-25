import { NextResponse } from 'next/server';
import nextAuth from 'next-auth';

export const middleware = async request => {
    const session = request.cookies.get('next-auth.session-token');
    const user = await nextAuth.getSession(session); // aqui deberia obtener la sesion del usuario actual pero siempre me da vacio
    // es como si ningun usuario ingresara
    const role = user?.user?.role;// entonces ya no tiene propiedades

    const pathname = request.nextUrl?.pathname ?? '';

   
    if (!pathname) {
        return NextResponse.redirect('/');
    }

    if (session && pathname === '/auth') {
        if (role <= 1) {
            
            const url = request.nextUrl?.clone();
            url.pathname = '/course';
            return NextResponse.redirect(url);
        } else {
            
            const url = request.nextUrl?.clone();
            url.pathname = '/dashboard';
            return NextResponse.redirect(url);
        }
    }
    if (session && pathname === '/dashboard') {
        const url = request.nextUrl?.clone();
        //verificar el rol
        url.pathname = '/course';
        return NextResponse.redirect(url);
    }

    if (!session && pathname !== '/auth') {
        const requestedPage = pathname;
        const url = request.nextUrl?.clone();
        url.pathname = '/auth';
        url.search = `p=${requestedPage}`;
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
};
// export const middleware = async request => {
//     const session = request.cookies.get('next-auth.session-token');

//     if (session && request.nextUrl.pathname === '/auth') {
//         // El usuario está autenticado y está intentando acceder a la página de autenticación,
//         // redirigirlo a la página de curso.
//         const url = request.nextUrl.clone();
//         url.pathname = '/dashboard';
//         return NextResponse.redirect(url);
//     }
//     if (session && request.nextUrl.pathname === '/dashboard') {
//         const url = request.nextUrl.clone();
//         //verificar el rol
//         url.pathname = '/course';
//         return NextResponse.redirect(url);
//     }

//     if (!session && request.nextUrl.pathname !== '/auth') {
//         const requestedPage = request.nextUrl.pathname;
//         const url = request.nextUrl.clone();
//         url.pathname = '/auth';
//         url.search = `p=${requestedPage}`;
//         return NextResponse.redirect(url);
//     }

//     return NextResponse.next();
// };

export const config = {
    matcher: ['/course', '/auth', '/dashboard'],
};