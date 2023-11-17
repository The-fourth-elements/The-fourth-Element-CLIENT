import { postData } from '@/hooks/fetchData';
import {NextResponse} from 'next/server';

// ruta que hara de intermediario entre el back en node y este front
export async function POST(request){
    const body = await request.json();
    //SE CREA EL USUARIO.
    const response = await postData(`${process.env.API_BACKEND}auth`, body);
    
    return NextResponse.json(response)
}