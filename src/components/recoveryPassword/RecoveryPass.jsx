'use client';

import React from 'react';
import './styles.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { postData } from '../utilsFetch/postData';
import { toast } from 'react-toastify';


const RecoveryPass = () => {
	const router = useRouter();
	const form = useFormik({
		initialValues: {
			email: '',
		},
		onSubmit: async (email) => {
			try {
				const  response = await postData(`https://the-forth-element-production.up.railway.app/auth/forgot`, email);
				
					toast.success('Revisa tu bandeja de entrada', {
						position: "top-right",
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "light",
						});
				
			} catch (error) {
				toast.error('Algo salio mal.', {
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
					});
			}
			

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
