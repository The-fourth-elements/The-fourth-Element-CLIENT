'use client';

import { postData } from '@/hooks/postData';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { Button } from '@nextui-org/react';
import { useState, useEffect } from 'react';

function MercadoPago() {
    initMercadoPago("TEST-5841b2e7-9436-4c6c-9e47-0d7cd27f1a93");

	const [preferenceId, setPreferenceId] = useState(null);

	const createPreference = async () => {
        console.log("api backend ", process.env.API_BACKEND);
		try {
			const response = await postData(`${process.env.API_BACKEND}create-order`);
            console.log('response ', response);

			const { id } = response;
            console.log('id ', id);

			// Una vez que obtienes el ID de preferencia, establece el estado
			setPreferenceId(id);
			console.log("preferenceId dentro de cratePreference", preferenceId);

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
			console.log("preferenceId ", preferenceId);

	};

	return (
		<div>
			<Button onClick={handleBuy}>Comprar</Button>
			{preferenceId && <Wallet initialization={{ preferenceId : preferenceId}} />}
		</div>
	);
}

export default MercadoPago;
