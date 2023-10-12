'use client';

import { Formik, Form } from 'formik';
import InputField from '@/helpers/InputField';
import {initialValuesLanding, validationSchemaLanding} from '@/helpers/validations' 
import { Modal, Button, ModalContent, ModalBody, ModalHeader, ModalFooter } from '@nextui-org/react';
import TextAreaField from '@/helpers/TextAreaField';


const AboutContent = ({
	isOpen,
	onOpenChange,
}) => {
	return (
		<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				backdrop='opaque'
				size='5xl'>
				<ModalContent>
					{onClose => (
						<>
							<ModalHeader className='flex flex-col gap-1'>
								Crear contenido
							</ModalHeader>
							<ModalBody>
								<Formik
									initialValues={initialValuesLanding}
									onSubmit={async values => {
										console.log(values);
									}}
									validationSchema={validationSchemaLanding}>
									<Form className='sm:w-full md:w-3/4 flex flex-col space-y-5  items-center mx-auto  mt-10 mb-10 p-10 rounded-lg  bg-primary-500'>
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
											Editar
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
