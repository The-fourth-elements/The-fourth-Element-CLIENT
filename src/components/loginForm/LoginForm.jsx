'use client';

import * as Yup from 'yup';
import { postData } from '../utilsFetch/postData';
import { useFormik } from 'formik';
import './style.scss';
import { useRouter } from 'next/navigation';
import { userAuth } from '@/app/context/authContext';
import Image from 'next/image';
import googleLogo from '../../assets/svg/google.svg'
import { toast } from 'react-toastify';


export const LoginForm = ({ toogleDisplay }) => {
	const { user, googleSignIn } = userAuth();

	const handleSignIn = async () => {
		try {
			await googleSignIn();
		} catch (error) {
			console.log(error);
		}
	};
	

	const router = useRouter();

	const form = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: async values => {
			try {
				const p = await postData(`${process.env.API_BACKEND}login`, values);
				if(p.success){
					toast.success( 'Login', {
						position: "top-right",
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "light",
						});
					router.push('/course');
				}else{
					throw new Error('Algo ocurrio')
				}
			} catch (error) {
				toast.error(error, ' El email o la contraseña son invalidos', {
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
	if(user!=null){
		router.push('/course')
	}

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
						<span className='Main__Form--group--error'>
							{form.errors.email}
						</span>
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
						<span className='Main__Form--group--error'>
							{form.errors.password}
						</span>
					) : null}
				</div>
				<span
					className='recovery'
					onClick={() => {
						router.push('/auth/reset-password');
					}}>
					Did you forget your password?
				</span>
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
				<button type='button' className='loginButton' onClick={handleSignIn}>
          		<Image src={googleLogo} alt='' className='googleLogo' />
        </button>


			</form>
		</main>
	);
};
