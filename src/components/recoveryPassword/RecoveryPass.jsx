'use client';

import React from 'react';
import './styles.scss';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { postData } from '../../hooks/postData';
import { validationSchemaRecovery } from '../../helpers/validations';
import { toastError, toastSuccess } from '../../helpers/toast';
import { Button, Card, CardBody } from '@nextui-org/react';
import InputField from '@/helpers/InputField';

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
						toastError('Algo salio mal');
					}
				}}>
				{({ errors }) => (
					<CardBody className='body'>
						<Form className='Form'>
							<h1>Recovery Password</h1>
							<div className='group'>
								<InputField
									type='string'
									name='email'
									placeholder='Ingrese su email'
								/>
							</div>
							<span
								className='toogle text-2xl'
								onClick={() => {
									router.push('/auth');
								}}>
								¿Volver?
							</span>
							<Button type='submit' className='submit'>
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
