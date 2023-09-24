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
import { toastError, toastSuccess } from '../../helpers/toast';
import { Card, CardBody, Button } from '@nextui-org/react';
import { useUserLoged } from '@/zustand/store/userLoged';

export const LoginForm = ({ toggleDisplay }) => {
	const { user, googleSignIn } = userAuth();
	let {userLoged, getUserLoged} = useUserLoged()

	const handleSignIn = async () => {
		try {
			await googleSignIn();
			setTimeout(() => {
				toastSuccess('Logueo exitoso');
				router.push('/');
			}, 2000);
		} catch (error) {
			toastError('No se pudo iniciar sesión');
		}
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
				onSubmit={handleLogin}>
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
