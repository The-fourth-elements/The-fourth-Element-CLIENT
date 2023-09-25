import { NextResponse } from 'next/server';

export const middleware = async request => {
    const session = request.cookies.get('next-auth.session-token');

    ///traer el role con un getId y me indicara el role que tiene
    const id = request.cookies.get('id');
    console.log(id);
    let role = 0;
    if (id) {
        const response = await fetch(`${process.env.API_BACKEND}user?id=${id.value}`);
        const user = await response.json();
        console.log(user);
        role = user.role;
        console.log(role, '"dfjhkddddddddddddddddddddddddd');
    }




    if (session && request.nextUrl.pathname === '/auth') {
        // El usuario está autenticado y está intentando acceder a la página de autenticación,
        // redirigirlo a la página de curso.
        const url = request.nextUrl.clone();
        url.pathname = '/dashboard';
        return NextResponse.redirect(url);
    }
    // if (session && request.nextUrl.pathname === '/dashboard') {
    //     const url = request.nextUrl.clone();
    //     //verificar el rol
    //     console.log('soy el roled', role);
    //     if (role > 1) {
    //         url.pathname = '/dashboard'
    //     } else {
    //         url.pathname = '/course';
    //     }
    //     return NextResponse.redirect(url);
    // }


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
    matcher: ['/course', '/auth', '/dashboard'],
};