'use client';

import React from 'react';
import './styles.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { postData } from '../utilsFetch/postData';

const RecoveryPass = () => {
	const router = useRouter();
	const form = useFormik({
		initialValues: {
			email: '',
		},
		onSubmit: async (email) => {
			const  response = await postData('http://localhost:3001/', email);
			console.log(response);
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email('Debe ingresar un correo valido.')
				.required('Este campo es requerido.'),
		}),
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
