'use client';
import React, { useEffect, useState } from 'react';
import {
	ModalContent,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
} from '@nextui-org/react';
// import '@/components/createClass/CreateClassStyles.scss'
import '../components/createClass/CreateClassStyles.scss';
import { Form, Formik } from 'formik';
import { validationSchemaEditClass } from '@/helpers/validations';
import { handleSubmitEditClass } from './handlers';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import { CldUploadButton } from 'next-cloudinary';
import { toastInfo } from './toast';
import ModalEditQuiz from './ModalEditQuiz'




const ModalEditClass = ({
	isOpenModal,
	onOpenChangeModal,
	classValues,
	handleDataUpdate,
}) => {
	const [initialValuesEditClass, setInitialValuesEditClass] = useState({});
	const [newVideo, setNewVideo] = useState({});
	const { isOpen, onOpenChange, onOpen } = useDisclosure()
	useEffect(() => {
		const { name, description, powerPoint } = classValues;

		setInitialValuesEditClass({
			editedName: name,
			editedDescription: description,
			editedPowerPoint: powerPoint?.url,
		});

		return () => {
			classValues = {};
		};
	}, [classValues]);
	const handleSuccessVideo = values => {
		const { public_id, url } = values.info;
		const infoVideo = {
			id: public_id,
			url,
		};
		setNewVideo(infoVideo);
	};

	return (
		<>
			<Modal
				isOpen={isOpenModal}
				onOpenChange={onOpenChangeModal}
				backdrop='blur'
				size='5xl'>
				<ModalContent>
					{onClose => (
						<>
							<ModalHeader className='flex flex-col gap-1'>
								Editar clase
							</ModalHeader>
							<ModalBody>
								<Formik
									initialValues={initialValuesEditClass}
									onSubmit={async values => {
										try {
											const r = await handleSubmitEditClass(
												values,
												newVideo,
												classValues?._id
											);
											setNewVideo({});
											handleDataUpdate();
											onClose();
											toastInfo("Clase actualizada");
										} catch (error) {
											toastError(error.message)
										}
									}}
									validationSchema={validationSchemaEditClass}>
									<Form className='sm:w-full md:w-3/4 flex flex-col space-y-5  items-center mx-auto  mt-10 mb-10 bg-primary p-10 rounded-lg'>
										<InputField
											name='editedName'
											type='string'
											placeholder='Nuevo nombre de la clase'
										/>
										<InputField
											name='editedPowerPoint'
											type='string'
											placeholder='Url powerpoint'
										/>
										<TextAreaField
											name='editedDescription'
											placeholder='Ingrese la nueva descripción'
											type='description'
											label='Descripción'
										/>
										<CldUploadButton
											className='cldButton'
											onSuccess={handleSuccessVideo}
											uploadPreset={process.env.NEXT_PUBLIC_UPLOAD_PRESET}
										/>
										<Button type='submit'>
											Editar
										</Button>
									</Form>
								</Formik>
							</ModalBody>
							<ModalFooter>
								<Button color='danger' variant='light' onPress={onClose}>
									Cancelar
								</Button>
								
								<Button variant='light' onPress={onOpen}>
									Editar Quiz
								</Button>

								<ModalEditQuiz idQuiz={classValues?.quiz[0]?._id}  isOpenModal={isOpen} onOpenChangeModal={onOpenChange} update={true}></ModalEditQuiz>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};

export default ModalEditClass;
