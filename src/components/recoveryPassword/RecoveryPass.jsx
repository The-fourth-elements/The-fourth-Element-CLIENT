'use client';

import React from 'react';
import './styles.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const RecoveryPass = () => {
	const form = useFormik({
		initialValues: {
			email: '',
		},
		onSubmit: () => {},
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
				<button type='submit' className='Main__Recovery__Form--button'>
					Send code
				</button>
			</form>
		</main>
	);
};

export default RecoveryPass;
