'use client';

import React from 'react';
import { Button, Link } from '@nextui-org/react';

function paidSuccess() {
	return (
		<div className='sm:w-full md:w-3/4 lg:w-3/4 max-h-full space-y-4 mx-auto flex flex-col items-center bg-primary-500 p-52 rounded-lg' >
			<h2 className='text-2xl  md:text-4xl lg:text-4xl whitespace-nowrap'>¡Pago realizado con éxito!</h2>
			<p className='text-2xl  md:text-4xl lg:text-4xl whitespace-nowrap'>Ya puedes acceder al curso.</p>
			
			<Button
				href='/course'
				as={Link}
				showAnchorIcon
				variant='solid'
                className='text-4xl  h-fit p-5 bg-blue-700 rounded-lg'>
				Ir al curso
			</Button>
			
		</div>
	);
}

export default paidSuccess;
