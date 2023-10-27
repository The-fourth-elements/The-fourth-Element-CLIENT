'use client';
import SelectField from '@/helpers/SelectField';
import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Button, Card, CardBody } from '@nextui-org/react';
import InputField from '@/helpers/InputField';
import TextAreaField from '@/helpers/TextAreaField';
import { toastError, toastSuccess } from '@/helpers/toast';
import { postData } from '@/hooks/postData';
import { useModulesStore } from '@/zustand/store/modulesStore';
import { CldUploadButton } from 'next-cloudinary'; // Importa el botón de carga de Cloudinary
import {
	initialValuesMeditation,
	validationSchemaCreateMeditation,
} from '@/helpers/validations';

function MeditationForm() {
	const { modules, getModules } = useModulesStore();
	const [tracks, setTracks] = useState([]); // Almacena los tracks seleccionados

	useEffect(() => {
		const fetchModulesAndRedirect = async () => {
			await getModules();
		};
		fetchModulesAndRedirect();
	}, []);

	const handleSubmit = async values => {
		try {
			if (tracks.length === 0) {
				throw new Error('Seleccione al menos un track para la meditación.');
			}

			const form = {
				module: values.module,
				name: values.name,
				description: values.description,
				tracks: tracks, // Agrega los tracks al formulario
			};

			const parsedModule = parseInt(form.module);
			form.module = modules[parsedModule - 1]._id;

			// Realiza una solicitud POST para crear la meditación con los tracks
			const response = await postData(`${process.env.API_BACKEND}meditation`, {
				meditation: form,
			});

			console.log('response ', response);

			if (response && response?._id) {
				const url = `${process.env.API_BACKEND}module/${form.module}/meditation/${response._id}`;
				const options = {
					method: 'PUT',
					body: JSON.stringify({
						state: 'completed',
					}),
				};

				await fetch(url, options);

				toastSuccess('¡Meditación creada con éxito!');
			} else {
				toastError(
					'No se pudo crear la meditación, inténtelo de nuevo más tarde.'
				);
			}
		} catch (error) {
			console.log(error.message);
			toastError(error.message);
		}
	};

	const handleSuccess = e => {
		const { info } = e;
		const { url, public_id } = info;

		setTracks(prevTracks => [...prevTracks, { public_id, url }]);

		console.log('tracks', tracks);
	};

	return (
		<Card className='relative min-h-screen modern text-4xl'>
			<CardBody>
				<Formik
					initialValues={initialValuesMeditation}
					validationSchema={validationSchemaCreateMeditation}
					onSubmit={handleSubmit}>
					<Form className='sm:w-full md:w-3/4 lg:w-1/2 flex flex-col space-y-5 items-center mx-auto mt-10 mb-10 bg-primary-500 p-10 rounded-lg'>
						<h1 className='mb-7 text-white'>Crear una Meditación</h1>

						<InputField
							classNames={{
								label: 'text-xl',
							}}
							className='mb-5'
							label='Nombre de la Meditación'
							name='name'
						/>

						<TextAreaField
							classNames={{
								label: 'text-xl',
							}}
							className='mb-5'
							label='Descripción'
							name='description'
						/>

						{modules ? (
							<SelectField
								isRequired
								className='mb-12'
								name='module'
								label='Seleccionar Módulo'
								options={modules.map((_, index) => ({
									value: index + 1,
									text: `Módulo ${index + 1}`,
								}))}
							/>
						) : null}

						<div className='mb-5'>
							<h2 className='text-white'>
								Seleccione los tracks para la meditación:
							</h2>
							<CldUploadButton
								className='p-5 bg-blue-700 rounded-lg'
								onSuccess={handleSuccess}
								uploadPreset={process.env.NEXT_PUBLIC_UPLOAD_PRESET}
							/>
							<h5 className='bg-green-600 rounded-lg p-3 text-xl mt-6'>
								Tracks cargados: {tracks.length}
							</h5>

							<SelectField
								isRequired
								className='mb-12'
								name='tracks' // Define un nombre para este campo
								label='Seleccionar Tracks'
								selectionMode='multiple' // Habilita la selección múltiple
								options={tracks.map((track, index) => ({
									value: track.public_id, // Utiliza un identificador único para el valor
									text: 'track ' + (index + 1), // El nombre del track que se mostrará al usuario
								}))}
							/>
						</div>

						<Button
							size='md'
							type='submit'
							className='transition-all bg-background text-lg rounded-lg max-w-xs mx-auto hover:bg-primary p-5 py-3'>
							Guardar
						</Button>
					</Form>
				</Formik>
			</CardBody>
		</Card>
	);
}

export default MeditationForm;
