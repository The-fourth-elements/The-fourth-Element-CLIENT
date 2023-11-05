'use client';
import { Formik, Form } from 'formik';
import './style.scss';
import '@/helpers/CustomComponentsStyles.scss';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import googleLogo from '../../assets/svg/google.svg';
import InputField from '../../helpers/InputField';
import InputFieldPassword from '@/helpers/InputFieldPassword';
import { validationSchemaLogin } from '../../helpers/validations';
import { initialValuesLogin } from '../../helpers/validations';
import { toastError, toastSuccess } from '../../helpers/toast';
import { Card, CardBody, Button } from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import { useState } from 'react';



export const LoginForm = ({ toogleDisplay }) => {

	let [viewPassword, setViewPassword] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const handleSignIn = async () => {
		signIn('google', { redirect: false });
	};
	const handleShow = () => {
		setViewPassword(!viewPassword)
		
	}
	const router = useRouter()	

	return (
		<Card className='Main text-4xl '>
			<Formik
				initialValues={initialValuesLogin}
				validationSchema={validationSchemaLogin}
				onSubmit={async values => {
					setDisabled(true);
					try {
						const response = await signIn('credentials', {
							...values,
							redirect: false,
						});
						if (response?.status === 401) {
							toastError('Credenciales no válidas')
							setDisabled(false)
							return;
						}
						if (response?.error == null) {
							toastSuccess('Éxito');
							router.push('/dashboard');
							return
						} 
						
						else {
							throw  Error('Ocurrio un error en el inicio de sesión');
						}
					} catch (error) {
						toastError(error.message);
						setDisabled(false);
					}
				}}>
				{({ errors }) => (
					<CardBody className='body'>
						<Form className='claseForm relative sm:w-full md:w-3/4 lg:w-1/2 flex flex-col items-center mx-auto  space-y-5 mt-10 mb-10  p-10 rounded-lg justify-center bg-[#F29222]'>
								<InputField
									name='Email'
									type='email'
									classNames={{
										label: 'text-xl',
									}}
									className='mb-5'
									
								/>

								<InputFieldPassword
									name='Password'
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
									className='toogle text-black hover:cursor-pointer spanLogin hover:underline'
									onClick={() => {
										router.push('/auth/reset-password');
									}}>
									¿Olvidó su contraseña?
								</span>
								<span
									className='toogle text-black hover:cursor-pointer spanLogin hover:underline '
									onClick={() => {
										toogleDisplay();
									}}>
									¿No tienes una cuenta?
								</span>
							</div>

							<Button type='submit' className='rounded-lg mb-12 p-7 bg-[#C4161C] text-lg min-w-[12.5rem]' disabled={disabled}>
								INGRESAR
							</Button>
							<Button
								type='button'
								className='googleBtn mb-12'
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
