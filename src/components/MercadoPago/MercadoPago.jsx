'use client';

import { postData } from '@/hooks/postData';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { Button } from '@nextui-org/react';
import { useState, useEffect } from 'react';


function MercadoPago() {
    initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY);

	const [preferenceId, setPreferenceId] = useState(null);

	const createPreference = async () => {
		try {
			const response = await postData(`${process.env.API_BACKEND}create-order`);

			const { id } = response;

			// Una vez que obtienes el ID de preferencia, establece el estado
			setPreferenceId(id);

		} catch (error) {
			console.log(error);
		}
	};

	// Utiliza useEffect para observar cambios en preferenceId
	useEffect(() => {
		if (preferenceId) {
		}
	}, [preferenceId]);

	const handleBuy = async () => {
		await createPreference();

	};

	return (
		<div>
			<Button onClick={handleBuy}>Comprar</Button>
			{preferenceId && <Wallet initialization={{ preferenceId : preferenceId, redirectMode: 'modal'}} />}
		</div>
	);
}

export default MercadoPago;
