'use client';

import './style.scss';
import { Card, CardBody, Button } from '@nextui-org/react';
import { Formik, Form } from 'formik';
import '@/components/loginForm/style.scss';
import InputField from '@/helpers/InputField';
import { validationSchemaModule } from '@/helpers/validations';
import Image from 'next/image';
import back from '@/assets/svg/arrowBack.svg';
import { useRouter } from 'next/navigation';

const ModuleForm = () => {
	const router = useRouter();
	const handleFileChange = event => {
		const fileInput = event.target;
		const isVideo =
			fileInput.files.length > 0 &&
			fileInput.files[0].type.startsWith('video/');
		if (!isVideo) {
			fileInput.value = '';
		}
	};

	const initialValuesModule = {
		nameOfModule: '',
		inputFile: '',
	};
	return (
		<Card className=' relative min-h-screen modern  h-50vh text-4xl'>
			<CardBody>
				<Formik
					initialValues={initialValuesModule}
					validationSchema={validationSchemaModule}>
					<Form className='relative flex flex-col h-50vh  w-1/2 items-center mx-auto space-y-3 mt-10 mb-10 bg-blue-100 p-10 rounded-lg'>
						<Image
							src={back}
							width={40}
							className='z-10  cursor-pointer absolute top-2 left-2
                            rounded-md hover:bg-blue-300'
							onClick={() => {
								router.push('/dashboard');
							}}
						/>

						<h1>Agregar Módulo</h1>

						<div className='group'>
							{/* <label htmlFor='nameOfModule' className='text-4xl'>
								Nombre del modulo
							</label> */}
							<InputField
								classNames={{
									label: 'text-xl',
								}}
								label='Nombre del Módulo'

								type='file'
								name='nameOfModule'
							/>
							<div className='group'>
								<input
									className=''
									type='file'
									name='video'
									id='video'
									accept='video/*'
									onChange={handleFileChange}
									required
								/>
							</div>
						</div>
						<Button type='submit' size='lg' className='bg-gradient-to-tr from-blue-500 rounded-lg submit'>
							Agregar modulo
						</Button>
					</Form>
				</Formik>
			</CardBody>
		</Card>
	);
};

export default ModuleForm;
