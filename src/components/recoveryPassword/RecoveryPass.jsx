'use client';

import React from 'react';
import './styles.scss';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { postData } from '../../hooks/fetchData';
import { validationSchemaRecovery } from '../../helpers/validations';
import { toastError, toastSuccess } from '../../helpers/toast';
import { Button, Card, CardBody } from '@nextui-org/react';
import InputField from '@/helpers/InputField';
import '@/helpers/CustomComponentsStyles.scss';

const RecoveryPass = () => {
	const router = useRouter();
	const initialValues = {
		email: '',
	};
	return (
		<Card className='Main text-4xl'>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchemaRecovery}
				onSubmit={async values => {
					try {
						await postData(`${process.env.API_BACKEND}auth/forgot`, {email: values.email});
						router.push('/');
						toastSuccess('Verifique su bandeja de entrada');
					} catch (error) {
						toastError('Algo salió mal');
					}
				}}>
				{({ errors }) => (
					<CardBody className='body'>
						<Form className=' relative sm:w-full md:w-3/4 lg:w-1/2 flex flex-col mx-auto  mt-10 mb-10  bg-primary-500 p-10 rounded-lg justify-center'>
							<h1 className='text-black mx-auto mb-10'>Recovery Password</h1>
								<InputField
									type='string'
									name='email'
									placeholder='Ingrese su email'
									className='mb-12'
								/>
							<span
								className='toogle text-2xl text-black mx-auto mb-8 mt-8 hover:cursor-pointer underline '
								onClick={() => {
									router.push('/auth');
								}}>
								¿Volver?
							</span>
							<Button type='submit' className='submit text-xl p-5 mx-auto'>
								Send code
							</Button>
						</Form>
					</CardBody>
				)}
			</Formik>
		</Card>
	);
};

export default RecoveryPass;
