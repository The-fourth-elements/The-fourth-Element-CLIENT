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
import { useUserLoged } from '@/zustand/store/userLoged';




import { signIn } from 'next-auth/react';

export const LoginForm = ({ toogleDisplay }) => {
	const handleSignIn = async () => {
		signIn('google', { redirect: false });
	};
	const router = useRouter()
	const handleLogin = async (values) => {
		try {
		  const response = await handleSubmitLogin(values);
	  
		  if (!response.error) {
			 await getUserLoged();
			toastSuccess(response.message);
	  
			if (Object.keys(userLoged).length > 0) {
			  
	  
			  console.log(userLoged);
	  
			  if (userLoged.role === 0 || userLoged.role === 1) {
				router.push('/course');
			  } else {
				router.push('/dashboard');
			  }
			}
		  } else {
			throw new Error(response.error);
		  }
		} catch (error) {
		  toastError(error.message);
		}
	  };
	

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
							<div className='group'>
								<InputField name='email' type='email' />
							</div>

							<div className='group'>
								<InputField name='password' type='string' />
							</div>
							<div className='flex flex-col items-center text-2xl'>
								<span
									className='recovery'
									onClick={() => {
										router.push('/auth/reset-password');
									}}>
									¿Olvido su contraseña?
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
								className='loginButton'
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
