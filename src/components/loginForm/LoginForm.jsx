'use client';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import './style.scss';

export const LoginForm = () => {
	const form = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: values => {
			alert(JSON.stringify(values, null, 2));
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email('Ingresa un email válido')
				.required('El email es requerido'),
			password: Yup.string().required('La contraseña es requerida'),
		}),
	});

	return (
		<main className='Main'>
			<form className='Main__Form' onSubmit={form.handleSubmit}>
				<h1>Sign Up</h1>
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

				<button type='submit' className='Main__Form--button'>
					Submit
				</button>
			</form>
		</main>
	);
};
