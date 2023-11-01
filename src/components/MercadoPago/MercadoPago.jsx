'use client';
import { toastError } from '@/helpers/toast';
import { postData } from '@/hooks/postData';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import Paypal from '../paypal/Paypal';
import { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Stripe from '../stripe/Stripe';

function ErrorMessage({ message }) {
	return (
		<div className='w-full py-3 px-6 text-center rounded-xl transition bg-primary hover:bg-gray-800 text-white font-semibold flex justify-center'>
			{message}
		</div>
	);
}

function MercadoPago({ className }) {
	initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY);
	const router = useRouter();
	const { data: session } = useSession();
	const [preferenceId, setPreferenceId] = useState(null);
	const idUser = getCookie('jsdklfsdjklfdsjfds');

	const createPreference = async () => {
		try {
			if (!idUser) return;

			const response = await postData(
				`${process.env.API_BACKEND}create-order-mp?id=${idUser}`
			);
			const { id } = response;
			setPreferenceId(id);
		} catch (error) {
			toastError(error.message);
		}
	};

	useEffect(() => {
		if (idUser && !preferenceId) createPreference();
	}, [preferenceId]);

	if (!session?.token || !preferenceId) {
		return <ErrorMessage message='Necesita una cuenta para comprar' />;
	}

	return (
		<>
			<>
				{idUser ? (
					preferenceId ? (
						<>
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
							<Paypal />
							<Stripe />
						</>
					) : (
						<ErrorMessage message='Cargando preferencia de pago...' />
					)
				) : (
					<ErrorMessage message='Necesita una cuenta para comprar' />
				)}
			</>
		</>
	);
}

export default MercadoPago;
