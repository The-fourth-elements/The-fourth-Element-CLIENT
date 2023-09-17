'use client';

import * as Yup from 'yup';
import { postData } from '../utilsFetch/postData';
import { useFormik } from 'formik';
import './style.scss';
import { useRouter } from 'next/navigation';

export const LoginForm = ({ toogleDisplay }) => {
	const router = useRouter();

	const form = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: async values => {
			try {
				const p = await postData('http://localhost:3001/login', values);
				alert(JSON.stringify(p, null, 2));
				router.push('/course');
			} catch (error) {
				alert('usuario o contraseña invalidos');
				console.log(error);
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
				<span
					className='toogle'
					onClick={() => {
						toogleDisplay();
					}}>
					¿No tienes una cuenta?
				</span>

				<button type='submit' className='Main__Form--button'>
					Submit
				</button>
			</form>
		</main>
	);
};
