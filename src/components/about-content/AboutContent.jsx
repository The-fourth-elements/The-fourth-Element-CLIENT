'use client';

import { Formik, Form } from 'formik';
import InputField from '@/helpers/InputField';
import {
	initialValuesLanding,
	validationSchemaLanding,
} from '@/helpers/validations';
import {
	Modal,
	Button,
	ModalContent,
	ModalBody,
	ModalHeader,
	ModalFooter,
} from '@nextui-org/react';
import TextAreaField from '@/helpers/TextAreaField';
import { postData } from '@/hooks/postData';
import { toastError, toastInfo, toastSuccess } from '@/helpers/toast';
import { useRouter } from 'next/navigation';
import {useContent} from '@/zustand/store/updateContent';

const AboutContent = ({ isOpen, onOpenChange, content }) => {
	const router = useRouter();
	const {getAllAbouts} = useContent()
	let values = {};
	if (content?.title) {
		values.Titulo = content.title;
		values.Contenido = content.content;
	}

	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			backdrop='transparent'
			size='5xl'>
			<ModalContent>
				{onClose => (
					<>
						<ModalHeader className='flex flex-col gap-1'>
							{content?.title ? 'Editar contenido' : 'Crear contenido'}
						</ModalHeader>
						<ModalBody>
							<Formik
								initialValues={values.Titulo ? values : initialValuesLanding}
								onSubmit={async values => {
									try {
										if (!content?.title) {
											const responseCreate = await postData(
												`${process.env.API_BACKEND}about`,
												values
											);
											toastSuccess('Se creó el contenido');
											onClose();
											getAllAbouts();
										} else {
											const responseUpdate = await fetch(
												`${process.env.API_BACKEND}about/${content.id}`,
												{
													method: 'PUT',
													headers: { 'Content-Type': 'application/json' },
													mode: 'cors',
													cache: 'no-cache',
													credentials: 'include',
													referrerPolicy: 'no-referrer',
													body: JSON.stringify(values),
												}
											);
											getAllAbouts();

											const responsed = await responseUpdate.json();
											if (responsed?.error) {
												throw new Error(responsed.error);
											}
											toastInfo('Se actualizó el contenido');
											onClose();
											router.refresh();
										}
									} catch (error) {
										toastError(error.message);
									}
								}}
								validationSchema={validationSchemaLanding}>
								<Form className='sm:w-full md:w-3/4 flex flex-col space-y-5 items-center mx-auto mt-10 mb-10 p-10 rounded-lg bg-primary-500'>
									<InputField
										name='Titulo'
										type='string'
										placeholder='Ingrese un título'
									/>
									<TextAreaField
										name='Contenido'
										placeholder='Ingrese contenido'
										type='string'
										label='Contenido'
									/>
									<Button color='primary' type='submit'>
										{content?.title ? 'Editar' : 'Crear'}
									</Button>
								</Form>
							</Formik>
						</ModalBody>
						<ModalFooter>
							<Button color='danger' variant='light' onPress={onClose}>
								Cancelar
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default AboutContent;
