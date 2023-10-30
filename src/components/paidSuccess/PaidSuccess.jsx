'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { deleteCookie } from 'cookies-next';
import { toastError } from '@/helpers/toast';



function paidSuccess() {
	
	const router = useRouter();

	const handleLogout = async () => {
		try {
			deleteCookie('jsdklfsdjklfdsjfds');
			await signOut();
			router.push('/auth');
		} catch (error) {
			toastError('Ocurrio un error en el cierre de sesión');
		}
	};

	useEffect(() => {
		setTimeout(() => {
			handleLogout()
		}, 2500);
	}, []);


	return (
			
				<div className='sm:w-full md:w-3/4 lg:w-3/4 max-h-full space-y-4 mx-auto flex flex-col items-center bg-primary-500 p-52 rounded-lg'>
					<h2 className='text-2xl md:text-4xl lg:text-4xl whitespace-nowrap'>
						¡Pago realizado con éxito!
					</h2>
					<p className='text-2xl md:text-4xl lg:text-4xl whitespace-nowrap'>
						Inicie sesión nuevamente para acceder al curso
					</p>
					
				</div>
	);
}

export default paidSuccess;
