'use client'
import { postData } from '@/hooks/postData';
import { PayPalButtons } from '@paypal/react-paypal-js';
import React from 'react';
import './styles.scss';
import { toastError, toastSuccess } from '@/helpers/toast';
import { useRouter } from 'next/navigation';
import { deleteCookie, getCookie } from 'cookies-next';
import { signOut } from 'next-auth/react';

const Paypal = () => {
	const router = useRouter();
	const idUser = getCookie('jsdklfsdjklfdsjfds');
	const createOrderPaypal = async e => {
		const response = await postData(
			`${process.env.API_BACKEND}create-order-pp`
		);
		console.log(e);
		console.log(response);
		return response.id;
	};
	const onApprove = async (data, actions) => {
		try {
			if (idUser) {
				actions.order.capture();
				const headers = { 'Content-Type': 'application/json' };
				const body = { idUser };
				const response = await fetch(`${process.env.API_BACKEND}feedback-pp`, {
					method: 'PUT',
					mode: 'cors',
					cache: 'no-cache',
					headers,
					body: JSON.stringify(body),
					referrerPolicy: 'no-referrer',
					credentials: 'include',
				});
				const parsedResponse = await response.json();
				console.log(parsedResponse);
				toastSuccess('Usted compro el curso');
				router.push('/paid-success');
				// await signOut();
				return;
			}
			throw new Error('Algo ocurrio en el proceso de la compra');
		} catch (error) {
			console.log(error);
			toastError(error.message);
		}
	};
	const onCancel = async data => {
		console.log(data, 'soy la data');
		toastError('No se concreto la compra');
	};

	return (
		<>
			{(
				<PayPalButtons
				style={{
					label: 'pay',
				}}
				createOrder={createOrderPaypal}
				onCancel={onCancel}
				onApprove={onApprove}
			/>)}
		</>
	);
};

export default Paypal;
