'use client';

import { Formik, Form } from 'formik';
import './style.scss';
import { useRouter } from 'next/navigation';
import { userAuth } from '../../app/context/authContext';
import Image from 'next/image';
import googleLogo from '../../assets/svg/google.svg';
import InputField from '../../helpers/InputField';
import { validationSchemaLogin } from '../../helpers/validations';
import { handleSubmitLogin } from '../../helpers/handlers';
import { initialValuesLogin } from '../../helpers/validations';
import { toastError, toastSuccess } from '../../helpers/toast'

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

	return (
		<main className='Main'>
			<Formik
				initialValues={initialValuesLogin}
				validationSchema={validationSchemaLogin}
				onSubmit={async values => {
					try {
						const response = await handleSubmitLogin(values);
						toastSuccess(response.message)
						router.push('/')
					} catch (error) {
						toastError(error)
					}
					
				}}>
				{({ errors }) => (
					<Form className='Main__Form'>
						<h1>Log In</h1>
						<div className='Main__Form--group'>
							<label htmlFor='email'>Email:</label>
							<InputField
								name='email'
								type='email'
								placeholder='Ingrese su email'
							/>
						</div>

						<div className='Main__Form--group'>
							<label htmlFor='password'>Password:</label>
							<InputField
								name='password'
								type='string'
								placeholder='Ingrese su contraseña'
							/>
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
						<button
							type='button'
							className='loginButton'
							onClick={handleSignIn}>
							<Image src={googleLogo} alt='' className='googleLogo' />
						</button>
					</Form>
				)}
			</Formik>
		</main>
	);
};
