import { postData } from '@/hooks/postData';
import {NextResponse} from 'next/server';

// ruta que hara de intermediario entre el back en node y este front
export async function POST(request){
    const body = await request.json();
    const {name, email, password} = body;
    //SE CREA EL USUARIO.
    const response = await postData(`${process.env.API_BACKEND}auth`, body);
    
    return NextResponse.json(response)
}