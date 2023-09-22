'use client';

import { Input, Button, Card, CardBody } from '@nextui-org/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import InputField from '@/helpers/InputField';

import React from 'react';
import './CreateClassStyles.scss';

import { validationSchemaCreateClass } from '@/helpers/validations';

function CreateModule() {
	const initialValuesClass = {
		module: '',
		name: '',
		description: '',
		videoFile: '',
		PowerPointUrl: '',
	};

	const handleFileChange = event => {
		const fileInput = event.target;
		const isVideo =
			fileInput.files.length > 0 &&
			fileInput.files[0].type.startsWith('video/');
		if (!isVideo) {
			fileInput.value = '';
		}
	};

	const handleSubmit = values => {
		console.log(values);
	};

	return (
		<>
			<Card className='relative min-h-screen modern  Main text-4xl'>
				<CardBody className='body'>
					<Formik
						initialValues={initialValuesClass}
						validationSchema={validationSchemaCreateClass}
						onSubmit={handleSubmit}>
						{({ errors, touched }) => (
							<Form className='flex flex-col w-1/2 items-center mx-auto space-y-3 mt-10 mb-10 bg-primary-50 p-10 rounded-lg'>
								<h1> Subir una clase </h1>

								<InputField
									classNames={{
										label: 'text-xl',
									}}
									type='module'
									label='Modulo de la clase'
									name='module'
								/>
								<InputField
									classNames={{
										label: 'text-xl',
									}}
									type='name'
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
									type='PowerPointUrl'
									label='PowerPoint URL'
									name='PowerPointUrl'
								/>

								<h1>Selecciona un video:</h1>

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

								<Button type='submit' size='lg' className='bg-gradient-to-tr from-blue-500 rounded-lg'>
									Enviar
								</Button>
							</Form>
						)}
					</Formik>
				</CardBody>
			</Card>
		</>
	);
}

export default CreateModule;
