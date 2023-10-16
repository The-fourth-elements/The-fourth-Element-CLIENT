'use client';

import { postData } from '@/hooks/postData';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { Button, Link } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

function MercadoPago({ className }) {
	initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY);

	const [preferenceId, setPreferenceId] = useState(null);
	const session = useSession();
	const router = useRouter();

	console.log("session ", session );

	const createPreference = async () => {
		try {
			const response = await postData(`${process.env.API_BACKEND}create-order?id=${session?.data?.token?.user?.id}`);

			const { id } = response;

			// Una vez que obtienes el ID de preferencia, establece el estado
			setPreferenceId(id);
		} catch (error) {
			console.log(error);
		}
	};

	// Utiliza useEffect para observar cambios en preferenceId
	useEffect(() => {
		createPreference();
	}, []);

	

	return (
		<div>
			{!session?.data?.token?.user?.id ? (
				<button className='w-full py-3 px-6 text-center rounded-xl transition bg-primary hover:bg-gray-800'>
					<Link href='/auth' className='text-white font-semibold'>
							Crea una cuenta para comprar el curso
					</Link>
				</button>
			) : (
				preferenceId && (
					<Wallet
						customization={{
							visual: {
								buttonBackground: 'black',
								borderRadius: '6px',
							},
						}}
						initialization={{
							preferenceId: preferenceId,
							redirectMode: 'modal',
						}}
					/>
				)
			)}
		</div>
	);
}

export default MercadoPago;
