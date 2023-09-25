'use client';
import { Formik, Form } from 'formik';
import './style.scss';
import { useRouter } from 'next/navigation';
// import { userAuth } from '../../app/context/authContext';
import Image from 'next/image';
import googleLogo from '../../assets/svg/google.svg';
import InputField from '../../helpers/InputField';
import { validationSchemaLogin } from '../../helpers/validations';
import { handleSubmitLogin } from '../../helpers/handlers';
import { initialValuesLogin } from '../../helpers/validations';
import { toastError, toastSuccess } from '../../helpers/toast';
import { Card, CardBody, Button } from '@nextui-org/react';
import { signIn } from 'next-auth/react';

export const LoginForm = ({ toogleDisplay }) => {
	const handleSignIn = async () => {
		signIn('google', { redirect: false });
	};
	const router = useRouter()
	
	

	return (
		<Card className='Main text-4xl'>
			<Formik
				initialValues={initialValuesLogin}
				validationSchema={validationSchemaLogin}
				onSubmit={async values => {
					try {
						const response = await signIn('credentials', {
							...values,
							redirect: false,
						});
						if (!response?.error) {
							toastSuccess('Éxito');
							router.push('/dashboard');
						} else {
							throw new Error('Ocurrio un error en el inicio de sesión');
						}
					} catch (error) {
						toastError(error.message);
					}
				}}>
				{({ errors }) => (
					<CardBody className='body'>
						<Form className='Form'>
							<div className='group text-white'>
								<InputField
									name='email'
									type='email'
									classNames={{
										label: 'text-xl',
									}}
								/>
							</div>

							<div className='group text-white'>
								<InputField
									name='password'
									type='string'
									classNames={{
										label: 'text-xl',
									}}
								/>
							</div>
							<div className='flex flex-col items-center text-2xl'>
								<span
									className='toogle'
									onClick={() => {
										router.push('/auth/reset-password');
									}}>
									¿Olvidó su contraseña?
								</span>
								<span
									className='toogle'
									onClick={() => {
										toogleDisplay();
									}}>
									¿No tienes una cuenta?
								</span>
							</div>

							<Button type='submit' className='submit'>
								Ingresar
							</Button>
							<Button
								type='button'
								className='googleBtn'
								onClick={handleSignIn}>
								<Image src={googleLogo} alt='' className='googleLogo' />
							</Button>
						</Form>
					</CardBody>
				)}
			</Formik>
		</Card>
	);
};
