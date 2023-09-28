'use client';
import { EyeOpen, EyeSlash } from './eyeIcons';
import { Formik, Form } from 'formik';
import './style.scss';
import '@/helpers/CustomComponentsStyles.scss';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import googleLogo from '../../assets/svg/google.svg';
import InputField from '../../helpers/InputField';
import InputFieldPassword from '@/helpers/InputFieldPassword';
import { validationSchemaLogin } from '../../helpers/validations';
import { handleSubmitLogin } from '../../helpers/handlers';
import { initialValuesLogin } from '../../helpers/validations';
import { toastError, toastSuccess } from '../../helpers/toast';
import { Card, CardBody, Button } from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import { useState } from 'react';



export const LoginForm = ({ toogleDisplay }) => {

	let [viewPassword, setViewPassword] = useState(false)
	
	const handleSignIn = async () => {
		signIn('google', { redirect: false });
	};
	const handleShow = () => {
		setViewPassword(!viewPassword)
		console.log(viewPassword)
	}
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
						if (response.error == null) {
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
						<Form className='claseForm relative sm:w-full md:w-3/4 lg:w-1/2 flex flex-col items-center mx-auto  space-y-5 mt-10 mb-10 bg-blue-100 p-10 rounded-lg justify-center'>
								<InputField
									name='email'
									type='email'
									classNames={{
										label: 'text-xl',
									}}
									className='mb-5'
									
								/>

								<InputFieldPassword
									name='password'
									type={viewPassword ? 'text' : 'password'}
									classNames={{
									label: 'text-xl',
									}}
									
									viewPassword={viewPassword}
									handleShow={handleShow}
									className='mb-5'
									
								/>
							<div className='flex flex-col items-center text-2xl'>
								<span
									className='toogle text-black hover:cursor-pointer underline'
									onClick={() => {
										router.push('/auth/reset-password');
									}}>
									¿Olvidó su contraseña?
								</span>
								<span
									className='toogle text-black hover:cursor-pointer underline'
									onClick={() => {
										toogleDisplay();
									}}>
									¿No tienes una cuenta?
								</span>
							</div>

							<Button type='submit' className='  border-large rounded-sm mb-12'>
								Ingresar
							</Button>
							<Button
								type='button'
								className='googleBtn mb-12 aspect-ratio-1/1'
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
