'use client';

import { CldUploadButton } from 'next-cloudinary';
import { Button, Card, CardBody } from '@nextui-org/react';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/navigation';
import InputField from '@/helpers/InputField';
import SelectField from '@/helpers/SelectField';
import TextAreaField from '@/helpers/TextAreaField';
import CustomModal from '@/helpers/CustomModal';

import { useState, useEffect } from 'react';

import React from 'react';
import './CreateClassStyles.scss';

import { validationSchemaCreateClass } from '@/helpers/validations';
import { toastError, toastSuccess } from '@/helpers/toast';
import { postData } from '@/hooks/postData';
import { useModulesStore } from '@/zustand/store/modulesStore';

function CreateClass() {
	const { modules, getModules } = useModulesStore();

	const [isloading, setIsLoading] = useState(true);
	const route = useRouter();
	const [video, setVideo] = useState({});
	const initialValuesClass = {
		module: '',
		name: '',
		description: '',
		powerPointUrl: '',
	};

	useEffect(() => {
		const fetchModulesAndRedirect = async () => {
			await getModules();
			if (!(modules.length === 0)) setIsLoading(!isloading);
		};
		if (!(modules.length > 0) && isloading) {
			fetchModulesAndRedirect();
		}
	}, [modules]);

	function handleRouteChange() {
		route.push('/dashboard/module/create');
	}

	if (!Array.isArray(modules) || modules?.length === 0) {
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

	const handleSubmit = async values => {
		try {
			if (video?.url?.length == undefined) {
				throw new Error('Inserte un video');
			}
		} catch (error) {
			toastError(error.message);
			return;
		}

		let form = {
			module: values.module,
			name: values.name,
			description: values.description,
			video: video,
			powerPoint: {
				url: values.powerPointUrl,
			},
		};

		const parsedModule = parseInt(form.module);

		form.module = modules[parsedModule - 1]._id;

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

			toastSuccess('¡Se subió la clase!!');
			route.push('/dashboard');
		} catch (error) {
			toastError('No se pudo subir la clase, intente mas tarde');
		}
	};
	const handleSuccess = e => {
		const { info } = e;
		const { url, public_id } = info;
		console.log(e);
		setVideo({ url, public_id });
	};

	return (
		<Card className='relative min-h-screen modern text-4xl '>
			<CardBody>
				<Formik
					initialValues={initialValuesClass}
					validationSchema={validationSchemaCreateClass}
					onSubmit={handleSubmit}>
					<Form className='sm:w-full md:w-3/4 lg:w-1/2 flex flex-col space-y-5  items-center mx-auto  mt-10 mb-10 bg-blue-100 p-10 rounded-lg'>
						<h1 className='mb-7'> Subir una clase </h1>

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
							className='mb-5'
							// type='name'

							label='Nombre de la clase'
							name='name'
						/>

						<InputField
							classNames={{
								label: 'text-xl',
							}}
							className='mb-5'
							type='string'
							label='URL del PowerPoint'
							name='powerPointUrl'
						/>

						<TextAreaField
							classNames={{
								label: 'text-xl',
							}}
							className='mb-5'
							type='description'
							label='Descripción'
							name='description'
						/>

						<h2 className='text-black'>Selecciona un video:</h2>
						<CldUploadButton
							className='cldButton'
							onSuccess={handleSuccess}
							uploadPreset={process.env.NEXT_PUBLIC_UPLOAD_PRESET}
							disabled={video?.url?.length > 0}
						/>
						{video?.url?.length > 0 ? (
							<h5 className='bg-green-600 rounded-lg p-3 text-xl mt-6'>
								Video subido correctamente
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

export default CreateClass;
