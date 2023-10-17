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
import QuizForm from '@/components/QuizForm/QuizForm';

const ModalEditQuiz = ({ idQuiz , isOpenModal, onOpenChangeModal, update, onClose}) => {


	return (
		<>
			<Modal
				isOpen={isOpenModal}
				onOpenChange={onOpenChangeModal}
				backdrop='blur'
				size='5xl'
				onClose={onClose}
				>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className='flex flex-col gap-1 '>
								{update ? "Editar Quiz" : "Crear Quiz"}
							</ModalHeader>
							<ModalBody>
								<QuizForm onClose={onClose} update={update} idQuiz={idQuiz}/>
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

export default ModalEditQuiz;