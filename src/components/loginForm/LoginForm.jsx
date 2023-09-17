'use client';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import './style.scss';
import { useRouter } from 'next/navigation';

export const LoginForm = () => {
	const router = useRouter();

	const form = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: async values => {
			try {
				const response = await fetch('http://localhost:3001/login', {
					method: 'POST',
					mode: 'cors',
					cache: 'no-cache',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
					},
					referrerPolicy: 'no-referrer',
					body: JSON.stringify(values),
				}).then(response => response.json());
				if (response.success) {
					router.push('/');
				}
				throw new Error(response, 'error, invalid values');
			} catch (error) {
				console.log('soy el error', error);
			}
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email('Ingresa un email válido')
				.required('El email es requerido'),
			password: Yup.string()
				.matches(
					/^(?=.*[A-Z])(?=.*\d).{6,}$/,
					'The password must have a character Capitalizate, a number and a min of 6 characters'
				)
				.required('La contraseña es requerida'),
		}),
	});

	return (
		<main className='Main'>
			<form className='Main__Form' onSubmit={form.handleSubmit}>
				<h1>Log In</h1>
				<div className='Main__Form--group'>
					<label htmlFor='email'>Email:</label>
					<input
						type='text'
						name='email'
						id='email'
						className='Main__Form--group--input'
						onChange={form.handleChange}
						onBlur={form.handleBlur}
						value={form.values.email}
					/>
					{form.touched.email && form.errors.email ? (
						<span className='error'>{form.errors.email}</span>
					) : null}
				</div>

				<div className='Main__Form--group'>
					<label htmlFor='password'>Password:</label>
					<input
						type='password'
						name='password'
						id='password'
						className='Main__Form--group--input'
						onChange={form.handleChange}
						onBlur={form.handleBlur}
						value={form.values.password}
					/>
					{form.touched.password && form.errors.password ? (
						<span className='error'>{form.errors.password}</span>
					) : null}
				</div>
				<span className='recovery'>Did you forget your password?</span>
				<button type='submit' className='Main__Form--button'>
					Submit
				</button>
			</form>
		</main>
	);
};
