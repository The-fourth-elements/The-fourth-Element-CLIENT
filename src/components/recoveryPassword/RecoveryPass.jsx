'use client';

import React from 'react';
import './styles.scss';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { postData } from '../../hooks/postData';
import { toast } from 'react-toastify';
import { validationSchemaRecovery } from '../../helpers/validations'
import { toastError, toastSuccess } from '../../helpers/toast'


const RecoveryPass = () => {
	const router = useRouter();
	const form = useFormik({
		initialValues: {
			email: '',
		},
		onSubmit: async (email) => {
			try {
				const  response = await postData(`${process.env.API_BACKEND}auth/forgot`, email);
				toastSuccess('Verifique su bandeja de entrada')
			} catch (error) {
				toastError('Algo salio mal')
			}
			

		},
		validationSchema: validationSchemaRecovery
	});

	return (
		<main className='Main__Recovery'>
			<form onSubmit={form.handleSubmit} className='Main__Recovery__Form'>
				<h1>Recovery Password</h1>
				<div className='Main__Recovery__Form--group'>
					<label htmlFor='email' className='Main__Recovery__Form--group--label'>
						Email:{' '}
					</label>
					<input
						type='text'
						name='email'
						id='email'
						className='Main__Recovery__Form--group--input'
						onChange={form.handleChange}
					/>
				</div>
				<span
					onClick={() => {
						router.push('/auth');
					}}>
					¿Volver?
				</span>
				<button type='submit' className='Main__Recovery__Form--button'>
					Send code
				</button>
			</form>
		</main>
	);
};

export default RecoveryPass;
