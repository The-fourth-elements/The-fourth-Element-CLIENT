'use client';

import { CldUploadButton } from 'next-cloudinary';
import { Select, SelectItem, Button, Card, CardBody } from '@nextui-org/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';
import InputField from '@/helpers/InputField';
import SelectField from '@/helpers/SelectField';
import TextAreaField from '@/helpers/TextAreaField';
import CustomModal from '@/helpers/CustomModal';

import UploadWidget from '../uploadWidget/UploadWidget';

import { useState, useEffect } from 'react';

import React from 'react';
import './CreateClassStyles.scss';

import { validationSchemaCreateClass } from '@/helpers/validations';
import { toastError, toastSuccess } from '@/helpers/toast';
import { postData } from '@/hooks/postData';
import { useModulesStore } from '@/zustand/store/modulesStore';

function CreateModule() {
	const { modules, getModules } = useModulesStore();

	const [isloading, setIsLoading] = useState(true);
	const route = useRouter();
	const [videoUrl, setVideoUrl] = useState('');
	const initialValuesClass = {
		module: '',
		name: '',
		description: '',
		powerPointUrl: '',
	};

	useEffect(() => {
		const fetchModulesAndRedirect = async () => {
			console.log('holi bobi');
			console.log(modules);
			await getModules(); // Espera a que se carguen los módulos
			console.log(modules);
			if (!(modules.length === 0)) setIsLoading(!isloading);

			
		};
		if (!(modules.length > 0) && isloading) {
			fetchModulesAndRedirect();
		}
	}, [modules]);

	function handleRouteChange() {
		route.push('/dashboard/module/create');

	}

	if (!Array.isArray(modules) || modules.length === 0) {
		// No hay módulos creados, redirige al usuario
		return (
			<CustomModal
				isOpen={true}
				title='No hay módulos creados'
				content='Rediríjase a la creación de modulos'
				actions={[
					<Button autoFocus onClick={handleRouteChange}>
						Confirmar
					</Button>,
				]}
			/>
		);
	}

	console.log('soy el cookies', modules);

	const handleSubmit = async values => {
		let form = {
			module: values.module,
			name: values.name,
			description: values.description,
			videoURL: videoUrl,
			powerPointURL: values.powerPointUrl,
		};

		if (!videoUrl) {
			// Show an alert to the user
			window.alert('Debes subir un video antes de enviar la clase.');
		}

		const parsedModule = parseInt(form.module);

		form.module = modules[parsedModule - 1]._id; //guarda el id del modulo seleccionado
		console.log('form ', form);

		try {
			const classPostResponse = await postData(
				`${process.env.API_BACKEND}class`,
				form
			);
			const url = `${process.env.API_BACKEND}module/${form.module}/class/${classPostResponse._id}`;
			const options = {
				method: 'PUT',
				body: JSON.stringify({
					state: 'completed',
				}),
			};
			await fetch(url, options);

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
		<Card className='relative min-h-screen modern text-4xl '>
			<CardBody>
				<Formik
					initialValues={initialValuesClass}
					validationSchema={validationSchemaCreateClass}
					onSubmit={handleSubmit}>
					<Form className='sm:w-full md:w-3/4 lg:w-1/2 flex flex-col   items-center mx-auto  mt-10 mb-10 bg-blue-100 p-10 rounded-lg'>
						<h1> Subir una clase </h1>

						{modules ? (
							<SelectField
								isRequired
								className='mb-12'
								name='module'
								label='Seleccionar Módulo'
								options={modules?.map((_, index) => ({
									value: index + 1,
									text: `Módulo ${index + 1}`,
								}))}
							/>
						) : null}

						<InputField
							classNames={{
								label: 'text-xl',
							}}
							className='mb-12'
							// type='name'

							label='Nombre de la clase'
							name='name'
						/>

						<InputField
							classNames={{
								label: 'text-xl',
							}}
							className='mb-12'
							type='string'
							label='URL del PowerPoint'
							name='powerPointUrl'
						/>

						<TextAreaField
							classNames={{
								label: 'text-xl',
							}}
							className='mb-12'
							type='description'
							label='Descripción'
							name='description'
						/>

						<h1>Selecciona un video:</h1>
						<CldUploadButton
							className='cldButton'
							onSuccess={handleSuccess}
							uploadPreset='vasv6nvh'
						/>
						{videoUrl ? (
							<h5 className='bg-green-600 rounded-lg p-3 text-xl mt-6'>
								{' '}
								Video subido correctamente{' '}
							</h5>
						) : null}
							<Button
								type='submit'
								size='lg'
								className='bg-blue-500 rounded-lg submit'
								variant='ghost'>
								Enviar
							</Button>
					</Form>
				</Formik>
			</CardBody>
		</Card>
	);
}

export default CreateModule;
