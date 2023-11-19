'use client';
import useFetch from '@/hooks/useFetch';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import stripe from '@/assets/img/stripe.png';
import { toastError, toastInfo } from '@/helpers/toast';
import { CircularProgress } from '@nextui-org/react';
import { postData } from '@/hooks/fetchData';
import { getCookie } from 'cookies-next';

const Stripe = () => {
	const userId = getCookie('jsdklfsdjklfdsjfds');
	const [prices, setPrices] = useState([]);
	const { data, error, isLoading } = useFetch(
		`${process.env.API_BACKEND}get-prices-sp`
	);

	useEffect(() => {
		if (!isLoading && data) {
			setPrices(data.prices);
		}
	}, [data, isLoading]);

	const createOrder = async id => {
		try {
			const response = await postData(
				`${process.env.API_BACKEND}create-order-sp`,
				{ priceId: id, userId: userId }
			);
			toastInfo('Se creo la orden de compra');
			window.location.href = response.url;
			return;
		} catch (error) {
			toastError(error.message);
			toastError('no se pudo crear la orden de compra');
		}
	};

	if (isLoading) {
		return (
			<div className={styles.Stripe}>
				<CircularProgress color='secondary' aria-label='Loading...' />
			</div>
		);
	}

	if (error && !isLoading) {
		return (
			<div>
				<h1>Ocurrió un error</h1>
			</div>
		);
	}

	return (
		<div className={styles.Stripe}>
			{prices.map(price => {
				return (
					<React.Fragment key={price.id}>
						<div
							className={styles.Item}
							id={price.id}
							onClick={() => createOrder(price.id)}>
							<Image src={stripe} width={60} height={60} alt='stripelog' />
							<div className={styles.content}>
								<span>Debit or Credit Card</span>
							</div>
						</div>
					</React.Fragment>
				);
			})}
		</div>
	);
};

export default Stripe;
