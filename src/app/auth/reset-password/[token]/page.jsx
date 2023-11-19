'use client';
import { postData } from '../../../../hooks/fetchData';
import '@/components/recoveryPassword/styles.scss';
import { Form, Formik } from 'formik';
import { Button, Card, CardBody } from '@nextui-org/react';
import { toastError, toastSuccess } from '@/helpers/toast';
import InputFieldPassword from '@/helpers/InputFieldPassword';

import { initialValuesRecovery, validationSchema } from '@/helpers/validations';
import '@/helpers/CustomComponentsStyles.scss';
import { useState } from 'react';
const ResetPass = ({ params }) => {
	let [viewPassword, setViewPassword] = useState(false);
	let [viewPassword2, setViewPassword2] = useState(false);

	const handleShow = () => {
		setViewPassword(!viewPassword);
	};
	const handleShow2 = () => {
		setViewPassword2(!viewPassword2);
	};
	const handleSubmit = async values => {
		const { newPassword } = values;
		const form = {
			newPassword,
			token: params.token,
		};
		try {
			const response = await postData(
				`${process.env.API_BACKEND}reset-password`,
				form
			);
			toastSuccess(response.message);
		} catch (error) {
			toastError(error.message);
		}
	};

	return (
		<Card className=' Main text-3xl text-white grid grid-rows-[1fr,auto]'>
			<Formik
				initialValues={initialValuesRecovery}
				onSubmit={handleSubmit}
				validationSchema={validationSchema}>
				<CardBody className='body flex-grow'>
					<Form className=' relative sm:w-full md:w-3/4 lg:w-1/2 flex flex-col mx-auto space-y-5 bg-primary-500 mt-10 mb-10 p-10 rounded-lg justify-center'>
						<label htmlFor='newPassword' className='text-black'>
							Nueva contraseña:
						</label>
						<InputFieldPassword
							className='mb-5'
							type='string'
							name='newPassword'
							viewPassword={viewPassword}
							handleShow={handleShow}
						/>

						<label className='text-black mb-12' htmlFor='confirmPassword '>
							Confirmar nueva contraseña:
						</label>
						<InputFieldPassword
							className='mb-5'
							type='string'
							name='confirmPassword'
							viewPassword={viewPassword2}
							handleShow={handleShow2}
						/>

						<Button type='submit' className='submit mx-auto'>
							Cambiar contraseña
						</Button>
					</Form>
				</CardBody>
			</Formik>
		</Card>
	);
};

export default ResetPass;
