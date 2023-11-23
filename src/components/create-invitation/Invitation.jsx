'use client';

import React from 'react';

import InputField from '@/helpers/InputField';
import {
	Modal,
	ModalContent,
	ModalBody,
	ModalHeader,
	ModalFooter,
	Button,
} from '@nextui-org/react';
import { Formik, Form } from 'formik';
import { validationSchemaInvitation } from '@/helpers/validations';
import { postData } from '@/hooks/fetchData';
import { toastError, toastInfo, toastSuccess } from '@/helpers/toast';

const Invitation = ({ isOpen, onOpen, onOpenChange }) => {
	return (
		<>
			<Modal
				size='5xl'
				placement='center'
				isOpen={isOpen}
				onOpenChange={onOpenChange}>
				<ModalContent>
					{onClose => (
						<>
							<ModalHeader>
								<h3>Invitar usuario</h3>
							</ModalHeader>
							<ModalBody>
								<Formik
									initialValues={{ Email: '' }}
									validationSchema={validationSchemaInvitation}
									onSubmit={async value => {
										try {
											const response = await postData(
												`${process.env.API_BACKEND}invite`,
												{
													email: value.Email,
												}
											);
											if (response.user) {
												toastInfo(response.message);
												return;
											}
											if (response.successful) {
												toastSuccess('Se envió la invitacion al usuario');
												onClose();
												return;
											}
										} catch (error) {
											console.log(error);
											toastError('Ocurrió un error al invitar a este usuario')
											toastError(error)
										}
									}}>
									{({ errors }) => (
										<Form className='relative sm:w-full md:w-3/4 lg:w-1/2 flex flex-col items-center mx-auto  space-y-5 mt-10 mb-10 bg-primary-500 p-10 rounded-lg justify-center'>
											<InputField
												name='Email'
												type='string'
												placeholder='Ingrese un email'
												classNames={{
													label: 'text-xl',
												}}
												className='mb-5'
											/>
											<Button type='submit'>Crear invitación</Button>
										</Form>
									)}
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
		</>
	);
};

export default Invitation;
