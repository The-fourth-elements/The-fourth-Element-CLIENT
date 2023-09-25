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

function CreateModule() {
	const [isloading, setIsLoading] = useState(false);

	const initialValuesClass = {
		module: '',
		name: '',
		description: '',
		videoURL: '',
		powerPointURL: '',
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

	const handleSubmit = values => {
		console.log(values, 'Values');
		/*setIsLoading(true);
		const { data } = await axios.post('urlCLOUDINARY', {});

		await axios.post('urlBASEDEDATOS', {
			...initialValuesClass,
			videoURL: data,
		});
		setIsLoading(false);*/
	};

	const [videoUrl, setVideoUrl] = useState('');

	const handleSuccess = e => {
		initialValuesClass.videoURL = e.url
		console.log("e.url : " + e.url);
		console.log(initialValuesClass);
	};

	return (
		<Card className='relative min-h-screen modern text-4xl'>
			<CardBody>
				<Formik
					initialValues={initialValuesClass}
					// validationSchema={validationSchemaCreateClass}
					onSubmit={handleSubmit}>
					<Form className='flex flex-col w-1/2 items-center mx-auto  mt-10 mb-10 bg-blue-100 p-10 rounded-lg'>
						<h1> Subir una clase </h1>

						<SelectField
							isRequired
							className='mb-10'
							name='module'
							label='Seleccionar Módulo'
							options={[...Array(10)].map((_, index) => ({
								value: index + 1,
								text: `Módulo ${index + 1}`,
							}))}
						/>

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
							type='powerPointURL'
							label='PowerPoint URL'
							name='powerPointURL'
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
							<h1>Estsamos cargando el video y la data...</h1>
						)}
					</Form>
				</Formik>
			</CardBody>
		</Card>
	);
}

export default CreateModule;
