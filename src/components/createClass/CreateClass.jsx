'use client';

import { CldUploadButton } from 'next-cloudinary';
import { Select, SelectItem, Button, Card, CardBody } from '@nextui-org/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import InputField from '@/helpers/InputField';
import SelectField from '@/helpers/SelectField';

import UploadWidget from '../uploadWidget/UploadWidget';

import { useState } from 'react';

import React from 'react';
import './CreateClassStyles.scss';

import { validationSchemaCreateClass } from '@/helpers/validations';
import { toastError, toastSuccess } from '@/helpers/toast';
import { postData } from '@/hooks/postData';
import { useRouter } from 'next/navigation';

function CreateModule() {
	const [isloading, setIsLoading] = useState(false);
	const route = useRouter();
	const [videoUrl, setVideoUrl] = useState('');
	const initialValuesClass = {
		// module: '',
		name: '',
		description: '',
		powerPointUrl: '',
	};

	// const handleFileChange = event => {
	// 	const fileInput = event.target;
	// 	const isVideo =
	// 		fileInput.files.length > 0 &&
	// 		fileInput.files[0].type.startsWith('video/');
	// 	if (!isVideo) {
	// 		fileInput.value = '';
	// 	}
	// };

	const handleSubmit = async values => {
		const form = {

			name: values.name,
			description: values.description,
			videoURL: videoUrl,
			powerPointURL: values.powerPointUrl,
		};
		//llamar a la api para buscar el numeror de clase;

		try {
			await postData(`${process.env.API_BACKEND}class`, form);
			toastSuccess('¡se subio la clase!');
			route.push('/dashboard');
		} catch (error) {
			toastError('No se pudo subir la clase, intente mas tarde');
		}
	};


	const handleSuccess = e => {
		const { info } = e;
		const { url } = info;
		setVideoUrl(url);
	};

	return (
		<Card className='relative min-h-screen modern text-4xl'>
			<CardBody>
				<Formik
					initialValues={initialValuesClass}
					validationSchema={validationSchemaCreateClass}
					onSubmit={handleSubmit}>
					<Form className='flex flex-col w-1/2 items-center mx-auto  mt-10 mb-10 bg-blue-100 p-10 rounded-lg'>
						<h1> Subir una clase </h1>

						{/* <SelectField
							isRequired
							className='mb-10'
							onChange={e => console.log(e.target.value)}
							name='module'
							label='Seleccionar Módulo'
							options={[...Array(10)].map((_, index) => ({
								value: index + 1,
								text: `Módulo ${index + 1}`,
							}))}
						/> */}

						<InputField
							classNames={{
								label: 'text-xl',
							}}
							// type='name'
							label='Nombre de la clase'
							name='name'
						/>
						<InputField
							classNames={{
								label: 'text-xl',
							}}
							type='description'
							label='Descripción'
							name='description'
						/>

						<InputField
							classNames={{
								label: 'text-xl',
							}}
							type='string'
							label='powerPointUrl'
							name='powerPointUrl'
						/>

						<h1>Selecciona un video:</h1>
						{/* <Button> */}
						<CldUploadButton
							// onOpen={(e)=>{alert(JSON.stringify(e, null, 2))}}
							onSuccess={handleSuccess}
							uploadPreset='vasv6nvh'
						/>
						{/* </Button> */}

						{!isloading ? (
							<Button
								type='submit'
								size='lg'
								className='bg-gradient-to-tr from-blue-500 rounded-lg submit'>
								Enviar
							</Button>
						) : (
							<h1>Estamos cargando el video y la data...</h1>
						)}
					</Form>
				</Formik>
			</CardBody>
		</Card>
	);
}

export default CreateModule;
